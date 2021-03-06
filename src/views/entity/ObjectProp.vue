<template>
  <div class="header" @click="closePop">
    <div>
      <el-select v-model="moduleId" placeholder="请选择" @change="selectmodule" :disabled="loading">
        <el-option v-for="item in modules" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-popover ref="popover" placement="bottom" width="160" trigger="manual" v-model="visible">
        <el-input ref="newNode" v-model="newNode"></el-input>
        <div style="text-align: right; margin: 0;padding-top:5px;">
          <el-button size="mini" type="danger" @click="addTopNode(false)">取消</el-button>
          <el-button type="primary" size="mini" @click="addTopNode(true)">确定</el-button>
        </div>
        <el-button slot="reference" @click.stop="showPop" type="primary">新增顶层节点</el-button>
      </el-popover>
      <el-button v-if="moduleId!=''" type="success" @click="save">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8" v-loading="loading">
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
            :multiple="false"
            :open-on-focus="true"
            :clear-on-select="true"
            :close-on-select="true"
            :options="entityList"
            :searchable="true"
            placeholder="请选择Domain"
          />
          <treeselect
            v-model="item.range"
            :multiple="false"
            :open-on-focus="true"
            :clear-on-select="true"
            :close-on-select="true"
            :options="entityList"
            :searchable="true"
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
} from "@/api/model/ObjectPropModel";
import { getUUID } from "@/util/uuid";
import EntityAPIImpl from "@/api/impl/EntityAPIImpl";
import { FlatToNested } from "@/util/tranformTreeData";

@Component({ components: { Treeselect } })
export default class ObjectProp extends Vue {
  private formVisable: boolean = false;
  private objectProp: ObjectPropModel = new ObjectPropModel();
  private entityList: any[] = []; // 实体类树
  private node: ObjectPropNode = { label: "", relation: [] }; // 被选中的节点
  private moduleId: string = "5d2fe2f28eb1330dcc8f46bd"; // 选中moduleId
  private modules: any[] = []; // module下拉数据
  private sortValueBy: string = "LEVEL"; // 选项排序方式（"ORDER_SELECTED"，"LEVEL"，"INDEX"）
  private doneEdit: boolean = false; // 页面是否有修改
  private entityAPI = new EntityAPIImpl();
  private loading: boolean = true;
  private visible: boolean = false;
  private newNode: string = "";
  private myThis: any = this;

  private mounted() {
    // 初始化
    this.getModule();
    this.getObjectProp();
    this.getEntityList();
    this.objectProp.moduleId = this.moduleId;
  }

  private getModule() {
    // 获取module
    this.entityAPI.getModule().then(({ data }) => {
      this.modules = data;
    });
  }

  private selectmodule(val: string) {
    this.objectProp.moduleId = val;
    // 选择module查找class
    this.getObjectProp();
    this.getEntityList();
  }

  private getObjectProp() {
    // 获取数据属性
    this.entityAPI.getObjectProp(this.moduleId).then(({ data }) => {
      if (data) {
        this.objectProp = data;
      }
      this.loading = false;
    });
  }

  private getEntityList() {
    // 获取实体类树
    this.entityAPI.getClass(this.moduleId).then(({ data }) => {
      if (data) {
        this.entityList = FlatToNested(data);
      }
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
      relation: []
    };
    if (!data.children) {
      this.$set(data, "children", []);
    }
    data.children.unshift(newChild);
    this.formVisable = true;
    this.node = newChild;
    const input = this.$refs.nodeName as any;
    input.focus();
    this.doneEdit = true;
  }

  private remove(node: any, data: any) {
    // 删除当前节点
    if (data.children) {
      this.myThis.$message({
        type: "error",
        message: "该节点有子节点，不可删除！"
      });
      return;
    }
    this.myThis.$confirm("确认删除吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d: any) => d.id === data.id);
        children.splice(index, 1);
        this.formVisable = false;
        this.myThis.$message({
          type: "success",
          message: "删除成功!"
        });
        this.doneEdit = true;
      })
      .catch(() => {
        this.myThis.$message({
          type: "info",
          message: "已取消删除"
        });
      });
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
      const node: ObjectPropNode = {
        id: getUUID(),
        label: this.newNode,
        relation: []
      };
      this.objectProp.objectPropList.unshift(node);
      this.doneEdit = true;
    }
    this.visible = false;
    this.newNode = "";
  }

  private editNode(val: any) {
    // 动态修改节点名称
    this.node.label = val;
    this.doneEdit = true;
  }

  private addOneRelationship() {
    // 新增一条关系
    const rel: Relation = { domain: "", range: "" };
    this.node.relation.push(rel);
  }

  private removeOneRelationship(index: number) {
    // 删除当前关系
    this.node.relation.splice(index, 1);
  }

  private save() {
    // 保存关系属性树
    this.loading = true;
    this.entityAPI.creatOrUpdateObjectProp(this.objectProp).then((data) => {
      this.loading = false;
      this.doneEdit = false;
      this.formVisable = false;
      this.myThis.$message({
        type: "success",
        message: "保存成功!"
      });
      this.getObjectProp();
    });
  }

  private beforeRouteLeave(to: any, from: any, next: () => void) {
    // 离开页面前保存
    if (this.doneEdit) {
      this.myThis.$confirm(
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
