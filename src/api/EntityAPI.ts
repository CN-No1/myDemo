import EntityClassModel from "./model/EntityClassModel";
import DataPropModel from "./model/DataPropModel";
import ObjectPropModel from "./model/ObjectPropModel";
import DataTypeModel from "./model/DataTypeModel";

interface EntityAPI {
    getClass(moduleId: string): Promise<any>;

    getModule(): Promise<any>;

    getDataProp(moduleId: string): Promise<any>;

    getObjectProp(moduleId: string): Promise<any>;

    getDataType(moduleId: string): Promise<any>;

    creatOrUpdateClass(entityClass: EntityClassModel[]): Promise<any>;

    deleteClass(id: string): Promise<any>;

    creatOrUpdateDataProp(dataPropModel: DataPropModel): Promise<any>;

    creatOrUpdateObjectProp(objectPropModel: ObjectPropModel): Promise<any>;

    creatOrUpdateDataType(dataTypeModel: DataTypeModel[]): Promise<any>;

}

export default EntityAPI;
