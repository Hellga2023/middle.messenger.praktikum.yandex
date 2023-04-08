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
    console.log("api");
    return this.http.post('/signin', {
      withCredentials: true,
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(user)
    }).then((response:XMLHttpRequest) => {
      console.log("resp");
      console.log(response);
      if(response.status===200){ //todo see in repo???
        console.log("ok");
        return response.responseText;
      }else{
        const data = JSON.parse(response.responseText);
        console.log(2);
      console.log(data);
        return data;
      }
    });
  }

  public logout(){
    return this.http.post("/logout",{
      withCredentials: true,
      mode: 'cors' 
    });
  }

  public getUser():Promise<User>{
    console.log("get in api");
    return this.http.get<User>("/user", { withCredentials: true, mode: 'cors' });
    /*.then((response : XMLHttpRequest)=>{      
        const data = JSON.parse(response.responseText);
        console.log(7);
      console.log(data);
        return data;
    })*/;
  }
} 

export default AuthAPI;
