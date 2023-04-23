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

        switch(window.location.pathname){
            case Routes.LOGIN:
            case Routes.SIGNUP:
                isProtectedRoute = false;
                break;
            case Routes.CHAT:
            case Routes.PROFILE:
                break;
            default:
                is404 = true; 
        }

        try{
            await authController.getUser();
            router.start();
            if(is404){
                router.go(Routes.NOT_FOUND);
            }
            if(isProtectedRoute && !store.getState().user){
                router.go(Routes.LOGIN);
            }
        }catch(e){
            console.log("in catch on start");
            router.start();
            router.go(Routes.LOGIN);
        }
    });
}
