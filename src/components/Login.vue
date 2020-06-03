<template>
  <div class="Login" id="Login"
       :style="style">
    <Card style="width:300px; margin:0 auto;top:30%;margin-left: 58%;opacity:0.9;">
      <div class="login">
        <h1>
          小卖柜实时监控
        </h1>
        <i-form ref="formInline"
                :model="formInline"
                :rules="ruleInline">
          <Form-item prop="mobile">
            <Input v-model="formInline.name">
              <span slot="prepend"><Icon type="md-contact"></Icon></span>
            </Input>
          </Form-item>
          <Form-item prop="pwd">
            <Input v-model="formInline.pwd"
                   type="password">
              <span slot="prepend"><Icon type="md-eye"></Icon></span>
            </Input>
          </Form-item>
          <Form-Item>
            <Poptip placement="right" width="300">
              <Input placeholder="验证码" v-model="formInline.verifyCode">
                <span slot="prepend"><Icon type="md-code"/></span>
                <span slot="append"><img height="20px" width="60px" v-bind:src="imgURL" @click="changeVerify"></span>
              </Input>
              <div class="api" slot="content">
                <img v-bind:src="imgURL" height="40px" width="180px">
              </div>
            </Poptip>
          </Form-Item>
          <Form-item>
            <router-link to="/FoggetPwd">
              <span>忘记密码?</span>
            </router-link>
            <i-button type="success" style="float: right;margin-left: 4px"
                      @click.native="handleSubmit('formInline')"
                      :disabled="formInline.mobile==''||formInline.pwd==''||formInline.verifyCode==''? true :false">登录
            </i-button>
            <i-button type="error" style="float: right"
                      @click.native="handleReset()">重置
            </i-button>
          </Form-item>
        </i-form>
      </div>
    </Card>
  </div>
</template>

<script>
  import Vue from 'vue';
  import store from '@/store/index';
  import {state} from "../store";
  import qs from 'qs'
  import {mutations} from "../store";
  import {post} from "../utils/Request";
  import {getToken} from "../utils/Auth";
  import {setCookie} from "../utils/Auth";

  if (!store.state.LoginData) {
    Vue.set(store.state, 'LoginData', {
      imgURL: "http://localhost:8099/getVerifyCode?",
      imgCode: '',
      style: {
        // backgroundImage: "url(" + require("../../assets/talkingdata.png") + ")",
        height: '100vh',
        width: '100vw'
      },
      formInline: {
        // 18656501861
        name: '13355514013',
        pwd: '1234',
        verifyCode: ""
      },
      ruleInline: {
        name: [{
          required: true,
          message: '请填写用户名',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: '请填写密码',
          trigger: 'blur'
        }, {
          type: 'string',
          min: 3,
          message: '密码长度不能小于6位',
          trigger: 'blur'
        }],
        verifyCode: [{
          required: true,
          message: '请填验证码',
          trigger: 'blur'
        },
          {
            type: 'string',
            max: 4,
            message: '验证码4位',
            trigger: 'blur'
          }]
      },
      user:"",
      token:""
    })

    /************************拿到数据*********************************/

    // mutations.getVerifyImg=function(state){
    //   apiAxios("GET","/partner/index/verify_code.html").then(res=>{
    //     console.log(res)
    //   })
    // }


    store.hotUpdate({
      mutations
    });
  }


  export default {
    data() {
      return this.$store.state.LoginData
    },
    methods: {
      handleSubmit(name) {
        let _this=this
        _this.$router.push("/Home")
        // console.log(getToken)
        // this.$refs[name].validate((valid) => {
        //   if (valid) {
        //     let params = {
        //       pwd: this.formInline.pwd,
        //       name: this.formInline.name,
        //       verify: this.formInline.verifyCode
        //     }
        //     console.log(qs.stringify(params))
        //     post("/login",params).then(res=>{
        //       if(res.code==0){
        //         _this.user=res.data.name
        //         _this.token=res.data.token
        //         setCookie("name",res.data.name)
        //         setCookie("token",res.data.token)
        //         _this.$router.push("/Home")
        //       }else {
        //         _this.$Message.error(res.msg)
        //       }
        //     })
        //   } else {
        //     this.$Message.error('表单验证失败!');
        //   }
        // })
      },
      handleReset(val) {
        this.formInline.verify =''
        this.formInline.pwd=''
        this.formInline.mobile=''
      },
      changeVerify: function () {
        this.imgURL = "http://localhost:8099/getVerifyCode?" + Math.random()
      },

    },
    mounted() {
    },
    created() {
      // this.setBackGroundImg()

    }
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 150px;
    padding-bottom: 200px;
  }

  .wrapper > h1 {
    text-align: center;
    vertical-align: middle;
    margin-bottom: 20px;
    color: #000;
  }

  .Login {
    position: relative;
    background-size: 100%;
    background: url("../assets/login-bg.jpg");
  }

  .login {
    margin: 0 auto;
    padding: 200px auto;
    width: 200px;
    height: 100%;
  }
</style>
