import Handlebars from 'handlebars';
import chat from 'bundle-text:./chat.hbs';
import {ChatItem} from '../../components/chat_item/chat_item';
import {Link} from '../../components/link/link';
import './chat.css'; 

export const Chat = (data)=> {
    data.chat_items = [];
    data.chatItems.forEach(element => {         
        data.chat_items.push(ChatItem(element));
    });
    data.link = Link({text:"Profile >", url: "/profile", class_: "grey-text"});
    return Handlebars.compile(chat)(data); 
}