class EntityClassModel {
    public id?: string;
    public moduleId?: string;
    public entityList!: EntityClassNode[];
    constructor() {
        this.id = "";
        this.moduleId = "";
        this.entityList = [];
    }
}

export interface EntityClassNode {
    id?: string;
    label?: string;
    children?: EntityClassNode[];
}

export default EntityClassModel;
