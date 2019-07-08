<template>
    <section>
        <el-menu default-active="1" class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import SideBarItem from './SideBarItem.vue';
@Component({
    components:{SideBarItem}
})
export default class SideBar extends Vue{
    @Prop(Boolean)isCollapse:Boolean = false;
    private sideMenu:any[] = [];
    private mounted(){
        this.getSideMenu()
    }
    private getSideMenu(){
        console.log(this.$router)
        var router = this.$router as any;
        this.sideMenu = router.options.routes;
    }
    private handleOpen(){

    }
    private handleClose(){

    }
}
</script>
