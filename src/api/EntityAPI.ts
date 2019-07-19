import EntityClassModel from "./model/EntityClassModel";
interface EntityAPI {
    getClass(thingId: string): Promise<any>;

    updateClass(entityClass: EntityClassModel): Promise<any>;

    getThing(): Promise<any>;
}

export default EntityAPI;
