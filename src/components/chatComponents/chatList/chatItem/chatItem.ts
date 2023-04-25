import chatItem from './chatItem.tmpl';
import './chatItem.scss';
import Block,{IProps} from '../../../block/block';
import { DateService } from '../../../../utils/dateUtils';
//import avatarImg from '../../../../static/defaultAvatar.png';
import chatController from '../../../../controllers/chatController';
import { ChatInfoModel } from '../../../../models/models';
import { XssProtect } from '../../../../utils/xssProtect';

interface IChatItemProps extends IProps{

    chatInfo: ChatInfoModel;    
    //calculated props
    selectedClass?:string;
    hasUnreadMessages?:boolean;
    convertedTime?:string;   
    avatar?:string; 
}

class ChatItem extends Block<IChatItemProps> {
    constructor(props:IChatItemProps) {
        super(props);
    }

    public init(): void {
        this.props.convertedTime = this.convertDateTime(this.props.chatInfo.last_message?.time);
        this.props.hasUnreadMessages = this.props.chatInfo.unread_count? this.props.chatInfo.unread_count>0 : false;        
        this.props.events = {click:()=>{
            chatController.selectChat(this.props.chatInfo.id);
        }};

        /* sanitize data */
        this.props.chatInfo.title = XssProtect.sanitizeHtml(this.props.chatInfo.title);
        if(this.props.chatInfo && this.props.chatInfo.last_message){
            this.props.chatInfo.last_message.content = XssProtect.sanitizeHtml(this.props.chatInfo.last_message.content);
        }
    }

    public render(): DocumentFragment{
        //todo rerender list or this item on update?
       this.props.avatar = chatController.getChatAvatarUrl(this.props.chatInfo.avatar);
       return this.compile(chatItem);
    }

    private convertDateTime(time:string|undefined):string{   
        if(time){
            const date = new Date(time);
            if(DateService.isToday(date)){
                return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            }else if(DateService.isYesterday(date)){
                return "yesterday";
            }else{
                return date.toLocaleString('EN-US', { month: 'short', day: "2-digit" });
            }
        } else {
            return "";
        }      
    }
}

export default ChatItem;
 
