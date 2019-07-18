<template>
  <div class="header">
    <div>
      <el-button type="primary" @click="addTopNode">新增顶层节点</el-button>
      <el-button type="success" @click="save">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8">
        <el-tree
          :data="objectPropData"
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
      <el-col :span="16" v-if="formVisable" class="node-form">
        <div class="node-name">
          <span>节点名称:</span>
          <el-input ref="nodeName" v-model="objectProp.name" @input="editNode" @focus="inputFocus($event)"></el-input>
        </div>
        <div class="add-rel">
          <span>关系:</span>
          <el-button size="mini" type="success" @click="addOneRelationship" icon="el-icon-plus"></el-button>
        </div>
        <div class="treeselect" v-for="(item,index) in objectProp.relationship" :key="index">
          <treeselect
            v-model="item.domain"
            valueFormat="object"
            :multiple="true"
            :options="entityList"
            :searchable="true"
            :sort-value-by="sortValueBy"
            :flat="true"
            placeholder="请选择Domain"
          />
          <treeselect
            v-model="item.range"
            valueFormat="object"
            :multiple="true"
            :options="entityList"
            :searchable="true"
            :sort-value-by="sortValueBy"
            :flat="true"
            placeholder="请选择Range"
          />
          <el-button size="mini" type="danger" @click="removeOneRelationship(index)" icon="el-icon-delete"></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

interface objectProp {
  // 数据属性
  name: String;
  relationship: relation[];
}

interface relation {
  // 关系对象
  domain: any[];
  range: any[];
}

interface node {
  // 节点对象
  id: string;
  label: string;
  children: node[];
  relationship: relation[];
}

@Component({ components: { Treeselect } })
export default class ObjectProp extends Vue {
  private formVisable: boolean = false;
  private objectProp: objectProp = { name: "", relationship: [] };
  private entityList: any[] = []; // 实体类树
  private objectPropData: node[] = [
    // 数据属性树
    {
      id: "1",
      label: "一级 1",
      children: [],
      relationship: []
    }
  ];
  private node!: node; // 被选中的节点
  private sortValueBy: string = "LEVEL"; // 选项排序方式（"ORDER_SELECTED"，"LEVEL"，"INDEX"）

  private mounted() {
    // 初始化实体类树
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
  }
  private handleClick(data: any) {
    // 点击树节点
    this.node = data;
    this.formVisable = true;
    console.log(data);
    this.objectProp.name = data.label;
    this.objectProp.relationship = data.relationship;
    const input = this.$refs.nodeName as any;
    input.focus();
  }
  
  private inputFocus(e: any) {
    // input获取焦点自动选中
    e.currentTarget.select();
  }

  private append(data: any) {
    // 添加子节点
    const newChild: node = {
      id: this.getUUID(),
      label: "空节点",
      children: [],
      relationship: []
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
    // 生成唯一标示符
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
    const node: node = {
      id: this.getUUID(),
      label: "空节点",
      children: [],
      relationship: []
    };
    this.objectPropData.unshift(node);
  }

  private editNode(val: any) {
    // 动态修改节点名称
    this.node.label = val;
  }

  private save() {}

  private addOneRelationship() {
    // 新增一条关系
    const rel: relation = { domain: [], range: [] };
    this.objectProp.relationship.push(rel);
  }

  private removeOneRelationship(index: number) {
    // 删除当前关系
    this.objectProp.relationship.splice(index, 1);
  }
}
</script>

<style lang="less" scoped>
@import "~less/tree-form";
.add-rel {
  span {
    padding-right: 20px;
  }
}
.treeselect {
  display: flex;
  justify-content: space-around;
  width: 500px;
  padding: 15px;
}
</style>
