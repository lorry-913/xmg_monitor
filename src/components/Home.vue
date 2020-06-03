<template>
  <div class="layout">
    <Layout :style="{height:'100vh'}">
      <Header :style="{padding: 0, backgroundColor:'#515a6e'}" class="layout-header-bar">
        <Row>
          <Col :xs="20" :ms="20" :md="4" :lg="4">
            <div class="layout-logo-left"></div>
          </Col>
          <Col :xs="4" :ms="4" :md="2" :lg="2" :style="{textAlign: menuAlign }">
            <Icon @click.native.stop="collapsedSider"
                  :class="rotateIcon"
                  :style="{margin: '0 20px',color:'#fff', cursor:'pointer'}"
                  type="md-menu"
                  size="24"
            ></Icon>

          </Col>

          <Col :xs="0" :ms="0" :md="18" :lg="18">
            <Menu mode="horizontal" theme="dark" active-name="1" style="float: right">
              <div class="layout-logo"></div>
              <div class="layout-nav">
                <MenuItem name="1" to="/Main">
                  <Icon type="ios-home" @click="toMain"/>
                  首页
                </MenuItem>
                <MenuItem name="2">
                  <Icon type="md-stats" />
                  统计
                </MenuItem>
                <MenuItem name="3">
                  <Icon type="ios-notifications-outline" />
                  通知
                </MenuItem>
                <Submenu name="4">
                  <template slot="title">
                    <Avatar :src="head_img" />
                  </template>
                    <Button type="primary" @click="modal_open">修改密码</Button>
                    <Button type="error" @click="loginOut">退出登录</Button>
                </Submenu>
              </div>
            </Menu>

            <router-view v-if="isSuffix" name="nav" />
          </Col>
        </Row>

      </Header>

      <Layout>
        <Sider ref="side1"
               class="topnav_box"
               hide-trigger
               breakpoint="md"
               collapsible
               :collapsed-width="78"
               v-model="isCollapsed"
               :style="{overflow:'auto',height:sHeight}">
          <Menu theme="dark" :style="{width:'auto'}"
                :class="menuitemClasses"
                @on-open-change="handleOpen"
                @on-select="handleSelect"
          >
            <Submenu name="1"
                     style="margin-top: 10px">
              <template slot="title">
                <Icon type="ios-cog"></Icon>
                基础服务
              </template>
              <MenuItem name="1-1" to="/GoodsInfo">
                <!--<Icon :type="child.icon"></Icon>-->
                商品信息
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>

        <Content class="topnav_box" :style="{overflow:'auto', height:sHeight,width:'1183px'}">
          <div @click="handleSideHide"
               style="position: fixed; width:100%; height: 100%; background-color: #cccc;z-index:10000;"
               v-show="sideModal"
          ></div>
          <router-view />
        </Content>
      </Layout>
    </Layout>



    <!--&lt;!&ndash;编辑弹框&ndash;&gt;-->
    <Modal v-model="changepwd_modal"
           title="修改密码"
           :closable="false"
           :mask-closable="false"
           :transfer="false"
           width="450"
           inline
    >
      <Form ref="changePassWord"
            :model="user_form"
            :label-width="80"
            label-position="right"
            inline
      >
        <FormItem prop="name" label="用户名:">
          <Input v-model="user_form.name"
                 :value="user_form.name"
                 :clearable="true"
                 disabled
                 :style="{width:'200px'}">
          </Input>
        </FormItem>
        <FormItem prop="pwd" label="密码:">
          <Input v-model="user_form.pwd"
                 :value="user_form.pwd"
                 :clearable="true"
                 :style="{width:'200px'}">
          </Input>
        </FormItem>
        <FormItem  label="头像:">
          <Upload
            v-if="fileName==null"
            style="width: 200px;height: 100px"
            :before-upload="handleUpload"
            type="drag"
            :data="uploadParams"
            :show-upload-list="false"
            action="http://localhost:8099/dubbo-consummer/api/fileUpLoad">
            <div style="padding: 20px 0">
              <Icon v-if="fileName==null" type="ios-cloud-upload" size="30" style="color: #3399ff"></Icon>
              <p v-if="fileName==null" >修改头像</p>
            </div>
          </Upload>
          <div v-if="fileName!=null">
            <img  :src="head_img" height="50" width="50">
          </div>
        </FormItem>

      </Form>
      <div slot="footer">
        <Button size="large"
                @click="modal_cancel">取消
        </Button>
        <Button type="error"
                size="large"
                :disabled="user_form.pwd == ''? true :false"
                @click="handleEidtModalOk('changePassWord')">提交
        </Button>
      </div>
    </Modal>


  </div>
</template>

