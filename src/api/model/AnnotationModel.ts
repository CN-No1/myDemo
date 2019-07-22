class AnnotationModel {
    public id?: string;
    public docId?: string;
    public positionList!: Position[];

    constructor() {
        this.id = "";
        this.docId = "";
        this.positionList = [];
    }
}

export interface Position {
    //  定位对象
    value: string;
    entityId: string;
    startOffset: number;
    endOffset: number;
    entity: string;
}
export default AnnotationModel;
