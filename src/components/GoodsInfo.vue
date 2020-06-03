<template>
  <div>
    <div style="margin-top: 10px">
      <Button icon="ios-search"
              type="primary"
              style="float: left;margin-left: 20px"
              @click="search_is_show = !search_is_show">搜索
      </Button>
      <Button icon="md-add"
              type="primary"
              style="float: left;margin-left: 20px"
              @click="handleAdd">添加新品
      </Button>
      <Button icon="ios-close"
              type="primary"
              style="float: left;margin-left: 20px"
              @click="handleEdit">更新商品
      </Button>
      <Button icon="ios-close"
              type="error"
              style="float: left;margin-left: 20px"
              @click="SendMsg">删除商品
      </Button>
      <Divider type="vertical"/>
      <div style="position: relative">
        <Form inline v-show="search_is_show">
          <FormItem label="标识:">
            <Input type="text"
                v-model="search.goods_uuid"
            >
              <Icon type="ios-barcode"
                    slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="名称:">
            <Input type="text"
                   v-model="search.goods_name"
            >
              <Icon type="md-expand"
                    slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem style="margin-top: 32px">
            <Button type="primary"
                    @click="GetSearchList">查询
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <div style="margin-top: 20px">
      <Input v-model="nettymsg"
             :clearable="true"
             :style="{width:'200px'}">
      </Input>
      <Button @click="SendMsg(nettymsg)"
              style="float: left;margin-top:7px;margin-left: 15px">发送</Button>
      <p>{{student}}</p>
      <Table border
             :columns="cols"
             @on-current-change="selected"
             ref="currentRowTable"
             :data="rows"
             highlight-row>
      </Table>
    </div>
    <div>
      <Button @click="handleClearCurrentRow"
              style="float: left;margin-top:7px;margin-left: 15px">清除选中</Button>
    </div>
    <div style="margin-top:10px;">
      <Page :total="total"
            :page-size="limit.page_len"
            show-elevator
            :current="limit.page"
            style="float: right;color:black;margin-right: 15px"
            @on-change="PageClick"/>
    </div>





    <!-- 添加弹框 -->
    <Modal v-model="add_is_show"
           title="添加商品"
           :closable="false"
           :mask-closable="false"
           :transfer="false"
           width="450"
           inline
    >
      <Form ref="GoodsAdd"
            :model="add_goods_form"
            :label-width="80"
            label-position="right"
            inline
      >
        <FormItem prop="name" label="商品名称:">
          <Input v-model="add_goods_form.name"
                 :clearable="true"
                 :style="{width:'200px'}">
          </Input>
        </FormItem>

      </Form>
      <div slot="footer">
        <Button size="large" @click="handleModalCancel">取消</Button>
        <Button type="error"
                size="large"
                :disabled="add_goods_form.name== ''? true :false"
                @click="handleAddModalOk('GoodsAdd')">提交
        </Button>
      </div>
    </Modal>



    <!-- 编辑弹框 -->
    <Modal v-model="edit_is_show"
           title="更新商品"
           :closable="false"
           :mask-closable="false"
           :transfer="false"
           width="450"
           inline
    >
      <Form ref="GoodsEdit"
            :model="edit_goods_form"
            :label-width="80"
            label-position="right"
            inline
      >
        <FormItem prop="name" label="商品名称:">
          <Input v-model="edit_goods_form.goods_name"
                 :clearable="true"
                 :style="{width:'200px'}">
          </Input>
        </FormItem>

      </Form>
      <div slot="footer">
        <Button size="large" @click="handleModalCancel">取消</Button>
        <Button type="error"
                size="large"
                :disabled="add_goods_form.goods_name== ''? true :false"
                @click="handleEditModalOk('GoodsEdit')">提交
        </Button>
      </div>
    </Modal>






  </div>
</template>

