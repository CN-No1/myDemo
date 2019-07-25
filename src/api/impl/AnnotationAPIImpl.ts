import BaseAPI from "../api";
import AnnotationAPI from "../AnnotationAPI";
import Annotation from "../model/AnnotationModel";
import DocModel from "@/api/model/DocModel";

class AnnotationAPIImpl extends BaseAPI implements AnnotationAPI {

    constructor() {
        super();
        this.instance.defaults.baseURL = "/api/annotation";
    }

    public async getAnnotation(id?: string) {
        return await this.instance.get("getAnnotation?id=" + id);
    }

    public async createOrUpdateAnnotation(annotation: Annotation) {
        return await this.instance.post("createOrUpdateAnnotation", JSON.stringify(annotation));
    }

    public async getDocById(id: string): Promise<any> {
        return await this.instance.get("getDocById?id=" + id);
    }

    public async getDocByParam(moduleId: string, status: string, page: number, size: number): Promise<any> {
        return await this.instance.get(
            "getDocByParam?moduleId=" + moduleId + "&status=" + status + "&page=" + page + "&size=" + size);
    }

    public async creatDoc(doc: DocModel): Promise<any> {
        return await this.instance.post("createDoc", JSON.stringify(doc));
    }
    public async deleteDoc(id: string): Promise<any> {
        return await this.instance.delete("deleteDoc?id=" + id);
    }
}

export default AnnotationAPIImpl;
