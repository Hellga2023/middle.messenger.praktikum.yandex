import { HTTP } from "../utils/http";

export class BaseAPI {

    protected http : HTTP;

    constructor(endpoint:string){
        this.http = new HTTP(endpoint);
    }

    /* do we need this??? */

    create() { throw new Error('Not implemented'); }

    request(data:any) { throw new Error('Not implemented'); }

    update() { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }
}