<script>
  import Vue from "vue";
  import {store,mutations} from "../store";
  import {getCookie} from "../utils/Auth";
  import {post} from "../utils/Request";
  import {getToken} from "../utils/Auth";

  if (!store.state.AppData){
    Vue.set(store.state, 'AppData', {
      isCollapsed:false,
      sideHeight:0,
      sideModal:false,
      xyWidth:992,
      menuAlign:'left',
      initParams: {
        type: "left",
        typeDetail: "detail"
      },
      curr_menu_id: localStorage.getItem('curr_menu_id'),
      curr_menu: '',
      user:"",
      token:"",
      changepwd_modal:false,
      user_form:{
        name:getCookie("name"),
        pwd:""
      },
      fileName: null,
      loadingStatus: false,
      uploadParams:{
        name:getCookie("name"),
        token:getCookie("token")
      },
      head_img:"http://localhost:8099/dubbo-consummer/api/getHeadPhoto?name="
    });

  }

  export default {
    name:"Side",
    data(){
      return store.state.AppData;
    },
    computed: {
      rotateIcon () {
        return [
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      sHeight:{
        get(){
          let ph = window.innerHeight;
          ph  = (ph - 64) + 'px';
          this.sideHeight = ph;
          return this.sideHeight;
        },
        set(val){
          this.sideHeight = val;
        }
      },
      isSuffix(){
        if (window.innerWidth > this.xyWidth1) {
          return true;
        } else {
          return false;
        }
      },
      xyWidth1() {
        return store.state.AppData.xyWidth;
      },
      isColl() {
        return !store.state.AppData.isCollapsed;
      },
      menuitemClasses() {
        return [
          'menu-item',
          store.state.AppData.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods:{
      collapsedSider () {
        this.isCollapsed = !this.isCollapsed;
        if (window.innerWidth <= this.xyWidth1) {
          this.sideModal = !this.isCollapsed;
        }
      },
      handleSideHide() {
        if (window.innerWidth <= this.xyWidth1){
          if (this.sideModal){
            this.isCollapsed = true;
            this.sideModal = false;
          }
        }
      },
      handleOpen: function () {
        if (window.innerWidth > this.xyWidth1) {
          if (store.state.AppData.isCollapsed === true) {
            store.state.AppData.isCollapsed = false;
          }
        }
      },
      handleSelect(name) {
        // this.curr_menu_id = name
        // localStorage.setItem("curr_menu_id", this.curr_menu_id);
        if (window.innerWidth <= this.xyWidth) {
          if (store.state.AppData.isCollapsed == false) {
            store.state.AppData.sideModal = false;
            store.state.AppData.isCollapsed = true;
          }
        }
      },
      handOpenMenu(path){
        console.log(path)
      },
      loginOut(){
        let params={
          name:getCookie("name")
        }
        post("mydubbo/api/loginOut",params).then(res=>{
          if(res.code==0){
            this.$router.push("/login")
            this.$Message.info(res.msg)
          }
        })
      },
      modal_open(){
        this.fileName=null
        this.changepwd_modal=true
      },
      modal_cancel(){
        this.changepwd_modal=false
      },
      handleEidtModalOk(){
        this.file=null
        let params={
          name:this.user_form.name,
          pwd:this.user_form.pwd
        }
        post("dubbo-consummer/user/updateUser",params).then(res=>{
          this.$Message.info(res.msg)
          this.changepwd_modal=false
        })
      },
      toMain(){
        this.$router.push("/Main")
      },
      handleUpload(fileName){
        console.log(fileName)
        store.state.AppData.fileName = fileName.name;
      },



    },
    created() {

      // 兼容火狐的滚动条处理
      const that = this;

      if (window.innerWidth <= that.xyWidth1) {
        that.menuAlign = 'right';
        that.sideModal = this.isCollapsed;
      } else {
        that.menuAlign = 'left';
        that.sideModal = false;
      }

      window.onresize = function () {
        that.sHeight = (window.innerHeight - 64) + 'px';
        if (window.innerWidth <= that.xyWidth1) {
          that.menuAlign = 'right';
          that.sideModal = this.isCollapsed;
        } else {
          that.menuAlign = 'left';
          that.sideModal = false;
        }
      }
    },
    created(){
      this.head_img=this.head_img+getCookie("name");
    }
  }
</script>

<style scoped>
  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #333;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #f60;
    border-radius: 3px;
    margin: 17px auto;
  }


  .rotate-icon{
    transform: rotate(-90deg);
  }


  /****  谷歌 滚动条自定义 **/
  .topnav_box::-webkit-scrollbar {
    width: 3px;
    height:10px;
    background-color:#b5b1b1;
  }
  .topnav_box::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color:black;
  }
  .topnav_box::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color:#b5b1b1;
  }
  .menu-item div span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .collapsed-menu div span {
    width: 0px;
    transition: width .2s ease;
  }


  .menu-item div i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu li {
    overflow: hidden;
    width: 78px;
    height: 39px;
  }

  .collapsed-menu li div i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  /********** 火狐 滚动条 ************/
</style>
