<template>
  <div>
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
            prop="name"
            label="文章名">
        </el-table-column>
        <el-table-column
            prop="module"
            label="标签"
            :filters="moduleList"
            :filter-method="filterTag"
            filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-tag close-transition>{{scope.row.moduleName}}</el-tag>
        </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="去标注" placement="top-start">
                    <i @click="annotate(scope.row.id)" class="iconfont">&#xe603;</i>
                </el-tooltip>
            </template>
        </el-table-column>
  </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({
  components: { }
})
export default class docList extends Vue{
    private tableData = [
        {
            id: "1",
            name: '文章1',
            moduleId:'1',
            moduleName:"道路交通",
        },        
        {
            id: "2",
            name: '文章2',
            moduleId:'2',
            moduleName:"劳动纠纷",
        }
    ]

    private moduleList = [
        { text: '道路交通', value: '1' },
        { text: '劳动纠纷', value: '2' }
    ]

    private filterTag(value:any, row:any) {
        return row.moduleId === value;
    }

    private annotate(id:any){
        this.$router.push({name:"annotate",params:{docId:id}})
    }
};
</script>