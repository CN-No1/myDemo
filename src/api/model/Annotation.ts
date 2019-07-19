class Annotation {
    public id?: string;
    public docId?: string;
    public positionList?: Position[];
}

export interface Position {
    //  定位对象
    value: string;
    entityId: string;
    startOffset: number;
    endOffset: number;
    entity: string;
}
export default Annotation;
