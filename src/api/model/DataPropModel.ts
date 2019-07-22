import EntityClass from "./EntityClassModel";
class DataPropModel {
    // 数据属性对象
    public id?: string;
    public moduleId?: string;
    public dataPropList!: DataPropNode[];
    constructor() {
        this.id = "";
        this.moduleId = "";
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
