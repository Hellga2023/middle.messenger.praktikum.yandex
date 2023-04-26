import userController from "../../../../controllers/userController";
import { withStore } from "../../../../modules/store";
import Block, { IProps } from "../../../block/block";
import "./chatShortInfo.scss";

interface IChatInfoProps extends IProps{
    username?:string,    
    avatar?:string | null, //avatar relative path
    avatarUrl?: string //avatar full path
}

const template = `
<img class="chat-info__avatar" src="{{avatarUrl}}"/> 
<p class="chat-info__username">{{username}}</p>`;

class ChatInfo extends Block<IChatInfoProps>{
    constructor(props:IChatInfoProps){
        props.class ="chat-info";
        super(props);
    }

    render(): DocumentFragment {
        this.props.avatarUrl = this.props.avatar!==undefined ? userController.getUserAvatarUrl(this.props.avatar):"";
        return this.compile(template);
    }
}

const withChatInfo = withStore((state)=>({...{
    username: state.chat.users.chatUsers[0] ? state.chat.users.chatUsers[0].first_name : "", 
    avatar: state.chat.users.chatUsers[0] ? state.chat.users.chatUsers[0].avatar : undefined
}}));

const ChatShortInfo = withChatInfo(ChatInfo);

export default ChatShortInfo;
