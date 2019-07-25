import Annotation from "./model/AnnotationModel";
import DocModel from "./model/DocModel";

interface AnnotationAPI {

    getAnnotation(id: string): Promise<any>;

    createOrUpdateAnnotation(annotation: Annotation): Promise<any>;

    getDocById(id: string): Promise<any>;

    getDocByParam(moduleId: string, status: string, page: number, size: number): Promise<any>;

    creatDoc(doc: DocModel): Promise<any>;

    deleteDoc(id: string): Promise<any>;
}

export default AnnotationAPI;
