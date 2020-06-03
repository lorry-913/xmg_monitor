import Vue from 'vue';
import Router from 'vue-router';
import {inArray} from "../utils/IsExsitArray";
import {post} from "../utils/Request";
import {store} from "../store";
import {state} from "../store";
import {getCookie} from "../utils/Auth";
import {Message} from "iview";


Vue.use(Router)


const HelloWorld =(resolve)=>require(['@/components/HelloWorld'],resolve)


export var routes = [
  {
    path: '/',
    name:"home",
    component: resolve => require(['../components/Home.vue'], resolve),
  },
  {
    path: '/Authentication',
    name: 'Authentication',
    component: resolve => require(['../components/Authentication.vue'], resolve)
  },
  {
    path: '/login',
    name:"login",
    component: resolve => require(['../components/Login.vue'], resolve)
  },
  {
    path: '/Home',
    name:"home",
    component: resolve => require(['../components/Home.vue'], resolve),
    children:[
      {
        path: '/TTT',
        name: 'tttt',
        component:resolve => require(['../components/TTT.vue'], resolve)
      },
      {
        path: '/Main',
        name:"main",
        component: resolve => require(['../components/Main.vue'], resolve)
      },
      {
        path: '/Logger',
        name:"logger",
        component: resolve => require(['../components/Logger.vue'], resolve)
      },
      {
        path: '/ThreadInfo',
        name:"threadInfo",
        component: resolve => require(['../components/ThreadInfo.vue'], resolve)
      },
      // GoodsInfo.vue
      {
        path: '/GoodsInfo',
        name:"GoodsInfo",
        component: resolve => require(['../components/GoodsInfo.vue'], resolve)
      },
    ]
  },
  {
    path: '/Side',
    name: 'side',
    component: resolve => require(['../components/Side.vue'], resolve)
  },
];

const mode = "history";
export const router = new Router({
  routes,
  mode
});

var freeuris=["login","FoggetPwd"]


// router.beforeEach((to, from, next) => {
//     console.log("守护路由")
//     if(inArray(to.name,freeuris)!=-1){
//       next()
//     } else{
//       post("/checkLogin",null).then(res=>{
//         if(res.code=="0"){
//           next()
//         }
//         if(res.code=="-1"){
//           router.push("/login")
//         }
//       })
//     }
//   }
// )

export default router
