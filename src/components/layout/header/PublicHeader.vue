<template>
  <el-menu
    mode="horizontal"
    default-active="home"
    class="el-menu-demo"
  >
    <menu-item v-for="(item,index) in MenuList" :key="index" :item="item"></menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import MenuItem from './MenuItem.vue';
@Component({
  components: { MenuItem }
})
export default class PublicHeader extends Vue {
    private MenuList: any[] = [];
    private mounted(){
        this.getMenuList();
    }
    public getMenuList(){
        this.MenuList = [
            {
                menuName:"首页",
                url:"home",
                iconClass:"iconfont icon-shouye"
            },
            {
                menuName:"2",
                url:"2",
                iconClass:"iconfont icon-shouye"
            }
        ];
    }
}
</script>

<style>
</style>
