<template>
  <div>
    <div>
      <el-button @click="goBack()">返回</el-button>
      <el-button type="success" @click="save()">保存</el-button>
    </div>
    <div class="content">
      <annotator :doc="doc" :entityPosition="entityPosition"></annotator>
    </div>
    <div class="table">
      <el-table
        :data="entityPosition"
        style="width: 100%">
        <el-table-column
          prop="value"
          label="标注内容">
        </el-table-column>
        <el-table-column
          prop="entity"
          label="关联实体">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteRel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Annotator from '../../../components/Annotator.vue';


interface lableListItem {  //标签对象
  id:String,
  name:String,
  textColor:String,
  backgroudColor:String,
  shoutcut:String
}

interface position {  //定位对象
  id:String,
  lableId:String,
  startOffset:Number,
  endOffset:Number
}

@Component({
  components: { Annotator }
})

export default class annotate extends Vue{

  private doc:String = "";  //文档内容（纯文本）

  private entityPosition:any = [{  //标签在文档中的位置
    "startOffset": 6,
    "endOffset": 8,
    "value": "取款",
    "entity": "item"
   },
   {
    "startOffset": 0,
    "endOffset": 2,
    "value": "同城",
    "entity": "place"
   }]

  private handleCheckChange(data:any, checked:any, indeterminate:any){
    console.log(data);
    console.log(checked);
    console.log(indeterminate);
  }

  private mounted(){
    let docId = this.$route.params.docId;
    this.doc = "原告福州市顺辉运输有限公司诉称，2013年10月1日，原告的驾驶员杨海军驾驶闽A×××××号重型半挂牵引车，在324国道被告管辖路段发生交通事故。厦门市公安局交通警察支队集美大队（以下简称“集美大队”）作出道路交通事故认定书后，送达给原告，原告在法定期限内向上级主管部门即被告提出复核申请，被告以原告不是当事人为由不予受理。原告认为被告的不予受理行为没有法律依据，属于不作为行为，依法应予以纠正。具体理由如下：1.《道路交通事故处理程序规定》中的“当事人”是广义的当事人，即行政行为的当事人不仅包括行政行为相对人，还包括行政行为相关人。被告以事故认定书中没有记载原告为由，就认定原告不是《道路交通事故处理程序规定》中的当事人是对法律的错误理解，从而导致其适用法律错误。2.事故认定书直接送达给原告即认可原告具有当事人主体资格。依据《道路交通事故处理程序规定》第四十八条第二款的规定：“道路交通事故认定书应当由办案民警签名或者盖章，加盖公安机关交通管理部门道路交通事故处理专用章，分别送达当事人，并告知当事人向公安机关交通管理部门申请复核、调解和直接向人民法院提起民事诉讼的权利、期限”，送达对象就是当事人，集美大队将事故认定书送达给原告，原告自然就是当事人。3.《道路交通事故处理程序规定》第五十二条第一款对不予受理的情形采用列举式，当事人身份问题并不是不予受理的理由。综上，复核行为属于具体行政行为，当事人应当包含行政行为相对人和相关人。故被告不予受理的行为存在适用法律错误，请求：1.依法撤销被告作出的公交受字2013第0099号（1）道路交通事故认定复核不予受理通知书，并纠正其违法行为；2.依法判令被告限期内作出事故复核决定。原告为支持其诉讼请求，向本院提交了以下证据：道路交通事故认定复核不予受理通知书，证明被告以原告不是交通事故当事人为由不予受理的事实存在，被告存在行政不作为。"
  }

  private goBack(){
    this.$router.back();
  }

};
</script>

<style lang="less" scoped>
  .content{
    padding: 20px;
    line-height: 34px;
  }
</style>
