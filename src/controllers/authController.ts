import AuthAPI from "../api/authAPI";
import {store} from "../modules/store";
import router, { Routes } from "../routing/router";
import { LoginFormModel, SignUpFormModel, UserWithAvatarModel } from "../models/models";

class AuthController {

    private _api : AuthAPI;

    constructor(){
        this._api = new AuthAPI();
    }

    public async login(data: LoginFormModel) {
        try {
            store.set("login.isLoading",true);
            await this._api.signin(data)
                .then((response)=>{
                    let data = (response as XMLHttpRequest).responseText;
                    if(data==="OK"){
                        store.set("login.isLoading",false);
                        router.go(Routes.CHAT);
                    }else{
                        const error = JSON.parse(data);
                        store.set("login.isLoading",false);
                        store.set("login.validationError", error.reason);
                    }
                });  
        } catch (error) {
            console.log(error);
        }
    }

    public async signup(data: SignUpFormModel) {
        try {
            store.set("signup.isLoading",true);
            let result = await this._api.signup(data).then(response => {
                const data = JSON.parse(response.responseText);
                if(data.reason){
                    store.set("signup.isLoading",false);
                    store.set('signup.validationError', data.reason);
                }else{
                    let userId = data.id;
                    store.set("signup.isLoading",false);
                    router.go(Routes.CHAT)
                }   
            }); 
                 
        } catch (error) {
            console.log(error);
        }
    }

    public async logout() {
        this._api.logout()
       .then(() => {
            store.set('user', null);
            router.go(Routes.LOGIN);
        })
      .catch(console.log);        
    }

    public async getUser() {        
            if(store.getState().user!=null){
                return;
            }           
        await this._api.getUser().then( (response) => {
            const xhr = response as XMLHttpRequest,
                result = JSON.parse(xhr.responseText);
            if(xhr.status == 200){
                store.set('user', result);
            }else{
                console.log("user not set");
            }         
        })
        .catch((err)=>{
            console.log("user not set because of error, may be update event handler was not added to listeners yet");
            console.log(err);
        });
    }
} 

export default new AuthController();
