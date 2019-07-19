import EntityClass from "./EntityClassModel";
class DataPropModel {
    // 数据属性对象
    public id?: string;
    public thingId?: string;
    public dataPropList!: DataPropNode[];
    constructor() {
        this.id = "";
        this.thingId = "";
        this.dataPropList = [];
    }
}

export interface DataPropNode {
    // 节点对象
    id?: string;
    label?: string;
    children?: DataPropNode[];
    entityClass?: EntityClass[];
    dataType?: string;
}

export default DataPropModel;
