<template>
  <div>
    <div class="header">
      <el-select v-model="moduleId" placeholder="请选择模块" @change="selectModule">
        <el-option v-for="item in modules" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="statusCode" placeholder="请选择状态" @change="selectStatus">
        <el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="content" label="文章内容" :formatter="docContent" align="center"></el-table-column>
      <el-table-column prop="moduleName" label="模块" align="center">
        <template slot-scope="scope">
          <el-tag close-transition>{{scope.row.moduleName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop label="标注状态" :formatter="statusFmt" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="未标注" placement="top-start" align="center">
            <i v-if="scope.row.status === '0'" class="iconfont">&#xe600;</i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="已标注" placement="top-start" align="center">
            <i v-if="scope.row.status === '1'" class="iconfont">&#xe68c;</i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="去标注" placement="top-start" align="center">
            <i @click="annotate(scope.row.id)" class="iconfont">&#xe603;</i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagenation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DocModel from "@/api/model/DocModel";
import AnnotationAPIImpl from "@/api/impl/AnnotationAPIImpl";
import ModuleModel from "@/api/model/ModuleModel";
import EntityAPIImpl from "@/api/impl/EntityAPIImpl";
@Component({
  components: {}
})
export default class DocList extends Vue {
  private tableData: DocModel[] = [];
  private docContent(val: any) {
    return val.content;
  }
  private statusFmt(val: any) {
    switch (val.status) {
      case "0":
        return "未标注";
      case "1":
        return "已标注";
    }
  }
  private modules: ModuleModel[] = [];
  private status: any[] = [
    {
      id: "0",
      name: "未标注"
    },
    {
      id: "1",
      name: "已标注"
    }
  ];
  private moduleId: string = ""; // 模块Id
  private statusCode: string = ""; // 状态码
  private page: number = 1; // 当前页
  private size: number = 10; // 每页多少条
  private total: number = 100; // 总条数
  private loading = true; // 表格loading
  private annotationAPI = new AnnotationAPIImpl();
  private entityAPI = new EntityAPIImpl();

  private mounted() {
    this.getModule();
    this.getDocByParam();
  }

  private getModule() {
    // 获取module
    this.entityAPI.getModule().then(({ data }: any) => {
      this.modules = data;
    });
  }

  private getDocByParam() {
    this.loading = true;
    // 根据条件查询文档
    this.annotationAPI
      .getDocByParam(this.moduleId, this.statusCode, this.page - 1, this.size)
      .then(({ data }) => {
        this.total = data.numberOfElements;
        this.tableData = data.content;
        this.loading = false;
      });
  }

  private handleSizeChange(val: any) {
    this.size = val;
  }

  private handleCurrentChange(val: any) {
    this.getDocByParam();
  }

  private selectModule(val: any) {
    this.getDocByParam();
  }

  private selectStatus(val: any) {
    this.getDocByParam();
  }

  private annotate(id: any) {
    // 前往标注页面
    this.$router.push({ name: "annotate", params: { docId: id } });
  }
}
</script>

<style lang="less" scoped>
@import "~less/tree-form";
.pagenation {
  text-align: center;
  padding-top: 30px;
}
</style>