<script>
  import Vue from 'vue';
  import store from '@/store/index';
  import {mutations} from "../store";
  import {loading} from "../utils/Spin";
  import {cancelLoad} from "../utils/Spin";
  import {post} from "../utils/Request";
  import * as socketApi from '../utils/socket.js'

  if (!store.state.GoodsInfoData) {
    Vue.set(store.state, 'GoodsInfoData', {
      nettymsg:"",
      student:"",
      cols: [
        {type: 'index', title: '编号'},
        {title: '商品标识', key: 'goods_uuid'},
        {title: '商品名称', key: 'goods_name'},
      ],
      curr_goods:"",
      moduleName: "GoodsData",
      actionName: "searchGoods",
      ver:"1.0.0",
      module: "SearchGoods",
      rows: [],
      total: 0,
      limit: {
        page: 1,
        page_len: 10
      },
      search: {
        goods_uuid: '',
        goods_name: '',
      },
      search_is_show: false,
      // stateList: [],
      //搜索

      /************添加*************/
      add_is_show:false,
      add_goods_form:{
        moduleName: "GoodsData",
        actionName: "addGoods",
        ver:"1.0.0",
        module: "AddGoods",
        name:""
      },

      /************编辑************/
      edit_is_show:false,
      edit_goods_form:{
        moduleName: "GoodsData",
        actionName: "updateGoods",
        ver:"1.0.0",
        module: "UpdateGoods",
        goods_name:"",
        goods_uuid:""
      }
    });

    mutations.getGoodsInfoData=function(){
      let params={
        moduleName:store.state.GoodsInfoData.moduleName,
        actionName:store.state.GoodsInfoData.actionName,
        ver:store.state.GoodsInfoData.ver,
        module: store.state.GoodsInfoData.module,
        goods_uuid:store.state.GoodsInfoData.search.goods_uuid,
        goods_name:store.state.GoodsInfoData.search.goods_name,
        page: store.state.GoodsInfoData.limit.page,
        page_len: store.state.GoodsInfoData.limit.page_len
      }
      post("/goods",params).then(res=>{
        store.state.GoodsInfoData.total = res.data.totalCount
        store.state.GoodsInfoData.rows=res.data.resultList
      })
    }

    store.hotUpdate({
      mutations
    });
  }

    export default {
        name: "GoodsInfo",
      data(){
        return  store.state.GoodsInfoData
      },
      methods:{
        getConfigResult (res) {
          // 接收回调函数返回数据的方法
          this.student=res
          console.log(res)
        },
        SendMsg(e){
          let obj={
            content:{
              target:"123456",
              msg:e
            },
            skey:"13355514013"
          }
            socketApi.sendSock(obj,this.getConfigResult)
        },
        GetSearchList() {
          this.limit.page = 1;
          this.$store.commit('getGoodsInfoData');
        },
        PageClick(page) {
          this.limit.page = page;
          this.$store.commit('getGoodsInfoData');
        },
        /*****************选中****************/
        selected: function (p1) {
          this.curr_goods = p1
          console.log(p1)
          this.edit_goods_form.goods_name = this.curr_goods.goods_name
          this.edit_goods_form.goods_uuid = this.curr_goods.goods_uuid
          // this.editFormData.d_phone = this.curr_DeliverManage.d_phone
          // this.editFormData.d_pwd = this.curr_DeliverManage.d_pwd
          // this.editFormData.d_idnumber = this.curr_DeliverManage.d_idnumber
          // this.editFormData.d_cardnumber = this.curr_DeliverManage.d_cardnumber
          // this.$store.commit("DeliverManageGetDetail")
        },
        //取消选中
        handleClearCurrentRow(){
          this.curr_goods =""
          this.$refs.currentRowTable.clearCurrentRow();
        },
        handleRefresh(){
          this.$store.commit("getGoodsInfoData")
          this.curr_goods =""
        },

        /****************添加****************/
        handleAdd: function () {
          this.add_is_show = true;
        },
        handleModalCancel: function () {
          this.add_is_show = false;
          this.edit_is_show=false
        },
        /****************添加提交****************/
        handleAddModalOk: function (name) {
          this.$refs[name].validate(valid => {
            console.log(valid+"valid")
            if (valid) {
              post("mydubbo/goods", this.add_goods_form).then(res => {
                if (res.code == 0) {
                  this.$Message.info("添加成功")
                  this.handleRefresh()
                  this.add_is_show = false;
                } else {
                  this.$Message.error("添加失败")
                  this.add_is_show = false;
                }
              })
            }
          });
        },

        /****************编辑提交****************/
        handleEdit: function () {
          if(!this.curr_goods){
            this.$Message.error("请选中某一行")
          }else{
            this.edit_is_show = true;
          }
        },
        handleEditModalOk: function (name) {
          console.log(this.edit_goods_form)
          this.$refs[name].validate(valid => {
            if (valid) {
              post("mydubbo/goods", this.edit_goods_form).then(res => {
                if (res.code == 0) {
                  this.$Message.info("更新成功")
                  this.handleRefresh()
                  this.edit_is_show = false;
                } else {
                  this.$Message.error("更新失败")
                  this.edit_is_show = false;
                }
              })
            }
          });
        },

        /************************删除***********************/
        handleDel: function () {
          if (!this.curr_goods) {
            this.$Message.error("请选中某一行")
          } else {
            let _this = this
            const temp = {
              goods_uuid: this.curr_goods.goods_uuid,
              moduleName: "GoodsData",
              actionName: "delGoods",
              ver:"1.0.0",
              module: "DelGoods",
            }
            this.$Modal.confirm({
              title: '提示',
              content: '确认删除？',
              onOk: function () {
                post("mydubbo/goods", temp).then(res => {
                  if (res.code == 0) {
                    this.$Message.info("删除成功")
                    _this.handleRefresh()
                  } else {
                    this.$Message.error(res.data.msg)
                  }
                })
              }
            })
          }
        },
      },
      created() {
        this.$store.commit("getGoodsInfoData")
      }
    }
</script>

<style scoped>

</style>
