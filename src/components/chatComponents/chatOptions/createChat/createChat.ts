import chatController from "../../../../controllers/chatController";
//import { withStore } from "../../../../modules/store";
import Block, { IProps } from "../../../block/block";
import Button from "../../../commonComponents/button/button";
import Input from "../../../commonComponents/input/input";
import { spinner } from "../../../commonComponents/spinner/spinner";
import "./createChat.scss";

const template = `
{{#if isLoading}}
    {{{spinner}}}
{{else}}
    <p>Please enter the chat title</p>
    {{{chatTitle}}}
    {{{createChatBtn}}}
    <p class="create-chat__error">{{error}}</p>
{{/if}}`;

interface ICreateChatProps extends IProps{
    isLoading?:boolean;
    spinner?:string;
    error?: string;
    createChatBtn?: Button;
    chatTitle?: Input;
}

class CreateChat extends Block<ICreateChatProps> {
    constructor(props:ICreateChatProps){
        props.class = "create-chat";
        super(props);
    }

    public init(): void {
        this.children.spinner = spinner;
        this.children.createChatBtn = new Button({text: 'create new chat', type: "button", events:{
            click: ()=>{
                const value = (this.children.chatTitle.element as HTMLInputElement).value;
                if(value){
                   chatController.createChat(value);
                   this.reset();
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

/*//todo
const withLoading = withStore((state) => ({...{
    isLoading: state.chat.chatOptions.createChat.isLoading,
    error: state.chat.chatOptions.createChat.error
}}));*/

export default CreateChat;

