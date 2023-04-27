import Block, {IProps} from "../../../block/block";
import "./message.scss";

export interface IMessageProps extends IProps{
    id: number,
    userId: number,
    content: string,
    date: Date,
    time?: string,
    isRead: boolean,
    currentUserId: number,
    userClass?: string,
    isMyMessage?: boolean
}

const message =`
<div class="messages__message message {{userClass}}">
    <p class="message__content">{{content}}</p>
    <div class="message__info">
        <p class="message__info__time">{{time}}</p>
        {{#if isMyMessage}}
            <p class="message__info__seen-state {{# if isRead}} message__info__seen {{else}} message__info__not-seen{{/if}}"></p>
        {{/if}}
    </div>
</div>`;

class Message extends Block<IMessageProps>{
    constructor(props:IMessageProps){
        props.isMyMessage = props.currentUserId == props.userId;
        props.class = props.isMyMessage ? "messages__message-container_right" : 
        "messages__message-container_left" ;
        super(props);
    }

    public init(): void {
        this.props.userClass = this.props.currentUserId == this.props.userId 
        ? "messages__message_my" : "messages__message_not-my";
        this.props.time = this.props.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); //todo same as chatItem - move to utils
        //todo set isRead sign
        
    }

    public render(): DocumentFragment{        
        return this.compile(message);
    }

}

export default Message;
