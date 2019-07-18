<template>
  <div class="header">
    <div>
      <el-button type="primary" @click="addTopNode">新增顶层节点</el-button>
      <el-button type="success" @click="save">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8">
        <el-tree
          :data="entityClassTree"
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
                @click.stop="() => append(data)"
                icon="el-icon-plus"
              ></el-button>
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
            v-model="entityClass.name"
            @input="editNode"
            @focus="inputFocus($event)"
          ></el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import EntityAPIImpl from "../../api/impl/EntityAPIImpl";

interface entityClass {
  // 实体类对象
  name: string;
}

interface node {
  // 节点对象
  id: string;
  label: string;
  children: [];
}

@Component({})
export default class Entity extends Vue {
  private formVisable: boolean = false;
  private entityClass: entityClass = { name: "" };
  private entityClassTree: any[] = []; // 实体类树数据
  private node!: node; // 节点临时对象，用于动态修改树节点展示

  private entityAPI = new EntityAPIImpl();

  private mounted() {
    // 初始化实体类树
    this.entityAPI.getClasses().then(({ data }) => {
      this.entityClassTree = data;
    });
  }

  private handleClick(data: any) {
    // 点击节点编辑
    this.node = data;
    this.formVisable = true;
    this.entityClass.name = data.label;
    const input = this.$refs.nodeName as any;
    input.focus();
  }

  private inputFocus(e: any) {
    // input获取焦点自动选中
    e.currentTarget.select();
  }

  private append(data: any) {
    // 新增子节点
    const newChild: node = {
      id: this.getUUID(),
      label: "空节点",
      children: []
    };
    if (!data.children) {
      this.$set(data, "children", []);
    }
    data.children.push(newChild);
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
    const node: node = { id: this.getUUID(), label: "空节点", children: [] };
    this.entityClassTree.unshift(node);
  }

  private editNode(val: any) {
    // 动态修改树节点显示
    this.node.label = val;
  }

  private save() {
    // 保存实体树
    this.entityAPI.updateClasses(this.entityClassTree);
  }
}
</script>

<style lang="less" scoped>
@import "~less/tree-form";
</style>
