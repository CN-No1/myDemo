<template>
  <div class="header">
    <div>
      <el-select v-model="thing" placeholder="请选择" @change="selectThing">
        <el-option v-for="item in things" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button v-if="thing!=''" type="primary" @click="addTopNode">新增顶层节点</el-button>
      <el-button v-if="thing!=''" type="success" @click="save">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8">
        <el-tree
          :data="objectProp.objectPropList"
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
        <div class="add-rel">
          <span>关系:</span>
          <el-button size="mini" type="success" @click="addOneRelationship" icon="el-icon-plus"></el-button>
        </div>
        <div class="treeselect" v-for="(item,index) in node.relation" :key="index">
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
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import ObjectPropModel, {
  ObjectPropNode,
  Relation
} from "../../api/model/ObjectPropModel";
import { getUUID } from "@/util/uuid";
import EntityAPIImpl from '@/api/impl/EntityAPIImpl';

@Component({ components: { Treeselect } })
export default class ObjectProp extends Vue {
  private formVisable: boolean = false;
  private objectProp: ObjectPropModel = new ObjectPropModel();
  private entityList: any[] = []; // 实体类树
  private node: ObjectPropNode = { label: "", relation: [] }; // 被选中的节点
  private thing: string = ""; // 选中thingId
  private things: any[] = []; // thing下拉数据
  private sortValueBy: string = "LEVEL"; // 选项排序方式（"ORDER_SELECTED"，"LEVEL"，"INDEX"）
  private entityAPI = new EntityAPIImpl();

  private mounted() {
    // 初始化
    this.getThing();
  }

  private getThing() {
    // 获取thing
    this.entityAPI.getThing().then(({ data }) => {
      this.things = data;
    });
  }

  private selectThing(val: string) {
    this.objectProp.thingId = val;
    // 选择thing查找class
    this.getObjectProp();
    this.getEntityList();
  }

  private getObjectProp() {
    // 获取数据属性
    this.entityAPI.getObjectProp(this.thing).then(({ data }) => {
      if (data) this.objectProp = data;
    });
  }

  private getEntityList() {
    // 获取实体类树
    this.entityAPI.getClass(this.thing).then(({ data }) => {
      if (data) this.entityList = data.entityList;
    });
  }

  private handleClick(data: ObjectPropNode) {
    // 点击树节点
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
    // 添加子节点
    const newChild: ObjectPropNode = {
      id: getUUID(),
      label: "空节点",
      children: [],
      relation: []
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
    const node: ObjectPropNode = {
      id: getUUID(),
      label: "空节点",
      children: [],
      relation: []
    };
    this.objectProp.objectPropList.unshift(node);
  }

  private editNode(val: any) {
    // 动态修改节点名称
    this.node.label = val;
  }

  private addOneRelationship() {
    // 新增一条关系
    const rel: Relation = { domain: [], range: [] };
    this.node.relation.push(rel);
  }

  private removeOneRelationship(index: number) {
    // 删除当前关系
    this.node.relation.splice(index, 1);
  }

  private save() {
    // 保存关系属性树
    this.entityAPI.creatOrUpdateObjectProp(this.objectProp);
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
