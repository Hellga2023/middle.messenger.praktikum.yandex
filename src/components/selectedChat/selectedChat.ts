import selectedChat from './selectedChat.tmpl';
import Block, { IProps } from '../../block/block';
import ImageButton from '../imageButton/imageButton';
import Input from '../input/input';
import Message from '../message/message';
import './selectedChat.scss';

interface ISelectedChatProps extends IProps{
    username?:string; //todo?
    avatarUrl?:string;
    loadBtn?:any;
    messageInput?:any;
    sendBtn?:any;
    messages: Array<any>;
}

class SelectedChat extends Block<ISelectedChatProps> {
    constructor(props:ISelectedChatProps) {
        props.date = "March 30";
        super('div', props);
    }

    init(): void {
        this.children.loadBtn = new ImageButton({
            type:"file", 
            class_:"fa-solid fa-paperclip chat-content__new-message-block__file-icon", 
            class:"chat-content__new-message-block__file-button"});
        this.children.messageInput = new Input({
            type: "text",
            class: "chat-content__new-message-block__input",
            placeholder: "message"
        });
        this.children.sendBtn = new ImageButton({class_:"fa-solid fa-arrow-right", class:"chat-content__new-message-block__send-button"});
        this.children.messages = new Array<Message>;
        this.props.messages.forEach((message)=>{
            this.children.messages.push(
                new Message({text: message.text, 
                            time: message.time, 
                            class: "chat-content__messages__messag"})) });       

    }

    public render(): DocumentFragment{
       return this.compile(selectedChat);
    }
}

export default SelectedChat;
 