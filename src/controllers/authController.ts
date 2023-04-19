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
        try{
            console.log("check if we already have user in store");
            //check if we already have user in store
            if(store.getState().user!=null){
                console.log("user already in store, return");
                return;
            }
            console.log("start fetch user");
        //store.set('profile.isLoading', true); //remove later
        //todo isLoading! add to proper pages (loading???)
        await this._api.getUser().then( (response) => {
            const xhr = response as XMLHttpRequest,
                result = JSON.parse(xhr.responseText);
            if(xhr.status == 200){
                store.set('user', result);
                console.log("user set");
            }else{
                console.log("user not set");
            }
            //store.set('profile.user', user); //may be common place for all pages!!!//remove later
            //store.set('profile.isLoading', false);//remove later            
        })
        .catch((err)=>{
            console.log("user not set because of error, may be update event handler was not added to listeners yet");
            //store.set('profile.hasError', true);
            console.log(err);
        });        

        }catch(err){
            console.log(err);
        }        

    }
} 

export default new AuthController();
