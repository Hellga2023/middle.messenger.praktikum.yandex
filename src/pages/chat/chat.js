import Handlebars from 'handlebars';
import chat from 'bundle-text:./chat.hbs';
import {ChatItem} from '../../components/chat_item/chat_item';
import {Link} from '../../components/link/link';
import './chat.css'; 
import avatarImg from '../../../static/chatAvatar.png';

export const Chat = (data)=> {
    data.selectedChat = {
        username: data.selectedChat.user,
        avatarUrl: avatarImg
    };
    console.log(data.selectedChat.user + ":" + avatarImg);
    data.chat_items = [];
    data.chatItems.forEach(function(element, id){
        if(id==0){ element.class_ = "chat-item_first" }; 
        element.avatarUrl = avatarImg;    
        data.chat_items.push(ChatItem(element));
    });
    data.link = Link({text:"Profile >", url: "/profile", class_: "grey-text"});
    return Handlebars.compile(chat)(data); 
}