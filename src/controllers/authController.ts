import AuthAPI from "../api/authApi";
import {store} from "../modules/store";
import router, { Routes } from "../routing/router";
import { LoginFormModel, SignUpFormModel } from "../types/models";

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
                        router.go(Routes.Profile)
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
            let result = await this._api.signup(data); 
            if(result.reason){
                store.set("signup.isLoading",false);
                store.set('signup.validationError', result.reason);
            }else{
                let userId = result.id;
                store.set("signup.isLoading",false);
                router.go(Routes.Profile)
            }        
        } catch (error) {
            console.log(error);
        }
    }

    public async logout() {
        this._api.logout()
       .then(() => {
            store.set('profile.user', null);
            router.go(Routes.Login);
        })
      .catch(console.log);        
    }

    public async getUser() {
        try{
        store.set('profile.isLoading', true);
        await this._api.getUser().then( (response) => {
            const user = JSON.parse((response as XMLHttpRequest).responseText);
            console.log("user fetched");
            console.log(user);
            store.set('profile.user', user);
            store.set('profile.isLoading', false);
        })
        .catch((err)=>{
            store.set('profile.hasError', true);
            console.log(err);
        });        

        }catch(err){
            console.log(err);
        }        

    }
} 

export default new AuthController();
