<template>
  <div class="header">
    <div>
      <el-button type="primary" @click="addTopNode">新增顶层节点</el-button>
      <el-button type="success" @click="save">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8">
        <el-tree
          :data="dataProp.dataPropList"
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
          <p>节点名称:</p>
          <el-input
            ref="nodeName"
            v-model="node.label"
            @input="editNode"
            @focus="inputFocus($event)"
          ></el-input>
        </div>
        <div class="treeselect">
          <treeselect
            v-model="node.entityClass"
            valueFormat="object"
            :multiple="true"
            :options="entityList"
            :searchable="true"
            :sort-value-by="sortValueBy"
            :flat="true"
            placeholder="请选择实体类"
          />
        </div>
        <div class="data-type">
          <el-select v-model="node.dataType" placeholder="请选择数据类型">
            <el-option
              v-for="(item,index) in dataTypeList"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Treeselect from "@riophae/vue-treeselect";
import DataPropModel,{ DataPropNode } from '../../api/model/DataPropModel';
import { getUUID } from '@/util/uuid';

@Component({ components: { Treeselect } })
export default class DataProp extends Vue {
  private formVisable: boolean = false;
  private dataProp: DataPropModel = new DataPropModel(); // 数据属性对象
  private dataTypeList: any[] = []; // 数据类型列表
  private node: DataPropNode = {label:"",entityClass:[],dataType:""}; // 被选中的节点
  private entityList: any[] = []; // 实体类树
  private sortValueBy: string = "LEVEL"; // 选项排序方式（"ORDER_SELECTED"，"LEVEL"，"INDEX"）

  private mounted() {
    // 初始化实体类树、数据类型列表
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
    this.dataTypeList = [
      {
        id: "1",
        name: "string"
      }
    ];
  }
  private handleClick(data: any) {
    // 点击节点编辑
    this.node = data;
    this.formVisable = true;
    const input = this.$refs.nodeName as any;
    input.focus();
  }

  private inputFocus(e: any) {
    // input获取焦点自动选中
    e.currentTarget.select();
  }

  private append(data: any) {
    // 新增子节点
    const newChild: DataPropNode = {
      id: getUUID(),
      label: "空节点",
      children: [],
      entityClass: [],
      dataType: ""
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

  private addTopNode() {
    // 新增顶层节点
    const node: DataPropNode = {
      id: getUUID(),
      label: "空节点",
      children: [],
      entityClass: [],
      dataType: ""
    };
    this.dataProp.dataPropList.unshift(node);
  }

  private editNode(val: any) {
    // 编辑节点名字
    this.node.label = val;
  }

  private save() {}
}
</script>

<style lang="less" scoped>
@import "~less/tree-form";
.treeselect {
  width: 217px;
  padding-bottom: 20px;
}
.data-type {
  width: 217px;
}
</style>
