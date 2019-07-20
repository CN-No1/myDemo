import { EntityClassNode } from "./EntityClassModel";
class ObjectPropModel {
    // 数据属性对象
    public id?: string;
    public thingId?: string;
    public objectPropList!: ObjectPropNode[];
    constructor() {
        this.id = "";
        this.thingId = "";
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
    domain?: EntityClassNode[];
    range?: EntityClassNode[];
}

export default ObjectPropModel;
