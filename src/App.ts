import Auth from './pages/auth/auth';
import Profile from './pages/profile/profile';
import Main from './pages/main/main';
import Chat from './pages/chat/chat';
import Error from './pages/error/error';
import Block from './block/block';
import avatarImg from '../static/chatAvatar.png';

const data = {
    loginPage: {
        isLogin: true,
        inputs: [
            {label: "Email", type: "text", name: "login"}, 
            {label: "Password", type: "password", name: "password"}
        ],
        btn: {text: "Login"},
        link:{text:"No account yet?", url: "/signup"}
    },
    signUpPage:{
        isLogin: false,
        btn:{text: "Sign up"}, 
            link: {text:"Login", url: "/login"},
            inputs: [
                {label: "Email", type: "text", name: "email", error: "Invalid email" }, 
                {label: "Login", type: "text", name: "login", error: "Invalid login"}, 
                {label: "Name", type: "text", name: "first_name", error: "Invalid name"}, 
                {label: "Surname", type: "text", name: "second_name", error: "Invalid surname"}, 
                {label: "Phone", type: "text", name: "phone", error: "Invalid phone"}, 
                {label: "Password", type: "password", name: "password", error: "Invalid password"},
            ]
    },
    profilePage : {
        editMode: false,
        infos: [{label:"Email", value:"hellga@yandex.ru", name: "email"},
                {label:"Login", value:"Hellga", name: "login"},
                {label:"Name", value:"Olga", name: "first_name"},
                {label:"Surname", value:"Kup", name: "second_name"},
                {label:"Nickname", value:"Hellga", name: "display_name"},
                {label:"Phone", value:"+7 999 111-11-11", name: "phone"}],
        username: "Olga"            
    },
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
            avatarUrl: avatarImg
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
            avatarUrl: avatarImg
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
            avatarUrl: avatarImg
        }
        ]
    } 
};

 export const App = ():Block<any> => { //todo make common layout interface
   
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
 }
