import { MessageDetailsModel } from "../../../../models/models";
import { withStore } from "../../../../modules/store";
import { XssProtect } from "../../../../utils/xssProtect"; //todo!!!
import Block, {IProps} from "../../../block/block";
import Message from "../message/message";
import { spinner } from '../../../commonComponents/spinner/spinner';
import { NullableId } from "../../../../utils/customTypes";

export interface IMessageListProps extends IProps{
    isLoading: boolean,
    spinner: string,
    userId?: NullableId,
    messages?: MessageDetailsModel[],
    hasNoMessages?:boolean,
    /* children */
    messageItems?: Message[]
}

const messageList =`
{{#if isLoading}}
    {{{spinner}}}
{{else if hasNoMessages}}
    <p>Please start messaging</p>
{{else}}
    {{#each messageItems}}
        {{{this}}}
    {{/each}}
{{/if}}`;

class MessageListComponent extends Block<IMessageListProps>{
    constructor(props:IMessageListProps){
        props.class = "chat-content__messages";
        super(props);
    }

    public init(): void {
        this.props.spinner = spinner;
    }

    public render(): DocumentFragment{   
        console.log("spinner");
        console.log(this.props.spinner);
        if(this.props.userId){

            this.props.hasNoMessages = !this.props.messages || this.props.messages.length==0;

            if(!this.props.hasNoMessages){
                this.children.messageItems = new Array<Message>();
                this.props.messages?.forEach((message:MessageDetailsModel) => {
                    this.children.messageItems.push(new Message({
                        currentUserId: this.props.userId!,
                        id: message.id,
                        userId: message.user_id,
                        date: new Date(message.time),
                        isRead: message.is_read,
                        content: XssProtect.sanitizeHtml(message.content)  //XssProtect.sanitizeHtml(message.content) 
                    }));
                });  
            }            
        }else{
            console.log("user id is null");
        }
        return this.compile(messageList);
    }
}

const withMessages = withStore((state) => ({...{
    isLoading: state.chat.chatContent.chatMessages.isLoading,
    messages: state.chat.chatContent.chatMessages.messages, 
    userId: state.user?.id}}));
const MessageList = withMessages(MessageListComponent);

export default MessageList;
