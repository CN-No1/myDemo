<template>
  <section>
    <public-header></public-header>
    <div class="content">
      <div class="side">
        <side-bar></side-bar>
      </div>
      <div class="right">
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import PublicHeader from './header/PublicHeader.vue';
  import SideBar from './sideBar/SideBar.vue';
  @Component({
    components: {PublicHeader,SideBar}
  })
  export default class Layout extends Vue {
  }
</script>


<style lang="less" scoped>
  .content{
    display: flex;
  }
</style>
