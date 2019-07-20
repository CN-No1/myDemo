import EntityAPI from "../EntityAPI";
import BaseAPI from "../api";
import EntityClassModel from "../model/EntityClassModel";
import DataPropModel from '../model/DataPropModel';
import ObjectPropModel from '../model/ObjectPropModel';
import DataTypeModel from '../model/DataTypeModel';

class EntityAPIImpl extends BaseAPI implements EntityAPI {

    constructor() {
        super();
        this.instance.defaults.baseURL = "/api/entity";
    }

    public async getClass(thingId: string): Promise<any> {
        return await this.instance.get("getClasses?id=" + thingId);
    }

    public async getThing(): Promise<any> {
        return await this.instance.get("getThing");
    }

    public async getDataProp(thingId: string): Promise<any> {
        return await this.instance.get("getDataProp?id=" + thingId);
    }

    public async getObjectProp(thingId: string): Promise<any> {
        return await this.instance.get("getObjectProp?id=" + thingId);
    }

    public async getDataType(): Promise<any> {
        return await this.instance.get("getDataType");
    }

    public async creatOrUpdateClass(entityClass: EntityClassModel): Promise<any> {
        return await this.instance.post("creatOrUpdateClass", JSON.stringify(entityClass));
    }

    public async creatOrUpdateDataProp(dataPropModel: DataPropModel): Promise<any> {
        return await this.instance.post("creatOrUpdateDataProp", JSON.stringify(dataPropModel));
    }

    public async creatOrUpdateObjectProp(objectPropModel: ObjectPropModel): Promise<any> {
        return await this.instance.post("creatOrUpdateObjectProp", JSON.stringify(objectPropModel));
    }

    public async creatOrUpdateDataType(dataTypeModel: DataTypeModel[]): Promise<any> {
        return await this.instance.post("creatOrUpdateDataType", JSON.stringify(dataTypeModel));
    }
}

export default EntityAPIImpl;
