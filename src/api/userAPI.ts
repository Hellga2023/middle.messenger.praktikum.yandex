import { UserModel } from "../models/models";
import { BaseAPI } from "./baseAPI";

class UserAPI extends BaseAPI {

    constructor(){
        super("/user");
    }

    public profile(user:UserModel){
        return this.http.put('/profile', {
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(user)
          });
    }
} 
export default UserAPI;
