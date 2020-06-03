<template>

    <div>
     <div style="text-align: center;">
       <Carousel autoplay
                 autoplay-speed="5000"
                 height="300"
                 v-model="value2" loop>
         <CarouselItem>
           <div class="demo-carousel">
             <img src="@/assets/2.jpg" height="300" width="1000">
           </div>
         </CarouselItem>
         <CarouselItem>
           <div class="demo-carousel">
             <img src="@/assets/3.jpg" height="300" width="1000">
           </div>
         </CarouselItem>
         <CarouselItem>
           <div class="demo-carousel">
             <img src="@/assets/4.jpg" height="300" width="1000">
           </div>
         </CarouselItem>
         <CarouselItem>
           <div class="demo-carousel">
             <img src="@/assets/5.jpg" height="300" width="1000">

           </div>
         </CarouselItem>
       </Carousel>
     </div>
      <div id="myChart0" :style="{width: '500px', height: '400px',float:'left',marginTop:'50px',marginLeft:'200px'}"></div>
      <div id="myChart" :style="{width: '500px', height: '400px',float:'right',marginTop:'50px',marginRight:'200px'}"></div>
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

  if (!store.state.MainData) {
    Vue.set(store.state, 'MainData', {

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
        name: "Main",
      data() {
        return this.$store.state.MainData
      },
      mounted(){
        this.drawCycle();
        this.drawLine();
      },
      methods:{
          drawLine(){
            let myChart0 = this.$echarts.init(document.getElementById('myChart0'))
            myChart0.setOption({
              value2:0,
              title : {
                text: '未来一周气温变化',
                subtext: '纯属虚构'
              },
              tooltip : {
                trigger: 'axis'
              },
              legend: {
                data:['最高气温','最低气温']
              },
              toolbox: {
                show : true,
                feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar']},
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              calculable : true,
              xAxis : [
                {
                  type : 'category',
                  boundaryGap : false,
                  data : ['周一','周二','周三','周四','周五','周六','周日']
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLabel : {
                    formatter: '{value} °C'
                  }
                }
              ],
              series : [
                {
                  name:'最高气温',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10],
                  markPoint : {
                    data : [
                      {type : 'max', name: '最大值'},
                      {type : 'min', name: '最小值'}
                    ]
                  },
                  markLine : {
                    data : [
                      {type : 'average', name: '平均值'}
                    ]
                  }
                },
                {
                  name:'最低气温',
                  type:'line',
                  data:[1, -2, 2, 5, 3, 2, 0],
                  markPoint : {
                    data : [
                      {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                    ]
                  },
                  markLine : {
                    data : [
                      {type : 'average', name : '平均值'}
                    ]
                  }
                }
              ]
            })
          },
          drawCycle(){
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption({
              title : {
                text: '本站点用户访问来源',
                subtext: '纯属虚构',
                x:'center'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient : 'vertical',
                x : 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
              },
              toolbox: {
                show : true,
                feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                      funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                      }
                    }
                  },
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              calculable : true,
              series : [
                {
                  name:'访问来源',
                  type:'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                  ]
                }
              ]
            })
          }
      }

    }
</script>

<style scoped>

</style>
