<template>
  <el-submenu v-if="item.children" :index="item.name">
    <template slot="title">
      <i class="iconfont">{{item.meta.iconClass}}</i>
      <span slot="title">{{item.meta.menuName}}</span>
    </template>
    <el-menu-item
      v-for="child in item.children"
      :key="child.name"
      :index="child.name"
      :style="child.meta.style"
      @click="pushTo(child.name) "
    >{{child.meta.menuName}}</el-menu-item>
  </el-submenu>
  <el-menu-item v-else :index="item.name" @click="pushTo(item.name)">
    <i class="iconfont">{{item.meta.iconClass}}</i>
    <template slot="title">{{item.meta.menuName}}</template>
  </el-menu-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class SideBarItem extends Vue {
  @Prop(Object) private item!: any;
  private pushTo(url: any) {
    this.$router.push({ name: url });
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: calc(100vh);
}
.el-menu--collapse {
  width: 50px;
  min-height: calc(100vh);
}
.el-submenu .el-menu-item {
  min-width: 150px !important;
}
</style>