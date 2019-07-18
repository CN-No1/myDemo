<template>
  <div class="header">
    <div>
      <el-button type="primary" @click="addTopNode">新增</el-button>
      <el-button type="success" @click="save">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8">
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
            v-model="dataType.name"
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

interface dataType {
  // 数据类型对象
  name: string;
}

@Component({
  components: {}
})
export default class DataType extends Vue {
  private formVisable: boolean = false;
  private dataType: dataType = { name: "" };
  private dataTypeTree: any[] = [
    {
      id: "1",
      label: "一级 1",
      children: [],
      entityClass: [],
      dataType: ""
    }
  ];
  private node: any;

  private mounted() {}

  private handleClick(data: any) {
    // 点击节点
    this.node = data;
    this.formVisable = true;
    console.log(data);
    this.dataType.name = data.label;
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
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[8] = s[13] = s[18] = s[23] = "";
    const uuid = s.join("");
    return uuid;
  }

  private addTopNode() {
    // 新增顶层节点
    const node = { id: this.getUUID(), label: "空节点", children: [] };
    this.dataTypeTree.unshift(node);
  }

  private editNode(val: any) {
    // 编辑节点
    this.node.label = val;
  }

  private save() {}
}
</script>

<style lang="less" scoped>
@import "~less/tree-form";
</style>
