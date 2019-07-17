import EntityClasses from "./model/EntityClasses";
interface EntityAPI {
    getClasses(): Promise<any>;

    updateClasses(entityClass: EntityClasses[]): Promise<any>;
}

export default EntityAPI;
