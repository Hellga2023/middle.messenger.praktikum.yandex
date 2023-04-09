import { LoginFormModel, SignUpFormModel, User } from "../types/models";
import { BaseAPI } from "./baseApi";

class AuthAPI extends BaseAPI {

  constructor(){
    super("/auth");
  }

  public signup(user: SignUpFormModel){
    return this.http.post('/signup', {
      withCredentials: true,
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(user),
    } )//.then(response => (response as Promise<any>).) // Можно вытащить через .json()
    .then((response:XMLHttpRequest) => {
      const data = JSON.parse(response.responseText);
      console.log(2);
      console.log(data);
      //{user_id} = data;
      return data;
    });
  }

  public signin(user: LoginFormModel){
    return this.http.post('/signin', {
      withCredentials: true,
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(user)
    });
  }

  public logout(){
    return this.http.post("/logout",{ withCredentials: true, mode: 'cors'}); //todo mode remove??
  }

  public getUser(){
    return this.http.get("/user", { withCredentials: true, mode: 'cors' });
    /*.then((response : XMLHttpRequest)=>{      
        const data = JSON.parse(response.responseText);
        console.log(7);
      console.log(data);
        return data;
    })*/;
  }
} 

export default AuthAPI;
