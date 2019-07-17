<template>
  <div class="home">
    <div>
      <el-button type="primary" @click="addTopNode">新增顶层节点</el-button>
      <el-button type="success" @click="save">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8">
        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
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
          <p>节点名称:</p>
          <el-input v-model="objectProp.name" @change="editNode"></el-input>
        </div>
        <div class="treeselect">
          <treeselect
            v-model="dataProp.entityClass"
            valueFormat="object"
            :multiple="true"
            :options="entityList"
            :searchable="true"
            :sort-value-by="sortValueBy"
            :flat="true"
            placeholder="请选择实体类"
          />
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="(item,index) in dataTypeList"
              :key="index"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
          <el-button
            size="mini"
            type="danger"
            @click="removeOneRelationship(index)"
            icon="el-icon-delete"
          ></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

interface dataProp {
  // 数据属性对象
  name: string;
  entityClass: any[];
  dataType: string;
}

interface node {
  // 节点对象
  id: string;
  label: string;
  children: node[];
  entityClass: any[];
  dataType: string;
}

@Component({})
export default class DataProp extends Vue {
  private formVisable: boolean = false;
  private dataProp!: dataProp; // 数据属性对象
  private dataPropTree: node[] = [
    {
      id: "1",
      label: "一级 1",
      children: [],
      entityClass: [],
      dataType: ""
    }
  ];
  private dataTypeList: any[] = []; // 数据类型列表
  private node!: node; // 被选中的节点
  private entityList: any[] = []; // 实体类树

  private handleClick(data: any) {
    // 点击节点编辑
    this.node = data;
    this.formVisable = true;
    console.log(data);
    this.dataProp.name = data.label;
  }

  private append(data: any) {
    // 新增子节点
    const newChild = { id: this.getUUID(), label: "空节点", children: [] };
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
      entityClass: [],
      dataType: ""
    };
    this.dataPropTree.unshift(node);
  }

  private editNode(val: any) {
    this.node.label = val;
  }

  private save() {}
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-form {
  padding-left: 120px;
}
.el-input {
  width: 140px;
}
.home {
  & > div:first-child {
    padding-bottom: 20px;
  }
}
</style>
