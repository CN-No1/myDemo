<template>
  <div @click="getSelection">
    <span
      v-for="(i,index) in docLableList"
      :key="index"
      :style="i.lableId!=-1?'color:red;cursor:pointer;':''"
      @click="annotateIt(i)"
    >{{ doc.slice(i.startOffset, i.endOffset) }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Annotator extends Vue {
  @Prop()
  private doc: string = "";

  @Prop()
  private entityPosition!: any[];

  get sortPositionList() {
    // 对标注位置进行升序排序,并且去重
    const sorted: any = {};
    let sort = this.entityPosition.sort(
      (a, b) => a.startOffset - b.startOffset,
    );
    sort = sort.reduce((item, next) => {
      if (!sorted[next.startOffset]) {
        sorted[next.startOffset] = true && item.push(next);
      }
      return item;
    }, []);
    return sort;
  }

  get docLableList() {
    // 生成标注与未标注的文字对象数组，按文档开头至结尾升序排列
    const sortDoc = [];
    let flag = 0;
    for (const i of this.sortPositionList) {
      const marked = i; // 标注点
      const notMarked = this.creatPosition(flag, marked.startOffset); // 未标注点
      sortDoc.push(notMarked);
      sortDoc.push(marked);
      flag = marked.endOffset;
    }
    const end = this.creatPosition(flag, this.doc.length); // 补全
    sortDoc.push(end);
    return sortDoc;
    // console.log(sortDoc);
  }

  get markStyle() {
    return;
  }

  private creatPosition(start: any, end: any) {
    // 创建新的定位对象
    const position = {
      id: 0,
      lableId: -1,
      startOffset: start,
      endOffset: end,
    };
    return position;
  }

  private getSelection() {
    const sel = window.getSelection && window.getSelection(); // 得到selection对象
    let start;
    let end;
    // console.log(sel);
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0); // 返回range对象
      const preSelectionRange = range.cloneRange(); // 复制一份range
      // 将祖先节点变为整个文档,this.$el指向组件的dom，即将开始点重置为文档开头位置，因为range对象会忽略已被标注的文本，从而会产生偏移值误差
      preSelectionRange.selectNodeContents(this.$el);
      preSelectionRange.setEnd(range.startContainer, range.startOffset); // 将原本range对象的开始点作为文档开头到开始点的结束位置，从而找出开始点的真正偏移值
      start = preSelectionRange.toString().length;
      end = start + range.toString().length;
    }
  }

  private annotateIt(i: any) {
    if (i.lableId === -1) {
      return false;
    }
  }
}
</script>