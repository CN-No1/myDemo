<template>
  <div class="home">
    <div>
      <el-button type="success">新增顶层节点</el-button>
      <el-button type="danger">删除</el-button>
    </div>
    <dragTreeTable
    :data="treeData"
    :onDrag="onTreeDataChange"
    :fixed="true"
    :height="300"
    :isdraggable="true"></dragTreeTable>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import dragTreeTable from "drag-tree-table";
@Component({
  components: { dragTreeTable }
})
export default class entity extends Vue{
  private treeData = {
    columns: [
      {
        type: 'checkbox',
        isContainChildren: true, //是否勾选子节点，默认false
        onChange: this.onCheck, // parmas selectRows
        align: 'center'
      },
      {
        type: 'selection',
        title: '菜单名称',
        field: 'name',
        flex:1,
        align: 'center',
        formatter: (item:any) => {
          return '<a>'+item.name+'</a>'
        }
      },
      {
        title: '操作',
        type: 'action',
        flex:1,
        align: 'center',
        actions: [
          {
            text: '新增子节点',
            onclick: this.addSubNode,
            formatter: (item:any) => {
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
  private mounted(){
  }
  // list:更新后的数据源
  // from: 当前被拖拽的行
  // to: 目标拖拽行
  // where: 拖拽的类型，top（上面）、center（里面）、bottom（下面）
  private onTreeDataChange(list:Array<any>, from:Object, to:Object, where:String) {
    console.log(list,from, to, where);
    this.treeData.lists = list;
  } 
  private addSubNode(i:Object){
    console.log(i)

  }
  private onCheck(){

  }
};
</script>