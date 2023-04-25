import { MessageDetailsModel } from "../../../../models/models";
import { XssProtect } from "../../../../utils/xssProtect";
import Block, {IProps} from "../../../block/block";
import Message from "../message/message";

export interface IMessageListProps extends IProps{
    userId: number,
    messages?: MessageDetailsModel[]
}

const messageList =`{{#each messageItems}}
                        {{{this}}}
                    {{/each}}`;

class MessageList extends Block<IMessageListProps>{
    constructor(props:IMessageListProps){
        props.class = "chat-content__messages";
        super(props);
    }

    public init(): void {
        this.children.messageItems = new Array<Message>();
        this.props.messages?.forEach(message => {
            this.children.messageItems.push(new Message({
                currentUserId: this.props.userId,
                id: message.id,
                userId: message.user_id,
                date: new Date(message.time),
                isRead: message.is_read,
                content: message.content//XssProtect.sanitizeHtml(message.content) 
            }));
        })        
    }

    public render(): DocumentFragment{   
        return this.compile(messageList);
    }

}

export default MessageList;
