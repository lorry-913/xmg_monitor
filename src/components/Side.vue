<template>
  <Menu theme="dark" :style="{width:'auto'}"
        :class="menuitemClasses"
        @on-open-change="handleOpen"
        @on-select="handleSelect"
  >
    <Submenu name="1"
             style="margin-top: 10px">
      <template slot="title">
        <!--<Icon type=""></Icon>-->
        服务监控
      </template>
      <MenuItem name="1-1">
        <!--<Icon :type="child.icon"></Icon>-->
        进程状态
      </MenuItem>
      <MenuItem name="1-2">
        <!--<Icon :type="child.icon"></Icon>-->
        服务与CPU
      </MenuItem>
      <MenuItem name="1-3">
        <!--<Icon :type="child.icon"></Icon>-->
        服务与内存
      </MenuItem>
      <MenuItem name="1-4">
        <!--<Icon :type="child.icon"></Icon>-->
        服务运行状况
      </MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
  import Vue from 'vue';
  import store from '@/store/index';
  import {mutations} from "../store";
  import {apiAxios} from "../utils/Request";
  import {router} from "../router";
  import {loading} from "../utils/Spin";
  import {cancelLoad} from "../utils/Spin";

  if (!store.state.SideData) {
    Vue.set(store.state, 'SideData', {
      initParams: {
        type: "left",
        typeDetail: "detail"
      },
      curr_menu_id: localStorage.getItem('curr_menu_id'),
      curr_menu: '',
    });

    store.hotUpdate({
      mutations
    });
  }

  export default {
    name: "Side",
    data() {
      return store.state.SideData;
    },
    computed: {
      xyWidth() {
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
    methods: {
      handleOpen: function () {
        if (window.innerWidth > this.xyWidth) {
          if (store.state.AppData.isCollapsed === true) {
            store.state.AppData.isCollapsed = false;
          }
        }
      },
      handleSelect(name) {
        this.curr_menu_id = name
        localStorage.setItem("curr_menu_id", this.curr_menu_id);
        if (window.innerWidth <= this.xyWidth) {
          if (store.state.AppData.isCollapsed == false) {
            store.state.AppData.sideModal = false;
            store.state.AppData.isCollapsed = true;
          }
        }
      }
    },
    created() {
      this.$store.commit("getMenus")
    }
  }
</script>

<style scoped>
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
</style>
