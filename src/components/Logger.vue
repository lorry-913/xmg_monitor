<template>
  <div>
    <div style="position: relative">
      <Breadcrumb style="float: left;margin-top: 6px;margin-left: 10px">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>
          服务监控
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>
          日志信息
        </BreadcrumbItem>
      </Breadcrumb>
      <Button @click="search_is_show = !search_is_show" style="float: right" shape="circle" icon="ios-search"></Button>
      <Poptip trigger="hover"
              content="页面刷新"
              style="float: right">
        <Button shape="circle"
                icon="ios-refresh"
                @click="handleRefresh">
        </Button>
      </Poptip>
      <Divider type="vertical" style="margin-top: 20px"/>

      <div v-show="search_is_show">
        <!-- 搜索框 -->
        <Form inline style="">
          <FormItem label="日志行:">
            <InputNumber :max="200"
                         :min="1"
                         style="width: 150px"
                         v-model="search.line">
            </InputNumber>
          </FormItem>
          <FormItem label="关键字:">
            <Input type="text"
                   v-model="search.keyword">
            </Input>
          </FormItem>
          <FormItem label="日期:">
            <DatePicker
                        style="width: 200px"
                        format="yyyy-MM-dd"
                        v-model="search.date"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <i-button type="primary" icon="ios-search" @click="GetSearchList" style="margin-top:32px">查询</i-button>
          </FormItem>
        </Form>
      </div>

      <div >
        <Collapse v-model="collapseVal">
          <Panel name="1" style="text-align: left;width: 100%">
            服务1
            <p slot="content" style="white-space: pre">
              {{messsage}}</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import store from '@/store/index';
  import {mutations} from "../store";
  import {post} from "../utils/Request";
  import {router} from "../router";
  import {loading} from "../utils/Spin";
  import {cancelLoad} from "../utils/Spin";
  import {initWebSocket} from "../utils/socket";
  import {specialDate} from "../utils/date";

  var websock = null;
  var global_callback = null;
  var serverPort = '8099';	//webSocket连接端口
  var wsuri = "ws://" + "127.0.0.1" + ":" + serverPort + "/wbSocket";
  websock = new WebSocket(wsuri);

  if (!store.state.LoggerData) {
    Vue.set(store.state, 'LoggerData', {
      search_is_show: false,
      collapseVal: "1",
      server1: "",
      search: {
        line: 20,
        keyword:"",
        date:""
      },
      sockectId: "",
      messsage: ""
    });

    mutations.getLoggerData = function () {
      console.log(specialDate(store.state.LoggerData.search.date))
      let params={
        line: store.state.LoggerData.search.line,
        keyword:store.state.LoggerData.search.keyword,
        date:specialDate(store.state.LoggerData.search.date)
      }
      console.log(params.date)
      post("/LoggerInfo", params).then(res => {
        store.state.LoggerData.messsage=res.data
      })
    }

    mutations.test = function () {
      post("/saveArticle", null).then(res => {
        console.log(res)
      })
    }

    store.hotUpdate({
      mutations
    });
  }

  export default {
    name: 'Loggger',
    data() {
      return store.state.LoggerData;
    },
    methods: {
      loggerWebsocket: function () {
        let _this = this
        websock.onmessage = function (e) {
          _this.messsage = _this.messsage + "\n" + e.data
          // websocketonmessage(e);
        }
        websock.onopen = function () {
          console.log(_this.messsage)
          console.log("websock连接成功")
          // websocketOpen();
        }
        //连接发生错误的回调方法
        websock.onerror = function () {
          console.log("WebSocket连接发生错误");
        }
      },
      change: function () {
        var a = 0
        a++;
        this.messsage = a;
      },
      handleRefresh: function () {
        this.$store.commit("getLoggerData")
      },
      GetSearchList: function () {
        this.$store.commit("getLoggerData")
      }
    },
    mounted() {
      this.$nextTick(function () {
        setInterval(this.loggerWebsocket, 1000)
      })
    },
    created() {
        this.$store.commit("getLoggerData")
        // this.$store.commit("test")
    },
  }
</script>

<style scoped>

</style>
