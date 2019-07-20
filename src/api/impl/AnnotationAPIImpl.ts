import BaseAPI from "../api";
import AnnotationAPI from "../AnnotationAPI";
import Annotation from "../model/AnnotationModel";

class AnnotationAPIImpl extends BaseAPI implements AnnotationAPI {

    constructor() {
        super();
        this.instance.defaults.baseURL = "/api/annotation";
    }

    public async getAnnotation(id: string) {
        return await this.instance.get("getAnnotation?id=" + id);
    }

    public async createOrUpdateAnnotation(annotation: Annotation) {
        return await this.instance.post("createOrUpdateAnnotation", JSON.stringify(annotation));
    }
}

export default AnnotationAPIImpl;
