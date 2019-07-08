<template>
  <section>
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Innerlayout extends Vue {}
</script>

<style lang="less" scoped>
</style>
