import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Main from './pages/main/main';
import Chat from './pages/chat/chat';
import Error from './pages/error/error';
import avatarImg from '../static/chatAvatar.png';
import router, { Routes } from './routing/router';
import Signup from './pages/signup/signup';

const data = { 
    chatPage: {
        selectedChatId: 1,
        chats: [{
            id: 1,
            name: "Andrey",
            time: "10:59",
            unread_messages_count: 4,
            last_message: {
                type: "text",
                content: "blablabla"
            },
            avatarUrl: avatarImg,
            messages: [
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                }
            ]
        },
        {
            id: 2,
            name: "Sergey",
            time: "10:59",
            unread_messages_count: 4,
            last_message: {
                type: "text",
                content: "blablabla"
            },
            avatarUrl: avatarImg,
            messages: [
                {   time: "19:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                }
            ]
        },
        {
            id: 3,
            name: "Vlad",
            time: "10:59",
            unread_messages_count: 4,
            last_message: {
                type: "text",
                content: "blablabla"
            },
            avatarUrl: avatarImg,
            messages: [
                {   time: "20:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                },
                {   time: "18:07",
                    text: "dbfjsfbs dfsdhfsnf djhsdhfsnfs vjsdhfshflnsd sdjfbksjhfsdf"
                }
            ]
        }
        ]
    } 
};





 export const App = (rootQuery:string):void => {

    window.addEventListener("DOMContentLoaded", async () => {
        router
          .use(Routes.Login, Login, {})
          .use(Routes.Signup, Signup, {})
          .use(Routes.Profile, Profile, {})
          .use(Routes.Chat, Chat, data.chatPage)
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
