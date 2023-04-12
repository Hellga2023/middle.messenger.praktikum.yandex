import chatItem from './chatItem.tmpl';
import './chatItem.scss';
import Block,{IProps} from '../../block/block';
import { DateService } from '../../../utils/dateUtils';
import avatarImg from '../../../../static/defaultAvatar.png';
import chatController from '../../../controllers/chatController';

interface IChatItemProps extends IProps{

    id: number;
    title: string;

    selectedClass?:string;
    avatar?: string; // chat avatar not user!
    hasUnreadMessages?:boolean;
    unreadCount?: number;
    date?: Date;//todo read about timestamps    
    convertedTime?:string;
    lastMessage?: string;
}
class ChatItem extends Block<IChatItemProps> {
    constructor(props:IChatItemProps) {
        super(props);
    }

    public init(): void {
        this.props.convertedTime = this.convertDateTime(this.props.date as Date);
        this.props.hasUnreadMessages = this.props.unreadCount? this.props.unreadCount>0 : false;
        this.props.avatar = this.props.avatar || avatarImg;
        this.props.events = {click:()=>{
            chatController.setSelectedChat(this.props.id);
        }};
    }

    public render(): DocumentFragment{
       return this.compile(chatItem);
    }

    private convertDateTime(date:Date):string{   
        if(date){
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
 
