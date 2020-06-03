<template>
  <div>
    <Collapse v-model="collapseVal">
      <Panel name="1" style="text-align: left">
        服务进程信息
        <p slot="content" style="white-space: pre">{{threadInfo}}</p>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
  import Vue from 'vue';
  import store from '@/store/index';
  import {mutations} from "../store";
  import {apiAxios} from "../utils/Request";
  import {post} from "../utils/Request";


  if (!store.state.ThreadInfoData) {
    Vue.set(store.state, 'ThreadInfoData', {
      collapseVal:"1",
      threadInfo:""
    });

    mutations.getThreadInfoData=function(){
      post("/Thread",null).then(res=>{
        console.log(res.data)
        store.state.ThreadInfoData.threadInfo=res.data
      })
    }

    store.hotUpdate({
      mutations
    });
  }

    export default {
        name: "ThreadInfo",
      data () {
        return store.state.ThreadInfoData;
      },
      created(){
          this.$store.commit("getThreadInfoData")
      }
    }
</script>

<style scoped>

</style>
