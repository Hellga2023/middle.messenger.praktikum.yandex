import { LoginFormModel, SignUpFormModel } from "../models/models";
import { BaseAPI } from "./baseAPI";

class AuthAPI extends BaseAPI {

  constructor(){
    super("/auth");
  }

  public signup(user: SignUpFormModel){
    return this.http.post('/signup', {
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify(user),
    });
  }

  public signin(user: LoginFormModel){
    return this.http.post('/signin', { 
      headers: { 'content-type': 'application/json' }, 
      data: JSON.stringify(user)
    });
  }

  public logout(){
    return this.http.post("/logout");
  }

  public getUser(){
    return this.http.get("/user");
  }
} 

export default AuthAPI;
