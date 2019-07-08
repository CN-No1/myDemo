import Vue from "vue";
import Router from "vue-router";
import InnerLayout from "./components/layout/InnerLayout.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: { menuName: "首页", iconClass: "" },
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/entity",
      name: "entity",
      meta: { menuName: "实体", iconClass: "" },
      component: InnerLayout,
      redirect: "/entity/classes",
      children: [
        {
          path: "classes",
          name: "classes",
          meta: { menuName: "实体类", iconClass: "" },
          component: () => import("./views/entity/Classes.vue"),
        },
        {
          path: "objectProp",
          name: "objectProp",
          meta: { menuName: "对象属性", iconClass: "" },
          component: () => import("./views/entity/ObjectProp.vue"),
        },
        {
          path: "dataProp",
          name: "dataProp",
          meta: { menuName: "数据属性", iconClass: "" },
          component: () => import("./views/entity/DataProp.vue"),
        },
        {
          path: "dataType",
          name: "dataType",
          meta: { menuName: "数据类型", iconClass: "" },
          component: () => import("./views/entity/DataType.vue"),
        },
      ],
    },
    {
      path: "/annotation",
      name: "annotation",
      meta: { menuName: "标注", iconClass: "" },
      component: InnerLayout,
      redirect: "/annotation/uploadFile",
      children: [
        {
          path: "uploadFile",
          name: "uploadFile",
          meta: { menuName: "上传文章", iconClass: "" },
          component: () => import("./views/annotation/UploadFile.vue"),
        },
        {
          path: "docList",
          name: "docList",
          meta: { menuName: "文章列表", iconClass: "" },
          component: () => import("./views/annotation/annotate/DocList.vue"),
        },
        {
          path: "annotate",
          name: "annotate",
          meta: { menuName: "标注文章", iconClass: "", style: "display:none" },
          component: () => import("./views/annotation/annotate/Annotate.vue"),
        },
      ],
    },
  ],
});
