<template>
  <el-form ref="form" label-width="180px" v-loading="loading">
    <el-form-item label="标注问题：">
      <annotator
        ref="annotator"
        :doc="doc.content"
        :entityPosition="doc.annotationList"
        @getRangeData="getRangeData"
        @addLabel="addLabel"
        @showDetail="showDetail"
      ></annotator>
    </el-form-item>
    <el-form-item label="标记词汇 | 属性：">
      <div class="annotator" v-if="seletedWord">
        <b style="color:red;">{{text}}</b>
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
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </div>
    </el-form-item>
    <el-form-item label="已标注：">
      <el-table
        :data="doc.annotationList"
        style="width: 100%"
        :header-cell-style="rowStyle"
        :row-style="rowStyle"
      >
        <el-table-column prop="value" label="文本" width="180"></el-table-column>
        <el-table-column prop="entity" label="关联实体" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(scope)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="saveAll()">保存</el-button>
      <!-- <el-button @click="prev()">上一个</el-button>
      <el-button @click="next()">下一个</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Annotator from "@/components/Annotator.vue";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import AnnotationModel, { Position } from "@/api/model/AnnotationModel";
import AnnotationAPIImpl from "@/api/impl/AnnotationAPIImpl";
import EntityAPIImpl from "@/api/impl/EntityAPIImpl";
import NLUEntity from "@/api/model/NLUEntity";
import { Annotation } from "@/api/model/NLUEntity";
import { FlatToNested } from "@/util/tranformTreeData";

@Component({
  components: { Annotator, Treeselect }
})
export default class Annotate extends Vue {
  @Prop()
  private editDoc!: NLUEntity;

  private doc: NLUEntity = { content: "", annotationList: [] }; //  文档对象
  private annotation = new AnnotationModel();
  private dialogVisible: boolean = false; // 对话框显示
  private text: string = ""; // 选中文本
  private entityList: any[] = []; // 实体类树
  private entityArr: any[] = []; // 选中实体类
  private sortValueBy: string = "LEVEL"; // 选项排序方式（"ORDER_SELECTED"，"LEVEL"，"INDEX"）
  private annotationAPI = new AnnotationAPIImpl();
  private entityAPI = new EntityAPIImpl();
  private doneEdit: boolean = false; // 页面是否有修改
  private seletedWord: boolean = false; // 是否选中一个单词
  private loading: boolean = true;
  private myThis: any = this;

  @Watch("editDoc", { immediate: true, deep: true })
  private docChange(newVal: any, oldVal: any) {
    this.doc = Object.assign(this.doc, newVal);
    this.init();
    this.getEntityList();
  }

  private rowStyle() {
    return "background-color: aliceblue;";
  }

  private init() {
    // 初始化
    this.loading = true;
    this.doneEdit = false;
    this.seletedWord = false;
    this.text = "";
    this.entityArr = [];
  }

  private getEntityList() {
    // 获取实体类树
    this.entityAPI.getClass(this.doc.moduleId).then(({ data }) => {
      if (data) {
        this.entityList = FlatToNested(data);
      }
      this.loading = false;
    });
  }

  private getRangeData(text: string) {
    // 选中文本
    if (text === "") {
      return;
    }
    this.seletedWord = true;
    this.text = text;
    this.entityArr = [];
  }

  private save() {
    // 暂存到页面
    const ref = this.$refs.annotator as any;
    ref.addLabel();
    this.doneEdit = true;
  }

  private addLabel(offset: any) {
    // 添加标注点
    this.doc.annotationList = [];
    this.entityArr.map((item) => {
      const newLabel: Annotation = {
        startOffset: offset.startOffset,
        endOffset: offset.endOffset,
        value: this.text,
        entityId: item.id,
        entity: item.label
      };
      this.doc.annotationList.push(newLabel);
    });
  }

  private showDetail(value: string) {
    // 编辑标注点
    this.seletedWord = true;
    this.entityArr = [];
    const innerTableData = this.doc.annotationList.filter(
      (item) => item.value === value
    );
    this.text = value;
    innerTableData.map((item) => {
      const obj = {
        id: item.entityId,
        label: item.value
      };
      this.entityArr.push(obj);
    });
  }

  private deleteRow(row: any) {
    // 删除一行
    this.doc.annotationList.splice(row.$index, 1);
    this.entityArr = this.entityArr.filter(
      (item) => item.id !== row.row.entityId
    );
  }

  private saveAll() {
    // 保存标注信息
    this.annotationAPI.createOrUpdateAnnotation(this.doc).then((res: any) => {
      if (res.code === 0) {
        this.$emit("doneSave");
        this.myThis.$message({
          message: "保存成功！",
          type: "success"
        });
      }
    });
  }

  private next() {
    // 下一条
  }

  private prev() {
    // 上一条
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  line-height: 34px;
}
.annotator {
  display: flex;
  align-items: center;
  justify-content: space-around;
  line-height: 25px;
}
.vue-treeselect {
  width: 350px;
}
</style>
