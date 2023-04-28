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
        //this.props.addUserToChatMessage = "To add a user please click this button (⋮)";
        //todo if no users show add user message
        this.props.avatarUrl = this.props.avatar!==undefined ? userController.getUserAvatarUrl(this.props.avatar):"";
        return this.compile(template);
    }
}

//temp fix for one user, what will be for many users?
const withChatInfo = withStore((state)=>({...{
    username: state.chat.chatContent.chatUsers[0] ? state.chat.chatContent.chatUsers[0].first_name : "", 
    avatar: state.chat.chatContent.chatUsers[0] ? state.chat.chatContent.chatUsers[0].avatar : undefined
}}));

const ChatShortInfo = withChatInfo(ChatInfo);

export default ChatShortInfo;
