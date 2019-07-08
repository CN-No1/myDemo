<template>
  <div>
    <div>
      <el-button @click="goBack()">返回</el-button>
      <el-button type="success" @click="save()">保存</el-button>
    </div>
    <div class="content">
      <annotator :doc="doc" :entityPosition="entityPosition"></annotator>
    </div>
    <div class="table">
      <el-table :data="entityPosition" style="width: 100%">
        <el-table-column prop="value" label="标注内容"></el-table-column>
        <el-table-column prop="entity" label="关联实体"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteRel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Annotator from "../../../components/Annotator.vue";

interface Position {
  //  定位对象
  id: string;
  lableId: string;
  startOffset: number;
  endOffset: number;
  entity: string;
}

@Component({
  components: { Annotator },
})
export default class Annotate extends Vue {
  private doc: string = ""; //  文档内容（纯文本）

  private entityPosition: any = [
    {
      //  标签在文档中的位置
      startOffset: 4,
      endOffset: 6,
      value: "取款",
      entity: "item",
    },
    {
      startOffset: 0,
      endOffset: 2,
      value: "同城",
      entity: "place",
    },
  ];

  private mounted() {
    const docId = this.$route.params.docId;
    this.doc =
      "原告福州市顺辉运输有限公司诉称，2013年10月1日，原告的驾驶员杨海军驾驶闽A×××××号重型半挂牵引车，在324国道被告管辖路段发生交通事故。";
  }

  private goBack() {
    this.$router.back();
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  line-height: 34px;
}
</style>
