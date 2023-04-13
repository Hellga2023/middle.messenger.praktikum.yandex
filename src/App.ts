import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Main from './pages/main/main';
import Chat from './pages/chat/chat';
import Error from './pages/error/error';
import router, { Routes } from './routing/router';
import Signup from './pages/signup/signup';
import authController from './controllers/authController';
import { store } from './modules/store';

export const App = (rootQuery:string):void => {

    //todo get user id and set in state, in router check if state authorized !!!!
    
    window.addEventListener("DOMContentLoaded", async () => {
        await authController.getUser();
        console.log("user should be set to state now");
        console.log(store.getState());
        router
          .use(Routes.Login, Login, {})
          .use(Routes.Signup, Signup, {})
          .use(Routes.Profile, Profile, {})
          .use(Routes.Chat, Chat, {})
          .start();
    });


    

 } /* export const App = ():Block<any> => { //todo make common layout interface
   
    switch(window.location.pathname){
        case '/profile': return new Profile(data.profilePage);
        case '/login': return new Auth(data.loginPage);
        case '/signup': return new Auth(data.signUpPage);
        case '/editprofile': 
            data.profilePage.editMode = true;
            return new Profile(data.profilePage);
        case '/chat': return new Chat(data.chatPage);
        case '/404': return new Error({code: "404"});
        case '/500': return new Error({code: "500"});
        default: return new Main();        
    }
 }*/
