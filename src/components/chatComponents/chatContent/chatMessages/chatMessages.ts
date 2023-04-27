import Block, {IProps} from "../../../block/block";
import MessageInput from "../messageInput/messageInput";
import MessageList from "../messagesList/messagesList";


export interface IChatMessagesProps extends IProps{
    messageInput?:MessageInput; //to type a message to chat     
    messageList?:MessageList; // all messages
}

const template =`{{{messageList}}} {{{messageInput}}}`;

class ChatMessages extends Block<IChatMessagesProps>{
    constructor(props:IChatMessagesProps){
        super(props);
    }

    public init(): void {
        this.children.messageInput = new MessageInput({});
        this.children.messageList = new MessageList({});
    }

    public render(): DocumentFragment{   
        
        return this.compile(template);
    }
}

export default ChatMessages;
