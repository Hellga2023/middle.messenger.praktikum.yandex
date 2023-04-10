import selectedChat from './selectedChat.tmpl';
import Block, { IProps } from '../../block/block';
import ImageButton from '../../commonComponents/imageButton/imageButton';
import Input from '../../commonComponents/input/input';
//import Message from '../message/message';
import './selectedChat.scss';

interface ISelectedChatProps extends IProps{

    id: number;
    
    /* calculated props */
    messages?: Array<any>;
    username?:string; //todo?
    avatarUrl?:string;

    /* children */
    loadBtn?:ImageButton;
    messageInput?:Input;
    sendBtn?:ImageButton;    
}

class SelectedChat extends Block<ISelectedChatProps> {
    constructor(props:ISelectedChatProps) {
        //props.date = "March 30";
        super(props);

        /* getToken? */
        /* open socket */
    }

    init(): void {
        this.children.loadBtn = new ImageButton({
            type:"file", 
            iconClass:"fa-solid fa-paperclip chat-content__new-message-block__file-icon", 
            class:"chat-content__new-message-block__file-button"});
        this.children.messageInput = new Input({
            name: "message",
            type: "text",
            class: "chat-content__new-message-block__input",
            placeholder: "message"
        });
        this.children.sendBtn = new ImageButton({iconClass:"fa-solid fa-arrow-right", class:"chat-content__new-message-block__send-button"});
        /*this.children.messages = new Array<Message>;
        this.props.messages.forEach((message)=>{
            this.children.messages.push(
                new Message({text: message.text, 
                            time: message.time, 
                            class: "chat-content__messages__messag"})) });  */     

    }

    public render(): DocumentFragment{
       return this.compile(selectedChat);
    }
}

export default SelectedChat;
 