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

    public saveUserAvatar(avatar: FormData) {
        return this.http.put('/profile/avatar', {
            data: avatar
        });
    }

    public searchByLogin(login:string){
        return this.http.post('/search',{
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify({login:login})
        })
    }
} 
export default UserAPI;
