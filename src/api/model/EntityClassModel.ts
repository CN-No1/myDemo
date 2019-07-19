class EntityClassModel {
    public id?: string;
    public thingId?: string;
    public entityList!: EntityClassNode[];
    constructor() {
        this.id = "";
        this.thingId = "";
        this.entityList = [];
    }
}

export interface EntityClassNode {
    id?: string;
    label?: string;
    children?: EntityClassNode[];
}

export default EntityClassModel;
