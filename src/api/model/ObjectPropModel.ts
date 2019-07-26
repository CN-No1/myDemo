class ObjectPropModel {
    // 数据属性对象
    public id?: string;
    public moduleId?: string;
    public objectPropList!: ObjectPropNode[];
    constructor() {
        this.id = "";
        this.moduleId = "";
        this.objectPropList = [];
    }
}

export interface ObjectPropNode {
    // 节点对象
    id?: string;
    label?: string;
    children?: ObjectPropNode[];
    relation: Relation[];
}

export interface Relation　{
    domain?: string;
    range?: string;
}

export default ObjectPropModel;
