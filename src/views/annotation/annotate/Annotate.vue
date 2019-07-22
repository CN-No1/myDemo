<template>
  <div>
    <div>
      <el-button @click="goBack()">返回</el-button>
      <el-button type="success" @click="saveAll()">保存</el-button>
      <el-button @click="next()">下一个</el-button>
    </div>
    <div class="content">
      <annotator
        ref="annotator"
        :doc="doc.content"
        :entityPosition="entityPosition"
        @getRangeData="getRangeData"
        @addLabel="addLabel"
        @showDetail="showDetail"
      ></annotator>
    </div>
    <div class="table">
      <el-table
        :data="entityPosition"
        style="width: 100%"
        :default-sort="{prop: 'value', order: 'descending'}"
      >
        <el-table-column prop="value" sortable label="标注内容"></el-table-column>
        <el-table-column prop="entity" sortable label="关联实体"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteRel(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="标注"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <h3>标注文本：</h3>
      <div>{{text}}</div>
      <h3>所属实体：</h3>
      <treeselect
        v-model="entityArr"
        valueFormat="object"
        :multiple="true"
        :options="entityList"
        :searchable="true"
        :sort-value-by="sortValueBy"
        :flat="true"
        placeholder="请选择文本所属实体"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Annotator from "@/components/Annotator.vue";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import AnnotationModel, { Position } from "@/api/model/AnnotationModel";
import DocModel from "@/api/model/DocModel";
import AnnotationAPIImpl from "@/api/impl/AnnotationAPIImpl";
import EntityAPIImpl from "@/api/impl/EntityAPIImpl";

@Component({
  components: { Annotator, Treeselect }
})
export default class Annotate extends Vue {
  private doc: DocModel = { content: "" }; //  文档对象
  private annotation = new AnnotationModel();
  private entityPosition: Position[] = []; // 标注位置
  private dialogVisible: boolean = false; // 对话框显示
  private text: string = ""; // 选中文本
  private entityList: any[] = []; // 实体类树
  private entityArr: any[] = []; // 选中实体类
  private sortValueBy: string = "LEVEL"; // 选项排序方式（"ORDER_SELECTED"，"LEVEL"，"INDEX"）
  private annotationAPI = new AnnotationAPIImpl();
  private entityAPI = new EntityAPIImpl();
  $confirm: any;

  private mounted() {
    // 初始化
    this.getDocById(this.$route.params.docId);
  }

  private getDocById(id: string) {
    // 获取文档对象
    this.annotationAPI.getDocById(id).then(({ data }: any) => {
      this.doc = data;
      this.getEntityList();
      this.getAnnotation();
    });
  }

  private getEntityList() {
    // 获取实体类树
    this.entityAPI.getClass(this.doc.moduleId).then(({ data }) => {
      if (data) this.entityList = data.entityList;
    });
  }

  private getAnnotation() {
    // 获取文本位置信息
    this.annotationAPI.getAnnotation(this.doc.id).then(({ data }) => {
      if (data) this.entityPosition = data.positionList;
    });
  }

  private getRangeData(text: string) {
    if (text === "") {
      return;
    }
    // 选中文本
    this.dialogVisible = true;
    this.text = text;
  }

  private handleClose() {
    // 关闭对话框
    this.entityArr = [];
    this.dialogVisible = false;
  }

  private save() {
    // 保存
    const ref = this.$refs.annotator as any;
    ref.addLabel();
    this.handleClose();
    // console.log(this.entityArr)
  }

  private addLabel(offset: any) {
    this.entityArr.map(item => {
      // debugger
      const arr = this.entityPosition.filter(
        e => e.value === item.label && e.entityId === item.id
      );
      if (arr.length === 0) {
        const newLabel: Position = {
          startOffset: offset.startOffset,
          endOffset: offset.endOffset,
          value: this.text,
          entityId: item.id,
          entity: item.label
        };
        this.entityPosition.push(newLabel);
      }
    });
    // console.log(this.entityArr)
  }

  private deleteRel(index: any) {
    // 删除实体关联
    this.entityPosition.splice(index, 1);
  }

  private showDetail(value: string) {
    const innerTableData = this.entityPosition.filter(
      item => item.value === value
    );
    this.text = value;
    innerTableData.map(item => {
      const obj = {
        id: item.entityId,
        label: item.value
      };
      this.entityArr.push(obj);
    });
    this.dialogVisible = true;
  }

  private goBack() {
    // 返回
    this.$confirm(
      "检测到未保存的内容，是否在离开页面前保存修改？",
      "确认信息",
      {
        distinguishCancelAndClose: true,
        confirmButtonText: "保存",
        cancelButtonText: "放弃修改"
      }
    )
      .then(() => {
        this.save();
        this.$router.back();
      })
      .catch((action: any) => {
        if(action === 'cancel'){
          this.$router.back();
        }
      });
  }

  private saveAll() {
    // 保存标注信息
    this.annotation.positionList = this.entityPosition;
    this.annotation.docId = this.doc.id;
    this.annotationAPI.createOrUpdateAnnotation(this.annotation)
  }

  private next() {
    // 下一条
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  line-height: 34px;
}
</style>
