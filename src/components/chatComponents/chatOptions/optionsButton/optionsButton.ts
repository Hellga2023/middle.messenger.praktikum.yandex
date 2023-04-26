import { withStore } from "../../../../modules/store";
import Block, { IProps } from "../../../block/block";
import ImageButton from "../../../commonComponents/imageButton/imageButton";
import ChatOptions from "../chatOptions/chatOptions";

const template = `{{{showButton}}} {{{optionsModal}}}`;

interface IOptionsButtonProps extends IProps{
    chatId:number|null;
    /* children */
    showButton?:ImageButton;
    optionsModal?:ChatOptions;
}

class OptionsButtonComponent extends Block<IOptionsButtonProps>{
    constructor(props:IOptionsButtonProps){
        super(props);
    }

    public init(): void {
        this.children.showButton = new ImageButton({
            class: "chat-content__user__button", //todo
            iconClass:"fa-solid fa-ellipsis-vertical", 
            events:{
                click: ()=>{ 
                    if(this.props.chatId){
                        this.children.optionsModal.getContent().showModal(); 
                    }else{
                        console.log("no chat id");
                    }                    
                }
            }});   

        this.children.optionsModal = new ChatOptions({});
    }

    public render():DocumentFragment{
        return this.compile(template);
    }
}

const withChatId = withStore((state) => ({...{chatId: state.chat.chatId}}));
const OptionsButton = withChatId(OptionsButtonComponent);

export default OptionsButton;
