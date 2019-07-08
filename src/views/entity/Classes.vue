<template>
  <div class="home">
    <div>
      <el-button type="success">新增顶层节点</el-button>
      <el-button type="danger">删除</el-button>
    </div>
    <dragTreeTable :data="treeData" :onDrag="onTreeDataChange" :fixed="true" :isdraggable="true"></dragTreeTable>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import dragTreeTable from "drag-tree-table";
@Component({
  components: { dragTreeTable },
})
export default class Entity extends Vue {
  private treeData = {
    columns: [
      {
        type: "checkbox",
        isContainChildren: true, // 是否勾选子节点，默认false
        onChange: this.onCheck, // parmas selectRows
        align: "center",
      },
      {
        type: "selection",
        title: "菜单名称",
        field: "name",
        flex: 1,
        align: "center",
        formatter: (item: any) => {
          return "<a>" + item.name + "</a>";
        },
      },
      {
        title: "操作",
        type: "action",
        flex: 1,
        align: "center",
        actions: [
          {
            text: "新增子节点",
            onclick: this.addSubNode,
            formatter: (item: any) => {
              return '<i class="iconfont">&#xe601;</i>';
            },
          },
          {
            text: "新增兄弟节点",
            onclick: this.addSiblingNode,
            formatter: (item: any) => {
              return '<i class="iconfont">&#xe6b8;</i>';
            },
          },
        ],
      },
    ],
    lists: [
      {
        id: 1,
        parent_id: 0,
        order: 0,
        name: "动物类",
        open: true,
        children: [
          {
            id: 11,
            parent_id: 1,
            open: true,
            order: 0,
            name: "猪",
            children: [],
          },
        ],
      },
      {
        id: 2,
        parent_id: 0,
        order: 1,
        name: "昆虫类",
        open: true,
        children: [
          {
            id: 21,
            parent_id: 5,
            open: true,
            order: 0,
            name: "蚂蚁",
            children: [],
          },
        ],
      },
      {
        id: 3,
        parent_id: 0,
        order: 2,
        name: "植物类",
        open: true,
        children: [
          {
            id: 31,
            parent_id: 3,
            open: true,
            order: 0,
            name: "花",
            children: [],
          },
        ],
      },
    ],
    custom_field: {
      id: "id",
      order: "sort",
      lists: "children",
      parent_id: "parent_id",
    },
  };
  // list:更新后的数据源
  // from: 当前被拖拽的行
  // to: 目标拖拽行
  // where: 拖拽的类型，top（上面）、center（里面）、bottom（下面）
  private onTreeDataChange(
    list: any[],
    from: object,
    to: object,
    where: string,
  ) {
    // console.log(list, from, to, where);
    this.treeData.lists = list;
  }
  private addSubNode(i: any) {
    // 新增子节点
    const obj = {
      id: 12,
      parent_id: i.id,
      open: true,
      order: i.children.length,
      name: "蚂蚁",
      children: [],
    };
    i.children.push(obj);
    // var q = this.findNode(i.id, this.treeData.lists);
    // console.log(q);
  }

  private addSiblingNode(i: any) {
    // 新增兄弟节点
    const obj = {
      id: 12,
      parent_id: i.parent_id,
      open: true,
      order: i.children.length,
      name: "蚂蚁",
      children: [],
    };
    if (i.parent_id === 0) {
      this.treeData.lists.unshift(obj);
    } else {
      this.findNode(i.parent_id, this.treeData.lists).children.push(obj);
    }
  }

  private findNode(id: number, arr: any[]): any {
    // 通过id寻找节点
    // debugger
    let node;
    arr.map((item) => {
      if (item.id === id) {
        node = item;
      } else {
        if (item.children) {
          return this.findNode(id, item.children);
        }
      }
    });
    if (node) {
      // console.log(node);
      return node;
    }
  }

  private onCheck(i: any) {
    // 选中
  }
}
</script>