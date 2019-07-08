<template>
  <div class="header">
    <el-button :icon="iconClass" @click="chnageCollapse" style="border: none;width:66px;"></el-button>
    <div class="nav">
      <breadcrumb></breadcrumb>
    </div>
    <div class="drop">
      <el-dropdown>
        <span class="el-dropdown-link">
          个人设置
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Provide } from "vue-property-decorator";
import MenuItem from "./MenuItem.vue";
import Breadcrumb from "./Breadcrumb.vue";
@Component({
  components: { MenuItem, Breadcrumb },
})
export default class PublicHeader extends Vue {
  private isCollapse: boolean = false;
  get iconClass() {
    return this.isCollapse ? "el-icon-d-arrow-right" : "el-icon-d-arrow-left";
  }
  private chnageCollapse() {
    this.isCollapse = !this.isCollapse;
    this.$emit("changeCollapse", this.isCollapse);
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
}
.nav {
  margin-right: auto;
}
.drop {
  line-height: 56px;
}
</style>
