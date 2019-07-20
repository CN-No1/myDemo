import Annotation from "./model/AnnotationModel";

interface AnnotationAPI {

    getAnnotation(id: string): Promise<any>;

    createOrUpdateAnnotation(annotation: Annotation): Promise<any>;
}

export default AnnotationAPI;
