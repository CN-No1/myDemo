class EntityClassNode {
    public id?: string;
    public label?: string;
    public description?: string;
    public children?: EntityClassNode[];
}

export interface FlatEntityClassModel {
    id?: string;
    label?: string;
    moduleId?: string;
    pid?: string;
}

export default EntityClassNode;
