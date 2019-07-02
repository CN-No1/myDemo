<template>
  <el-menu-item v-if="!item.children" :index="item.url">
    <router-link :to="{name: item.url}">
      <i :class="item.iconClass"></i>
      {{item.menuName}}
    </router-link>
  </el-menu-item>
  <el-submenu v-else :index="item.url">
    <template slot="title">
      <router-link :to="{name: item.url}">
        <i :class="item.iconClass"></i>
        {{item.menuName}}
      </router-link>
    </template>
    <el-menu-item v-for="(child, index) in item.children" :key="index" :index="child.url">
      <router-link :to="{name: child.url}">{{child.menuName}}</router-link>
    </el-menu-item>
  </el-submenu>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  @Component({
    components: {}
  })
  export default class MenuItem extends Vue {
    @Prop(Object) private item!: any;
  }
</script>
