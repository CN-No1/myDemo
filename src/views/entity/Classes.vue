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
          :data="entityClass.entityList"
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
import { Vue, Component } from "vue-property-decorator";
import EntityAPIImpl from "@/api/impl/EntityAPIImpl";
import EntityClassModel, {
  EntityClassNode
} from "@/api/model/EntityClassModel";
import { getUUID } from "@/util/uuid";

@Component({})
export default class Entity extends Vue {
  private formVisable: boolean = false;
  private entityClass: EntityClassModel = new EntityClassModel();
  private node: EntityClassNode = { label: "" }; // 节点临时对象，用于动态修改树节点展示
  private module: string = ""; // 选中moduleId
  private modules: any[] = []; // module下拉数据
  private entityAPI = new EntityAPIImpl();

  private mounted() {
    // 初始化
    this.getModule();
  }

  private selectmodule(val: string) {
    this.entityClass.moduleId = val;
    // 选择module查找class
    this.getClass();
  }

  private getModule() {
    // 获取module
    this.entityAPI.getModule().then(({ data }: any) => {
      this.modules = data;
    });
  }

  private getClass() {
    // 获取实体类
    this.entityAPI.getClass(this.module).then(({ data }) => {
      if (data) {
        this.entityClass = data;
      }
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
    const newChild: EntityClassNode = {
      id: getUUID(),
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

  private addTopNode() {
    // 新增顶层节点
    const node: EntityClassNode = {
      id: getUUID(),
      label: "空节点",
      children: []
    };
    this.entityClass.entityList.unshift(node);
  }

  private editNode(val: any) {
    // 动态修改树节点显示
    this.node.label = val;
  }

  private save() {
    // 保存实体树
    this.entityAPI.creatOrUpdateClass(this.entityClass);
  }
}
</script>

<style lang="less" scoped>
@import "~less/tree-form";
</style>
