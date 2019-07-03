<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in navList" :key="index">{{item.menuName}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';

export default class Breadcrumb extends Vue{
    @Prop(Array)navList:Array<String> = [];
}
</script>

<style lang="less" scoped>

</style>
