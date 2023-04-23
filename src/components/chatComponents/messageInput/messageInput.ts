import chatController from "../../../controllers/chatController";
import Block, { IProps } from "../../block/block";
import ImageButton from "../../commonComponents/imageButton/imageButton";
import Input from "../../commonComponents/input/input";

interface IMessageInputProps extends IProps{
    /* children */
    loadBtn?:ImageButton;
    messageInput?:Input;
    sendBtn?:ImageButton;  
}

const template = `{{{loadBtn}}} {{{messageInput}}} {{{sendBtn}}}`;

class MessageInput extends Block<IMessageInputProps> { 
    constructor(props: IMessageInputProps){
        props.class = "chat-content__new-message-block";
        super(props);
    }
    
    init(){
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
        this.children.sendBtn = new ImageButton({
            iconClass:"fa-solid fa-arrow-right", 
            class:"chat-content__new-message-block__send-button",
            type:"button",
            events: {
                click: ()=>{
                    let input = this.children.messageInput.element as HTMLInputElement;
                    let message = input.value;
                    if(message){
                        input.value = "";
                        chatController.sendMessage(message);
                    }
                }
            }
        });
    }
    
    render():DocumentFragment{
        return this.compile(template);
    }
}

export default MessageInput;
