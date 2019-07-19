import EntityAPI from "../EntityAPI";
import BaseAPI from "../api";
import EntityClassModel from "../model/EntityClassModel";

class EntityAPIImpl extends BaseAPI implements EntityAPI {

    constructor() {
        super();
        this.instance.defaults.baseURL = "/api/entity";
    }

    public async getClass(thingId: string): Promise<any> {
        return await this.instance.get("getClasses?id=" + thingId);
    }

    public async updateClass(entityClass: EntityClassModel): Promise<any> {
        return await this.instance.post("creatOrUpdateClass", JSON.stringify(entityClass));
    }

    public async getThing(): Promise<any> {
        return await this.instance.get("queryThing");
    }
}

export default EntityAPIImpl;
