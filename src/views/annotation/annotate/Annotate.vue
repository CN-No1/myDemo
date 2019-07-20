<template>
  <div>
    <div>
      <el-button @click="goBack()">返回</el-button>
      <el-button type="success" @click="save()">保存</el-button>
      <el-button @click="next()">下一个</el-button>
    </div>
    <div class="content">
      <annotator
        ref="annotator"
        :doc="doc"
        :entityPosition="entityPosition"
        @getRangeData="getRangeData"
        @addLabel="addLabel"
        @showDetail="showDetail"
      ></annotator>
    </div>
    <div class="table">
      <el-table :data="entityPosition" style="width: 100%" :default-sort = "{prop: 'value', order: 'descending'}">
        <el-table-column prop="value" sortable label="标注内容"></el-table-column>
        <el-table-column prop="entity" sortable label="关联实体"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteRel(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="标注" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
import Annotator from "../../../components/Annotator.vue";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { Position } from '../../../api/model/AnnotationModel';


@Component({
  components: { Annotator, Treeselect }
})
export default class Annotate extends Vue {
  private doc: string = ""; //  文档内容（纯文本）
  private entityPosition: Position[] = [];  // 标注位置
  private dialogVisible: boolean = false; // 对话框显示
  private text: string = ""; // 选中文本
  private entityList: any[] = []; // 实体类树
  private entityArr: any[] = []; // 选中实体类
  private sortValueBy: string = "LEVEL"; // 选项排序方式（"ORDER_SELECTED"，"LEVEL"，"INDEX"）

  get sortPositionList() {
    // 对标注进行去重
    const sorted: any = {};
    let sort = this.entityPosition.sort(
      (a, b) => a.startOffset - b.startOffset,
    );
    sort = sort.reduce((item: Position[], next) => {
      if (!sorted[next.entityId]) {
        sorted[next.entityId] = true && item.push(next);
      }
      return item;
    }, []);
    return sort;
  }

  private mounted() {
    const docId = this.$route.params.docId;
    this.doc =
      "原告福州市顺辉运输有限公司诉称，2013年10月1日，原告的驾驶员杨海军驾驶闽A×××××号重型半挂牵引车，在324国道被告管辖路段发生交通事故。";
    this.entityList = [
      {
        id: 1,
        label: "人",
        children: [
          {
            id: 11,
            label: "驾驶员"
          },
          {
            id: 12,
            label: "行人"
          }
        ]
      },
      {
        id: 2,
        label: "车"
      },
      {
        id: 3,
        label: "交通标志"
      }
    ];
    this.entityPosition = [
      {
        startOffset: 0,
        endOffset: 2,
        value: "原告",
        entityId: "1",
        entity: "人"
      }
    ];
  }

  private getRangeData(text: string) {
    if(text === ""){
      return
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
    this.entityArr.map((item) => {
      // debugger
      const arr = this.entityPosition.filter((e) => e.value === item.label && e.entityId === item.id);
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
    const innerTableData = this.entityPosition.filter((item) => item.value === value);
    this.text = value;
    innerTableData.map((item) => {
      const obj = {
        id: item.entityId,
        label: item.value
      };
      this.entityArr.push(obj);
    });
    this.dialogVisible = true;
  }

  private goBack() { // 返回
    this.$router.back();
  }

  private next() {  // 下一条
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  line-height: 34px;
}
</style>
