import EntityClassModel from "./model/EntityClassModel";
import DataPropModel from "./model/DataPropModel";
import ObjectPropModel from "./model/ObjectPropModel";
import DataTypeModel from "./model/DataTypeModel";

interface EntityAPI {
    getClass(thingId: string): Promise<any>;

    getThing(): Promise<any>;

    getDataProp(thingId: string): Promise<any>;

    getObjectProp(thingId: string): Promise<any>;

    getDataType(thingId: string): Promise<any>;

    creatOrUpdateClass(entityClass: EntityClassModel): Promise<any>;

    creatOrUpdateDataProp(dataPropModel: DataPropModel): Promise<any>;

    creatOrUpdateObjectProp(objectPropModel: ObjectPropModel): Promise<any>;

    creatOrUpdateDataType(dataTypeModel: DataTypeModel[]): Promise<any>;

}

export default EntityAPI;
