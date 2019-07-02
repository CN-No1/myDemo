<template>
  <div class="home">
    <dragTreeTable
    :data="treeData"
    :onDrag="onTreeDataChange"
    :fixed="true"
    :height="300"
    :isdraggable="true"></dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from "drag-tree-table";

export default {
  name: "app",
  data() {
    return {
      treeData: {
        columns: [
          {
            type: 'checkbox',
            isContainChildren: true, //是否勾选子节点，默认false
            onChange: this.onCheck, // parmas selectRows
            width: 200,
            align: 'center'
          },
          {
            type: 'selection',
            title: '菜单名称',
            field: 'name',
            width: 200,
            align: 'center',
            formatter: (item) => {
              return '<a>'+item.name+'</a>'
            }
          },
          {
            title: '操作',
            type: 'action',
            width: 350,
            align: 'center',
            actions: [
              {
                text: '新增子节点',
                onclick: this.addSubNode,
                formatter: (item) => {
                  return '<i>新增子节点</i>'
                }
              }
            ]
          },
        ],
        lists: [
          {
            "id":40,
            "parent_id":0,
            "order":0,
            "name":"动物类",
            "uri":"/masd/ds",
            "open":true,
            "lists":[]
          },
          {
            "id":5,
            "parent_id":0,
            "order":1,
            "name":"昆虫类",
            "uri":"/masd/ds",
            "open":true,
            "children":[
              {
                "id":12,
                "parent_id":5,
                "open":true,
                "order":0,
                "name":"蚂蚁",
                "uri":"/masd/ds",
                "lists":[]
              }
            ]
          },
          {
            "id":19,
            "parent_id":0,
            "order":2,
            "name":"植物类",
            "uri":"/masd/ds",
            "open":true,
            "lists":[]
          }
        ],
        custom_field: {
          id: 'id',
          order: 'sort',
          lists: 'children',
          parent_id: 'parent_id'
        }
      }
    };
  },
  components: {
    dragTreeTable
  },
  methods: {
    // list:更新后的数据源
    // from: 当前被拖拽的行
    // to: 目标拖拽行
    // where: 拖拽的类型，top（上面）、center（里面）、bottom（下面）
    onTreeDataChange(list, from, to, where) {
      console.log(list,from, to, where);
      this.treeData.lists = list;
    },
    // addSubNode(i){

    // }
  }
};
</script>