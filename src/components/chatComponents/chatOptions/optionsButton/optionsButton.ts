import { withStore } from "../../../../modules/store";
import Block, { IProps } from "../../../block/block";
import ImageButton from "../../../commonComponents/imageButton/imageButton";

const template = `{{{button}}}`;

interface IOptionsButtonProps extends IProps{
    chatId:number|null;
    /* children */
    button?:ImageButton;
}

class OptionsButtonComponent extends Block<IOptionsButtonProps>{
    constructor(props:IOptionsButtonProps){
        super(props);
    }

    public init(): void {
        this.children.button = new ImageButton({
            class: "chat-content__user__button", //todo
            iconClass:"fa-solid fa-ellipsis-vertical", 
            events:{
                click: ()=>{ 
                    if(this.props.chatId){
                        //todo how to show it via service?
                        const modal = document.getElementsByTagName('dialog')[0] as HTMLDialogElement;
                        modal.showModal();
                    }else{
                        console.log("no chat id");
                    }                    
                }
            }});   
    }

    public render():DocumentFragment{
        return this.compile(template);
    }
}

const withChatId = withStore((state) => ({...{chatId: state.chat.chatId}}));
const OptionsButton = withChatId(OptionsButtonComponent);

export default OptionsButton;
