import { UserWithoutAvatarModel } from "../types/models";
import { BaseAPI } from "./baseApi";

class UserAPI extends BaseAPI {

    constructor(){
        super("/user");
    }

    public profile(user:UserWithoutAvatarModel){
        return this.http.put('/profile', {
            withCredentials: true,
            headers: {
              'content-type': 'application/json',
            },
            data: JSON.stringify(user)
          });
    }

    /*create() {
        return api.post('/', {})
            // И то, только в случае, если уверены в результате,
            // иначе контроллер проверит все сам дальше
            .then({user: {info}} => info);
    }*/
} 
export default UserAPI;
