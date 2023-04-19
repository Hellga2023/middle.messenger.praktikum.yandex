import Login from './pages/login/login';
import Profile from './pages/profile/profile';
//import Main from './pages/main/main';
import Chat from './pages/chat/chat';
import Error from './pages/error/error';
import router, { Routes } from './routing/router';
import Signup from './pages/signup/signup';
import authController from './controllers/authController';
import { store } from './modules/store';

export const App = async () => {

    window.addEventListener("DOMContentLoaded", async () => {
        
        console.log("user should be set to state now");
        console.log(store.getState());
        router
          .use(Routes.LOGIN, Login, {})
          .use(Routes.SIGNUP, Signup, {})
          .use(Routes.PROFILE, Profile, {})
          .use(Routes.CHAT, Chat, {})
          .use(Routes.NOT_FOUND, Error, {});

        let isProtectedRoute = true;
        let is404 = false;

        //404?

        switch(window.location.pathname){
            case Routes.LOGIN:
            case Routes.SIGNUP:
                isProtectedRoute = false;
                break;
            case Routes.CHAT:
            case Routes.PROFILE:
                //isProtectedRoute = true;
                break;
            default:
                is404 = true; 
        }

        try{
            //todo check if it works?
            await authController.getUser();
            router.start();

           /* if(is404){
                router.go(Routes.NOT_FOUND);
            }else if(isProtectedRoute){
                //router.go(Routes.Profile);
                router.go(Routes.CHAT);
            }else{
                console.log(window.location.pathname);
                console.log(Routes.SIGNUP);
                console.log(window.location.pathname==Routes.SIGNUP);
                if(window.location.pathname==Routes.SIGNUP){
                    router.go(Routes.SIGNUP);
                }else{
                    console.log("in try redirect to login");
                router.go(Routes.LOGIN);
                }
                
            }*/
        }catch(e){
            console.log("in catch on start");
            router.start();
            router.go(Routes.LOGIN);
        }
    });
}
//todo fix 500 and 404 pages!!!

/* export const App = ():Block<any> => { //todo make common layout interface
   
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
