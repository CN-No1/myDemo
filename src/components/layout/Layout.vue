<template>
  <section>
    <div class="content">
      <div class="side">
        <side-bar :isCollapse="isCollapse"></side-bar>
      </div>
      <div class="right">
        <public-header @changeCollapse="changeCollapse"></public-header>
        <div class="routerview">
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from "vue-property-decorator";
  import PublicHeader from './header/PublicHeader.vue';
  import SideBar from './sideBar/SideBar.vue';
  @Component({
    components: {PublicHeader,SideBar}
  })
  export default class Layout extends Vue {
    private isCollapse:Boolean = false;
    private changeCollapse(res:Boolean){
      this.isCollapse = res;
    }
  }
</script>


<style lang="less" scoped>
  .content{
    display: flex;
  }
  .right{
    width:100%;
  }
  .routerview{
    padding: 35px;
  }
</style>
