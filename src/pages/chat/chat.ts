import Handlebars from 'handlebars';
import chat from './chat.tmpl';
import ChatItem from '../../components/chat_item/chat_item';
import Link from '../../components/link/link';
import './chat.scss'; 
import avatarImg from '../../../static/chatAvatar.png';
import Block from '../../block/block';

interface IChatProps{
    chatItems:any; //todo
}

class Chat extends Block<IChatProps> {
    constructor(data) {
        data.selectedChat = {
            username: data.selectedChat.user,
            avatarUrl: avatarImg
        };
        
        data.class = "content";
        super('main', data);
    }

    init():void{
        this.children.link = new Link({text:"Profile >", url: "/profile", class_: "grey-text"});
        let chatItems = new Array<ChatItem>();

        this.props.chatItems.forEach(function(element : any, id:number){ //todo any?
            if(id==0){ element.class_ = "chat-item_first" }; 
            element.avatarUrl = avatarImg;    
            chatItems.push(new ChatItem(element));
        });
        this.children.chat_items = chatItems;
    }

    render():DocumentFragment{
        return this.compile(chat);
    }
}
export default Chat;
