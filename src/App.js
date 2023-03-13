import {Auth} from './pages/auth/auth.js';
import {Profile} from './pages/profile/profile.js';
import {Main} from './pages/main/main.js';
import {Chat} from './pages/chat/chat.js';
import {Error} from './pages/error/error.js';

const data = {
    loginPage: {
        isLoginMode: true,
        inputs: [
            {label: "Email", type: "text", name: "login"}, 
            {label: "Password", type: "password", name: "password"}
        ],
        btn: {text: "Login"},
        link:{text:"No account yet?", url: "/signup"}
    },
    signUpPage:{
        isLoginMode: false,
        btn:{text: "Sign up"}, 
            link: {text:"Login", url: "/login"},
            inputs: [
                {label: "Email", type: "text", name: "email" }, 
                {label: "Login", type: "text", name: "login"}, 
                {label: "Name", type: "text", name: "first_name"}, 
                {label: "Surname", type: "text", name: "second_name"}, 
                {label: "Phone", type: "text", name: "phone"}, 
                {label: "Password", type: "password", name: "password"},
            ]
    },
    profilePage : {
        isProfileInEditMode: false,
        user: {
            name: "Olga",
            infos: [{name:"Email", value:"hellga@yandex.ru"},
                {name:"Login", value:"Hellga"},
                {name:"Name", value:"Olga"},
                {name:"Surname", value:"Kup"},
                {name:"Nickname", value:"Hellga"},
                {name:"Phone", value:"+7 999 111-11-11"}]
        }       
    },
    chatPage: {
        chatItems: [{
            name: "Andrey",
            time: "10:59",
            unread_messages_count: 4,
            last_message: {
                type: "text",
                content: "blablabla"
            },
            avatar: "дфдфдфд"
        } 
        ]
    } 
};

 export const App = () => {
    switch(window.location.pathname){
        case '/profile': return Profile(data.profilePage);
        case '/login': return Auth(data.loginPage);
        case '/signup': return Auth(data.signUpPage);
        case '/editprofile': 
            data.profilePage.isProfileInEditMode = true;
            return Profile(data.profilePage);
        case '/chat': return Chat(data.chatPage);
        case '/404': return Error({code: "404"});
        case '/500': return Error({code: "500"});
        default: return Main();        
    }
 }
