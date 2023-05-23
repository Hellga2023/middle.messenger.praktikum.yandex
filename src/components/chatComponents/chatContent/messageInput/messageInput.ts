import messageController from "../../../../controllers/messageController";
import Block, { IProps } from "../../../block/block";
import ImageButton from "../../../commonComponents/imageButton/imageButton";
import Input from "../../../commonComponents/input/input";
import "./messageInput.scss";

interface IMessageInputProps extends IProps{
    /* children */
    loadBtn?:ImageButton;
    messageInput?:Input;
    sendBtn?:ImageButton;  
}

const template = `{{{loadBtn}}} {{{messageInput}}} {{{sendBtn}}}`;

class MessageInput extends Block<IMessageInputProps> { 
    constructor(props: IMessageInputProps){
        props.class = "new-message-block";
        super(props);
    }
    
    init(){
        this.children.loadBtn = new ImageButton({
            type:"file", 
            iconClass:"fa-solid fa-paperclip new-message-block__file-icon", 
            class:"new-message-block__file-button"
        });
        this.children.messageInput = new Input({
            name: "message",
            type: "text",
            class: "new-message-block__input",
            placeholder: "message",
            events: {
                keyup: (event:Event) => {
                    if((event as KeyboardEvent).key === 'Enter'){
                        const input = event.target as HTMLInputElement;                        
                        messageController.sendMessage(input.value);
                        input.value = "";
                    }
                }
            }
        });
        this.children.sendBtn = new ImageButton({
            iconClass:"fa-solid fa-arrow-right", 
            class:"new-message-block__send-button",
            events: {
                click: ()=>{
                    let input = this.children.messageInput.element as HTMLInputElement;
                    let message = input.value;
                    if(message){
                        input.value = "";
                        messageController.sendMessage(message);
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
