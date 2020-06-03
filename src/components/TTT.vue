<template>
    <div>
      <h1>12312312</h1>
      <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
    export default {
        name: "TTT",
      data () {
        return {
          columns1: [
            {
              title: 'Name',
              key: 'name'
            },
            {
              title: 'Age',
              key: 'age'
            },
            {
              title: '补货数量	',
              key: 'buchong_num',
              width: '100px',
              render: (h, params) => {
                let that = this
                return h('InputNumber', {
                  class:"myinput",
                  props: {

                    value:params.row.buchong_num,
                    min: 0,
                    max:10,
                  },
                  on: {
                    'on-change': function (event) {
                      console.log(params)
                      if(  event.target.value>10){
                        console.log("哈哈哈啊哈哈")
                        params.row.buchong_num=10
                      }
                      // if(event == null){
                      //     event = 0
                      // }
                      // if (event > params.row.depot_num) {
                      //     event = params.row.depot_num
                      //     alert('超过最大值:'+params.row.depot_num);
                      //     return false;
                      // }
                      // params.row.buchong_num = event
                      // // 线上
                      // that.a.state.createDispatchTask.sku_list[params.index]['buchong_num'] = params.row.buchong_num

                      // if (params.row.buchong_num > params.row.depot_num){
                      //     params.row.
                      //     buchong_num = params.row.depot_num
                      //     that.a.state.sku_list[params.index]['buchong_num']  =params.row.depot_num
                      //     //that.a.state.createDispatchTask.sku_list[params.index]['buchong_num'] = params.row.depot_num
                      // }else if(params.row.buchong_num <= params.row.depot_num){
                      //     that.a.state.sku_list[params.index]['buchong_num']  = params.row.buchong_num
                      //     //that.a.state.createDispatchTask.sku_list[params.index]['buchong_num'] = params.row.buchong_num
                      // }else if(params.row.buchong_num < -params.row.device_num){
                      //     params.row.buchong_num = -params.row.device_num
                      //     that.a.state.sku_list[params.index]['buchong_num']  = -params.row.device_num
                      //     // that.a.state.createDispatchTask.sku_list[params.index]['buchong_num'] = -params.row.device_num
                      // }else if(params.row.buchong_num >= -params.row.device_num){
                      //     that.a.state.sku_list[params.index]['buchong_num'] = params.row.buchong_num
                      //     // that.a.state.createDispatchTask.sku_list[params.index]['buchong_num'] = params.row.buchong_num
                      // }

                      // 本地
                      // that.a.state.sku_list[params.index]['buchong_num'] = params.row.buchong_num;
                    },
                  }
                })
              }
            },
          ],
          data1: [
            {
              name: 'John Brown',
              age: 18,
              buchong_num:2,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
            },
            {
              name: 'Jim Green',
              age: 24,
              buchong_num:2,
              address: 'London No. 1 Lake Park',
              date: '2016-10-01'
            },
            {
              name: 'Joe Black',
              age: 30,
              buchong_num:2,
              address: 'Sydney No. 1 Lake Park',
              date: '2016-10-02'
            },
            {
              name: 'Jon Snow',
              age: 26,
              buchong_num:2,
              address: 'Ottawa No. 2 Lake Park',
              date: '2016-10-04'
            }
          ]
        }
      }
    }
</script>

<style scoped>

</style>
