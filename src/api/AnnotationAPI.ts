import NLUEntity from "@/api/model/NLUEntity";

interface AnnotationAPI {

    getAnnotation(id: string): Promise<any>;

    createOrUpdateAnnotation(doc: NLUEntity): Promise<any>;

    getDocById(id: string): Promise<any>;

    getDocByParam(moduleId: string, status: string, page: number, size: number): Promise<any>;

    createNLUDoc(doc: NLUEntity): Promise<any>;

    deleteNLUDoc(id: string): Promise<any>;
}

export default AnnotationAPI;
