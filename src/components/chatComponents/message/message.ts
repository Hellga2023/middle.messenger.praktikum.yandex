import Block, {IProps} from "../../block/block";

export interface IMessageProps extends IProps{
    id: number,
    userId: number,
    content: string,
    date: Date,
    time?: string,
    isRead: boolean,
    currentUserId: number,
    userClass?: string
}

const message =`<div class="chat-content__messages__message {{userClass}}">
{{content}}
<p class="isRead">{{isRead}}</p>
<p class="time">{{time}}</p>
</div>`;

class Message extends Block<IMessageProps>{
    constructor(props:IMessageProps){
        props.class = props.currentUserId == props.userId ? "chat-content__messages__message-container_right" : 
        "chat-content__messages__message-container_left" ;
        super(props);
    }

    public init(): void {
        this.props.userClass = this.props.currentUserId == this.props.userId 
        ? "chat-content__messages__message_my-message" : "chat-content__messages__message_not-my-message";
        this.props.time = this.props.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); //todo same as chatItem - move to utils
        //todo set isRead sign
        
    }

    public render(): DocumentFragment{        
        return this.compile(message);
    }

}

export default Message;
