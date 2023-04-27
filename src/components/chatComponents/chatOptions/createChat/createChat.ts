import chatController from "../../../../controllers/chatController";
import Block, { IProps } from "../../../block/block";
import Button from "../../../commonComponents/button/button";
import Input from "../../../commonComponents/input/input";
import "./createChat.scss";

const template = `
<p>Please enter the chat title</p>
{{{chatTitle}}}
{{{createChatBtn}}}
<p class="create-chat__error">{{error}}</p>`;

interface ICreateChatProps extends IProps{
    error?: string;
    createChatBtn?: Button;
    chatTitle?: Input;
}

class CreateChat extends Block<ICreateChatProps> {
    constructor(props:IProps){
        props.class = "create-chat";
        super(props);
    }

    public init(): void {
        //todo move to render??
        this.children.createChatBtn = new Button({text: 'create new chat', type: "button", events:{
            click: (event:Event)=>{
                const value = (this.children.chatTitle.element as HTMLInputElement).value;
                if(value){
                   chatController.createChat(value);
                }else{
                    console.log("no value")
                }                   
            }
        }});
        this.children.chatTitle = new Input({name: "title", placeholder: 'chat title', class: "create-chat__input"});
    }

    public render():DocumentFragment {
        return this.compile(template);
    }

    public reset(): void {
        this.children.chatTitle.setProps({value: ""});
    }
}

export default CreateChat;

