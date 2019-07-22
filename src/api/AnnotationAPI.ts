import Annotation from "./model/AnnotationModel";

interface AnnotationAPI {

    getAnnotation(id: string): Promise<any>;

    createOrUpdateAnnotation(annotation: Annotation): Promise<any>;

    getDocById(id: string): Promise<any>;

    getDocByParam(moduleId: string, status: string, page: number, size: number): Promise<any>
}

export default AnnotationAPI;
