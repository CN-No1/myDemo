<template>
  <div class="header" @click="closePop">
    <div>
      <el-popover ref="popover" placement="bottom" width="160" trigger="manual" v-model="visible">
        <el-input ref="newNode" v-model="newNode"></el-input>
        <div style="text-align: right; margin: 0;padding-top:5px;">
          <el-button size="mini" type="danger" @click="addTopNode(false)">取消</el-button>
          <el-button type="primary" size="mini" @click="addTopNode(true)">确定</el-button>
        </div>
        <el-button slot="reference" @click.stop="showPop" type="primary">新增顶层节点</el-button>
      </el-popover>
      <el-button type="success" @click="save">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8" v-loading="loading">
        <el-tree
          :data="dataTypeTree"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :highlight-current="true"
          @node-click="handleClick"
          draggable
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => remove(node, data)"
                icon="el-icon-delete"
              ></el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="16" v-show="formVisable" class="node-form">
        <div class="node-name">
          <span>节点名称:</span>
          <el-input
            ref="nodeName"
            v-model="node.label"
            @input="editNode"
            @focus="inputFocus($event)"
          ></el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DataTypeModel from "@/api/model/DataTypeModel";
import EntityAPIImpl from "@/api/impl/EntityAPIImpl";

@Component({
  components: {}
})
export default class DataType extends Vue {
  private formVisable: boolean = false;
  private dataTypeTree: DataTypeModel[] = [];
  private node: DataTypeModel = { label: "" };
  private doneEdit: boolean = false; // 页面是否有修改
  private entityAPI = new EntityAPIImpl();
  private loading: boolean = true;
  private visible: boolean = false;
  private newNode: string = "";
  private myThis: any = this;

  private mounted() {
    // 初始化
    this.getDataType();
  }

  private getDataType() {
    // 获取数据类型树
    this.entityAPI.getDataType().then(({ data }) => {
      if (data) {
        this.dataTypeTree = data;
      }
      this.loading = false;
    });
  }

  private handleClick(data: any) {
    // 点击节点
    this.node = data;
    this.formVisable = true;
    const input = this.$refs.nodeName as any;
    input.focus();
  }

  private inputFocus(e: any) {
    // input获取焦点自动选中
    e.currentTarget.select();
  }

  private remove(node: any, data: any) {
    // 删除当前节点
    const parent = node.parent;
    const children = parent.data.children || parent.data;
    const index = children.findIndex((d: any) => d.id === data.id);
    children.splice(index, 1);
    this.formVisable = false;
  }

  private getUUID() {
    // 生成UUID
    const s: any = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[8] = s[13] = s[18] = s[23] = "";
    const uuid = s.join("");
    return uuid;
  }

  private showPop() {
    this.visible = true;
    const input = this.$refs.newNode as any;
    input.focus();
  }

  private closePop() {
    this.visible = false;
    this.newNode = "";
  }

  private addTopNode(val: boolean) {
    // 新增顶层节点
    if (val) {
      const node = { id: this.getUUID(), label: this.newNode };
      this.dataTypeTree.unshift(node);
      this.doneEdit = true;
    }
    this.visible = false;
    this.newNode = "";
  }

  private editNode(val: any) {
    // 编辑节点
    this.node.label = val;
    this.doneEdit = true;
  }

  private save() {
    // 保存数据类型树
    this.loading = true;
    this.entityAPI.creatOrUpdateDataType(this.dataTypeTree).then(({ data }) => {
      this.loading = false;
      this.doneEdit = false;
      this.formVisable = false;
      this.myThis.$message({
        type: "success",
        message: "保存成功!"
      });
      this.getDataType();
    });
  }

  private beforeRouteLeave(to: any, from: any, next: () => void) {
    // 离开页面前保存
    if (this.doneEdit) {
      this.myThis
        .$confirm(
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
          next();
        })
        .catch((action: any) => {
          if (action === "cancel") {
            next();
          }
        });
    } else {
      next();
    }
  }
}
</script>

<style lang="less" scoped>
@import "~less/tree-form";
</style>
