import { store } from "../modules/store";
import { UserModel } from "../types/models";
import UserAPI from "../api/userApi";

class UserController {
    /*public getUser() {
      UserAPI.getUser()
               .then(data => store.set('user.data', data);
    }*/

    private _api : UserAPI;

    constructor(){
      this._api = new UserAPI();
    }

    public setEditMode(editMode:boolean){
      store.set('profile.editMode', editMode);
    }

    public async saveUser(user:UserModel){
      store.set("profile.isLoading",true);
      await this._api.profile(user)
                .then((data)=>{    
                    let response = data as XMLHttpRequest;           
                    if(response.status===200){
                        const user = JSON.parse(response.responseText);
                        console.log(user);
                        store.set("profile.isLoading",false);
                        store.set("profile.user", user);
                        store.set("profile.userSavingMessage", "User data saved successfully");
                    }else{
                        console.log("saving user5");
                        const error = JSON.parse(response.responseText);
                        store.set("profile.isLoading",false);
                        store.set("profile.userSavingMessage", error.reason);
                    }
                });  

    }
}

export default new UserController();
