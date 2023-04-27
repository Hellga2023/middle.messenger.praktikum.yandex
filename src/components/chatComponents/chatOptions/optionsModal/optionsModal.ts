import chatController from "../../../../controllers/chatController";
import Block, { IProps } from "../../../block/block";
import ImageButton from "../../../commonComponents/imageButton/imageButton";
import ChatOptions from "../chatOptions/chatOptions";

const template = `
<div class="chat-options__nav-row">{{{backButton}}} {{{closeButton}}}</div>
<div> {{{chatOptions}}} </div>`;

interface IModalWindowProps extends IProps{
    backButton?: ImageButton;
    closeButton?:ImageButton;
    chatOptions?:ChatOptions;
}

class OptionsModal extends Block<IModalWindowProps>{
    constructor(props:IModalWindowProps){
        props.class = "chat-options";
        super(props, "dialog");
    }   

    public init(): void {

        /* navigation */

        this.children.closeButton = new ImageButton({
            class: "chat-options__nav-button",
            iconClass:"fa-solid fa-x", 
            events:{
                click: ()=>{ 
                    //todo do we need this state chat content chat messages defined here?
                    chatController.showChatMessages();
                    this.children.chatOptions.setInitialState();  
                    (this.getContent() as HTMLDialogElement).close();                 
                }
        }});    

        this.children.backButton = new ImageButton({
            class: "chat-options__nav-button",
            iconClass:"fa-solid fa-arrow-left", 
            events:{
                click: ()=>{ this.children.chatOptions.setInitialState(); }
        }}); 

        /* content */

        this.children.chatOptions = new ChatOptions({});
    }

    public render(): DocumentFragment{       
        console.log("in render modal");
        return this.compile(template);
    }   
}

export default OptionsModal;
