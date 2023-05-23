import "./chatOptions.scss";
import Block, {IProps} from "../../../block/block";
import ImageButton from "../../../commonComponents/imageButton/imageButton";
import AddUser from "../userSearch/userSearch";
import chatController from "../../../../controllers/chatController";
import { withStore } from "../../../../modules/store";
import options from "./chatOptions.tmpl";
import CreateChat from '../createChat/createChat';
import { spinner } from '../../../commonComponents/spinner/spinner';
import DeleteUserList from "../deleteUserList/deleteUserList";
import SetAvatar from "../setAvatar/setAvatar";

export enum ChatOptionsState {
    CHOOSE_ACTION,
    ADD_USER,
    DELETE_USER,
    SET_AVATAR,
    CREATE_CHAT
}

interface IChatOptionsProps extends IProps{

    state?:ChatOptionsState;
    isLoading?: boolean;
    chatId?: number;

    /* state buttons */

    createChatButton?:ImageButton;
    addUserButton?:ImageButton;
    deleteUserButton?:ImageButton;    
    setChatAvatar?:ImageButton;
    deleteChatButton?:ImageButton;

    /* loading */
    spinner?: string;

    /* state pages */
    createChat:CreateChat;
    addUser:AddUser;
    deleteUser:typeof DeleteUserList;
    setAvatar:typeof SetAvatar;    
}

class ChatOptionsComponent extends Block<IChatOptionsProps>{
    constructor(props:IChatOptionsProps){
        props.class = "chat-options__content";
        super(props, "div");
    }

    public init(): void { 
        
        this.props.state = ChatOptionsState.CHOOSE_ACTION;
        this.props.spinner = spinner;

        /* init action buttons */

        this.children.createChatButton = new ImageButton({
            class: "chat-options__round-button",
            iconClass:"fa-solid fa-comments", 
            events:{
                click: ()=>{ this.setProps({state: ChatOptionsState.CREATE_CHAT}); }
        }});
        this.children.addUserButton = new ImageButton({
            class: "chat-options__round-button",
            iconClass:"fa-solid fa-plus", 
            disabledClass: "chat-options__round-button_disabled",
            events:{
                click: ()=>{ 
                    if(!this.children.addUserButton.props.disabled){
                        this.setProps({state: ChatOptionsState.ADD_USER}); 
                    }
                }
        }});
        this.children.deleteUserButton = new ImageButton({
            class: "chat-options__round-button",
            iconClass:"fa-solid fa-x", 
            disabledClass: "chat-options__round-button_disabled",
            events:{
                click: ()=>{ 
                    if(!this.children.deleteUserButton.props.disabled){
                    this.setProps({state: ChatOptionsState.DELETE_USER}); 
                }}
        }});    
        
        this.children.setChatAvatar = new ImageButton({
            class: "chat-options__round-button",
            iconClass:"fa-solid fa-user-plus", 
            disabledClass: "chat-options__round-button_disabled",
            events:{
                click: ()=>{ 
                    if(!this.children.setChatAvatar.props.disabled){
                    this.setProps({state: ChatOptionsState.SET_AVATAR}); 
                }}
            }
        });

        this.children.deleteChatButton = new ImageButton({
            class: "chat-options__round-button",
            iconClass:"fa-solid fa-trash", 
            disabledClass: "chat-options__round-button_disabled",
            events:{
                click: ()=>{ 
                    if(!this.children.deleteChatButton.props.disabled){
                        chatController.deleteChat();
                    }
                }
            }
        });        

        /* init state pages */

        this.children.addUser = new AddUser({});  
        this.children.deleteUser = new DeleteUserList({});
        this.children.setAvatar = new SetAvatar({});
        this.children.createChat = new CreateChat({});        
    }

    public render(): DocumentFragment{ 
        const disableChatRelatedButtons = !this.props.chatId;
        this.children.addUserButton.setProps({disabled: disableChatRelatedButtons});
        this.children.deleteUserButton.setProps({disabled: disableChatRelatedButtons});
        this.children.setChatAvatar.setProps({disabled: disableChatRelatedButtons});
        this.children.deleteChatButton.setProps({disabled: disableChatRelatedButtons});
        return this.compile(options);
    }

    public setInitialState(){
        this.setProps({ state: ChatOptionsState.CHOOSE_ACTION });
        this.children.setAvatar.reset();        
        this.children.addUser.reset();
        this.children.createChat.reset();
    }
}

const withChatOptions = withStore((state) => ({ ...{
    isLoading: state.chat.chatOptions.isLoading,
    chatId: state.chat.chatId
} }));

const ChatOptions = withChatOptions(ChatOptionsComponent);

export default ChatOptions;
