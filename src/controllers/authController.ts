import AuthAPI from "../api/authApi";
import {store} from "../modules/store";
import router, { Routes } from "../routing/router";
import { LoginFormModel, SignUpFormModel, User } from "../types/models";
import Validation, { IValidationResult } from "../utils/validation";

class AuthController {

    private _api : AuthAPI;

    constructor(){
        this._api = new AuthAPI();
    }

    public async login(data: LoginFormModel) {
        try {
            store.set("login.isLoading",true);
            console.log(data);
            let result = await this._api.signin(data); 
            console.log("sign");
            //await this.getUser();
            
            
            if(result == "OK"){
                console.log("result");
                console.log(result);
                //let userId = result.id;
                store.set("login.isLoading",false);
                router.go(Routes.Profile)
            }
            else if(result.reason){
                console.log(1);
                console.log(result.reason);
                store.set("login.isLoading",false);
                store.set('login.validationError', result.reason);
            }             
        } catch (error) {
            console.log(error);
        }
    }

    public async signup(data: SignUpFormModel) {
        try {
            store.set("signup.isLoading",true);
            let result = await this._api.signup(data); 
            if(result.reason){
                console.log(1);
                console.log(result.reason);
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
        this._api.logout();
    }

    public async getUser() {
        try{
        console.log("get user");
        store.set('profile.isLoading', true);
        console.log("loading");
        await this._api.getUser().then(
            (user : User)=>{                
            //const user = JSON.parse(response.responseText);
            console.log("user fetched");
            console.log(user);
            store.set('profile.user', user);
            store.set('profile.isLoading', false);
        })
        .catch((err)=>{
            store.set('profile.hasError', true);
            console.log(err);
        });
        console.log("getUser ended");

        }catch(err){
console.log(err);
        }        

    }
} 

export default new AuthController();
