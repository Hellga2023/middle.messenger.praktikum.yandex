import { store } from "../modules/store";
import { UserModel, UserWithAvatarModel } from "../models/models";
import UserAPI from "../api/userAPI";
import defaultImg from '../../static/defaultAvatar.png';

class UserController {
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
                .then((response)=>{   
                    let xhr = response as XMLHttpRequest;
                    let data = JSON.parse(xhr.responseText)
                    if(xhr.status===200){
                        store.set("profile.isLoading",false);
                        store.set("user", data);
                        store.set("profile.userSavingMessage", "User data saved successfully");
                    }else{
                        store.set("profile.isLoading",false);
                        store.set("profile.userSavingMessage", data.reason);
                    }
                })
                .catch(err => {
                  console.log(err);
                });  

    }

    public async searchUserByLogin(login:string){
      await this._api.searchByLogin(login)
      .then((response)=>{ 
        let xhr = response as XMLHttpRequest;
                    let data = JSON.parse(xhr.responseText)
                    if(xhr.status===200){
                        store.set("chat.chatOptions.addUserToChat.foundUsers",data);
                       
                    }else{
                        console.log(data.reason);
                    }
      })
      .catch(console.log);
    }

    public async saveUserAvatar(avatar:FormData){
      await this._api.saveUserAvatar(avatar).
      then((response)=>{
        let xhr = response as XMLHttpRequest;
        let data = JSON.parse(xhr.responseText);
        if(xhr.status===200){
          let user = data as UserWithAvatarModel;
          store.set("user", user);
          store.set("profile.avatarSavingMessage", "new avatar is saved");
        }
        else{
          store.set("profile.avatarSavingMessage", data.reason)
        }
      });
    }
    
    public getUserAvatarUrl(path:string|null){
      if(path){
        return "https://ya-praktikum.tech/api/v2/resources" + path;
      }else{
        return defaultImg;
      }      
    }
}

export default new UserController();
