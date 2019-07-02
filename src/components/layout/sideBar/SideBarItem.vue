<template>
    <el-submenu v-if="item.children" :index="item.url">
    <template slot="title">
      <i :class="item.iconClass"></i>
      <span slot="title"  @click="pushTo(item.url)">
        {{item.menuName}}
      </span>
    </template>
    <el-menu-item-group>
      <el-menu-item v-for="child in item.children" :key="child.url" :index="child.url" @click="pushTo(child.url)">
        {{child.menuName}}
      </el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-menu-item v-else :index="item.url" @click="pushTo(item.url)">
    <i :class="item.iconClass"></i>
        <template slot="title">
            {{item.menuName}}
        </template>
  </el-menu-item>
</template>

<script lang="ts">
import { Vue, Component, Prop }from 'vue-property-decorator';
@Component({
    components: {}
})
export default class SideBarItem extends Vue{
    @Prop(Object) item!: any;
    private pushTo(url:any){
        this.$router.push({name: url})
    }
}

</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>