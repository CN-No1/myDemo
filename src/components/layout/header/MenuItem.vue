<template>
  <el-menu-item v-if="!item.children" :index="item.url" @click="pushTo(item.url)">
    <i :class="item.iconClass"></i>
    {{item.menuName}}
  </el-menu-item>
  <el-submenu v-else :index="item.url">
    <template slot="title" @click="pushTo(item.url)">
      <i :class="item.iconClass"></i>
      {{item.menuName}}
    </template>
    <el-menu-item v-for="(child, index) in item.children" :key="index" :index="child.url">
      <router-link :to="{name: child.url}">{{child.menuName}}</router-link>
    </el-menu-item>
  </el-submenu>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class MenuItem extends Vue {
  @Prop(Object) private item!: any;
  private pushTo(url: any) {
    this.$router.push({ name: url });
  }
}
</script>
