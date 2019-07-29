class NLUEntity {
    public id?: string;
    public moduleId?: string;
    public status?: string;
    public content?: string;
    public annotationList!: Annotation[];
}

export interface Annotation {
    value?: string;
    entityId?: string;
    startOffset?: number;
    endOffset?: number;
    entity?: string;
}

export default NLUEntity;
