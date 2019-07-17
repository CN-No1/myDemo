<template>
  <section>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <side-bar-item v-for="(item, index) in sideMenu" :key="index" :item="item"></side-bar-item>
    </el-menu>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject, Watch } from "vue-property-decorator";
import SideBarItem from "./SideBarItem.vue";
@Component({
  components: { SideBarItem },
})
export default class SideBar extends Vue {
  @Prop(Boolean) 
  private isCollapse: boolean = false;
  private defaultActive: string = "home";
  private sideMenu: any[] = [];
  private mounted() {
    this.getSideMenu();
  }
  private getSideMenu() {
    // console.log(this.$router);
    const router = this.$router as any;
    this.sideMenu = router.options.routes;
  }
  @Watch("$route.path", { immediate: true, deep: true })
  private router(newVal: object, oldVal: object) {
    // 实现默认选中
    const ro = this.$route as any;
    this.defaultActive = ro.name;
  }
}
</script>
