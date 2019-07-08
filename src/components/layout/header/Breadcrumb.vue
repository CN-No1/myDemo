<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in menuList" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from 'vue-property-decorator';

export default class Breadcrumb extends Vue{
    private menuList:Array<String> = [];

    @Prop(Array)navList!:Array<String>;

    @Watch("navList",{deep:true,immediate:true})
    private routerChange(newVal:any,oldVal:any){
        this.menuList = this.navList;
    }
}
</script>

<style lang="less" scoped>

</style>
