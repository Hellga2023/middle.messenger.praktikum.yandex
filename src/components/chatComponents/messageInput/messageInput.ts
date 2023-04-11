import Block, { IProps } from "../../block/block";
import ImageButton from "../../commonComponents/imageButton/imageButton";
import Input from "../../commonComponents/input/input";

interface IMessageInputProps extends IProps{
    /* children */
    loadBtn?:ImageButton;
    messageInput?:Input;
    sendBtn?:ImageButton;  
}

class MessageInput extends Block<IMessageInputProps> { 
    private _template = `{{{loadBtn}}} {{{messageInput}}} {{{sendBtn}}}`;

    constructor(props: IMessageInputProps){
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
        this.children.sendBtn = new ImageButton({iconClass:"fa-solid fa-arrow-right", class:"chat-content__new-message-block__send-button"});
    }
    
    render():DocumentFragment{
        return this.compile(this._template);
    }
}

export default MessageInput;
