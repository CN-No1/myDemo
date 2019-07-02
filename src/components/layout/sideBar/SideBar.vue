<template>
    <section>
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-button :icon="iconClass" @click="chnageCollapse" style="float:right;"></el-button>
            <li style="clear:both;"></li>
            <side-bar-item v-for="(item, index) in sideMenu" :key="index" :item="item"></side-bar-item>
        </el-menu>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SideBarItem from './SideBarItem.vue';
@Component({
    components:{SideBarItem}
})
export default class SideBar extends Vue{
    private isCollapse:Boolean = false;
    private iconClass:String = this.isCollapse?"el-icon-d-arrow-right":"el-icon-d-arrow-left";
    private sideMenu:any[] = [];
    private mounted(){
        this.getSideMenu()
    }
    private getSideMenu(){
        this.sideMenu = [
            {
                menuName:"首页",
                url:"home",
                iconClass:"el-icon-location"
            },
            {
                menuName:"首页",
                url:"home",
                iconClass:"el-icon-location",
                children:[{
                    menuName:"首页",
                    url:"home",
                    iconClass:"el-icon-location",
                }]
            }
        ];
    }
    private chnageCollapse(){
        this.isCollapse = !this.isCollapse;
        this.iconClass = this.isCollapse?"el-icon-d-arrow-right":"el-icon-d-arrow-left";
    }
    private handleOpen(){

    }
    private handleClose(){

    }
}
</script>
