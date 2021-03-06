import EntityAPI from "../EntityAPI";
import BaseAPI from "../api";
import EntityClassModel from "../model/EntityClassModel";
import DataPropModel from "../model/DataPropModel";
import ObjectPropModel from "../model/ObjectPropModel";
import DataTypeModel from "../model/DataTypeModel";

class EntityAPIImpl extends BaseAPI implements EntityAPI {


    constructor() {
        super();
        this.instance.defaults.baseURL = "/api/entity";
    }

    public async getClass(moduleId?: string): Promise<any> {
        return await this.instance.get("getClasses?id=" + moduleId);
    }

    public async getModule(): Promise<any> {
        return await this.instance.get("getModule");
    }

    public async getDataProp(moduleId: string): Promise<any> {
        return await this.instance.get("getDataProp?id=" + moduleId);
    }

    public async getObjectProp(moduleId: string): Promise<any> {
        return await this.instance.get("getObjectProp?id=" + moduleId);
    }

    public async getDataType(): Promise<any> {
        return await this.instance.get("getDataType");
    }

    public async creatOrUpdateClass(entityClass: EntityClassModel[]): Promise<any> {
        return await this.instance.post("creatOrUpdateClass", JSON.stringify(entityClass));
    }

    public async deleteClass(id: string): Promise<any> {
        return await this.instance.delete("deleteClass?id" + id);
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
