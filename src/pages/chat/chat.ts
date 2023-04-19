import chat from './chat.tmpl';
import './chat.scss'; 
import Block, {IProps} from '../../components/block/block';
import ChatContent from '../../components/chatComponents/chatContent/chatContent';
import Link from '../../components/commonComponents/link/link';
import chatController from '../../controllers/chatController';
import ChatList from '../../components/chatComponents/chatList/chatList';
import { Routes } from '../../routing/router';

interface IChatProps extends IProps{

    /*children */

    /* selected chat content*/
    chatContent?:ChatContent;
    /* profile link */
    link?: Link;

    /* chat list */
    chatList?:ChatList;

    //todo chats search!!!
}

class Chat extends Block<IChatProps> {
    constructor(data:IChatProps) {
        data.class = "content";
        super(data, 'main');
        chatController.getChats();
    }

    init():void{
        this.children.link = new Link({text:"Profile >", url: Routes.PROFILE, class_: "grey-text"});
    } 

    render():DocumentFragment{         

        //todo loading for chat list is separate, move to chat list control??
        if(!(this.children.chatList instanceof ChatList)){
            this.children.chatList = new ChatList({});
        }
        if(!(this.children.chatContent instanceof Chat)){
            this.children.chatContent = new ChatContent({});
        }

        return this.compile(chat);
    }
}
export default Chat;
