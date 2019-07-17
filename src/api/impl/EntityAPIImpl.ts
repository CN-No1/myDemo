import EntityAPI from "../EntityAPI";
import BaseAPI from "../api";
import EntityClasses from "../model/EntityClasses";

class EntityAPIImpl extends BaseAPI implements EntityAPI {

    constructor() {
        super();
        this.instance.defaults.baseURL = "/api/entity";
    }

    public async getClasses(): Promise<any> {
        return await this.instance.get("getClasses");
    }

    public async updateClasses(entityClass: EntityClasses[]): Promise<any> {
        return await this.instance.post("creatOrUpdateClass", JSON.stringify(entityClass));
    }
}

export default EntityAPIImpl;
