<template>
  <div class="header">
    <div>
      <el-select v-model="module" placeholder="请选择模块" @change="selectmodule">
        <el-option v-for="item in modules" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button v-if="module!=''" type="primary" @click="addTopNode">新增顶层节点</el-button>
      <el-button v-if="module!=''" type="success" @click="save">保存</el-button>
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
              :label="item.label"
              :value="item.label"
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
import DataPropModel,{ DataPropNode } from '@/api/model/DataPropModel';
import { getUUID } from '@/util/uuid';
import EntityAPIImpl from '@/api/impl/EntityAPIImpl';

@Component({ components: { Treeselect } })
export default class DataProp extends Vue {
  private formVisable: boolean = false;
  private dataProp: DataPropModel = new DataPropModel(); // 数据属性对象
  private dataTypeList: any[] = []; // 数据类型列表
  private node: DataPropNode = {label:"",entityClass:[],dataType:""}; // 被选中的节点
  private module: string = ""; // 选中moduleId
  private modules: any[] = []; // module下拉数据
  private entityList: any[] = []; // 实体类树
  private sortValueBy: string = "LEVEL"; // 选项排序方式（"ORDER_SELECTED"，"LEVEL"，"INDEX"）
  private entityAPI = new EntityAPIImpl();

  private mounted() {
    // 初始化
    this.getModule();
  }

  private getModule() {
    // 获取module
    this.entityAPI.getModule().then(({ data }) => {
      this.modules = data;
    });
  }

  private selectmodule(val: string) {
    this.dataProp.moduleId = val;
    // 选择module查找class
    this.getDataProp();
    this.getEntityList();
    this.getDataTypeList();
  }
  
  private getDataProp() {
    // 获取对象属性
    this.entityAPI.getDataProp(this.module).then(({ data }) => {
      if (data) this.dataProp = data;
    });
  }

  private getEntityList() {
    // 获取实体类树
    this.entityAPI.getClass(this.module).then(({ data }) => {
      if (data) this.entityList = data.entityList;
    });
  }

  private getDataTypeList() {
    // 获取数据类型list
    this.entityAPI.getDataType().then(({ data }) => {
      if (data) this.dataTypeList = data;
    });
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

  private save() {
    // 保存数据属性树
    this.entityAPI.creatOrUpdateDataProp(this.dataProp);
  }
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
