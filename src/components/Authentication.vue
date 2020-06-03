<template>
      <div class="Authentication">
        <Layout>
          <Header class="header">
            <div class="first_head" style="margin-top: 20px">
              <div>
                <img src="@/assets/loggo.png" style="width: 150px;height: 60px;float: left;margin-top: 10px;margin-left: 450px">
                <Input placeholder="搜索" style="width: 250px;position: relative;margin-left: 50px">
                  <Icon type="ios-search" slot="suffix" />
                </Input>
              </div>
            </div>
            <div class="h_content">
              <Menu class="men1" mode="horizontal" active-name="1">
                <div class="layout-nav" >
                  <MenuItem name="1" style="margin-left: -150px">
                    测试和评估 
                  </MenuItem>
                  <MenuItem name="2"  style="margin-left: -10px">
                    认证和审核 
                  </MenuItem>
                  <MenuItem name="3">
                    检验和监督 
                  </MenuItem>
                  <MenuItem name="4">
                    培训和资格认证
                  </MenuItem>
                  <MenuItem name="5">
                    咨询和项目管理
                  </MenuItem>

                  <Submenu class="serclas" name="6">
                    <template slot="title">
                          服务类别
                    </template>
                    <MenuGroup>
                      <MenuItem name="6-1">新增和启动</MenuItem>
                      <MenuItem name="6-2">活跃分析</MenuItem>
                      <MenuItem name="6-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup>
                      <MenuItem name="6-4">用户留存</MenuItem>
                      <MenuItem name="6-5">流失用户</MenuItem>
                    </MenuGroup>
                  </Submenu>
                </div>
              </Menu>
            </div>
          </Header>
          <Content style="text-align: center;height: 2000px;background-color: white">
            <div>
              <Carousel v-model="value2" loop radius-dot="false">
                <CarouselItem>
                  <div class="demo-carousel" >
                    <img src="@/assets/ce1w9036_core_2_1.jpg" style="width: 890px;height: 445px">
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div class="demo-carousel">
                    <img src="@/assets/china-mark_core_2_1.jpg" style="width: 890px;height: 445px">
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div class="demo-carousel" >
                    <img src="@/assets/testing-pack_core_2_1.jpg" style="width: 890px;height: 445px">
                  </div>
                </CarouselItem>

              </Carousel>
            </div>
            <div style="text-align: center;width: 100%">
              <Row class="uprow">
                  <div class="hhh" style="border:1px solid ;width: 300px;height: 222px;">

                  </div>
                  <div class="hhh" style="border:1px solid ;width: 300px;height: 222px">

                  </div>
                  <div class="hhh" style="border:1px solid ;width: 300px;height: 222px">

                  </div>
                  <!--<label for="inp" v-show="flag<3" style="display: inline-block" class="picuplaod">-->
                  <!--<div class="pic_icon" style="text-align: center;background-color: #FFFFFF">-->
                  <!--<img src="@/assets/Group.png">-->
                  <!--</div>-->
                  <!--</label>-->
                  <!--<input style="display: none" name="file" id="inp" type="file"-->
                  <!--accept="image/*"-->
                  <!--@change="update"/>-->
              </Row>
            </div>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>
</template>

<script>
  import Vue from 'vue';

  export default {
        name: "Authentication"
    }
</script>

<style scoped>
    .header{
      height: 150px;
      background-color: white;
      text-align: center;
    }
    .men1{
    }
    .ivu-menu-item{
      /*margin-left: 50px;*/

    }
    .serclas{
      margin-left: 150px;
    }
</style>
