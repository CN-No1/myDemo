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
          @node-click="handleClick"
          draggable
        >
          <span class="custom-tree-node" slot-scope="{ node, dataTypeTree }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => remove(node, dataTypeTree)"
                icon="el-icon-delete"
              ></el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="16" v-if="formVisable">
        <el-form
          label-position="left"
          label-width="80px"
          :model="dataType"
          @submit.native.prevent
        >
          <el-form-item label="名称">
            <el-input v-model="dataType.name" @change="editNode"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class DataType extends Vue {
  private formVisable: boolean = false;
  private dataType: any = {
    name: ""
  };
  private dataTypeTree: any[] = [];
  private node: any;

  private mounted() {

  }

  private handleClick(data: any) {
    this.node = data;
    this.formVisable = true;
    console.log(data);
    this.dataType.name = data.label;
  }

  private remove(node: any, data: any) {
    const parent = node.parent;
    const children = parent.data.children || parent.data;
    const index = children.findIndex((d: any) => d.id === data.id);
    children.splice(index, 1);
  }

  private addTopNode() {
    const node = { id: "", label: "空节点", children: [] };
    this.dataTypeTree.unshift(node);
  }

  private editNode(val: any) {
    this.node.label = val;
  }

  private save() {
  }
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
.header {
  & > div:first-child {
    padding-bottom: 20px;
  }
}
</style>
