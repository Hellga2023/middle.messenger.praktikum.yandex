import "./chatOptions.scss";
import Block, {IProps} from "../../../block/block";
import ImageButton from "../../../commonComponents/imageButton/imageButton";
import AddUser from "../userSearch/userSearch";
import chatController from "../../../../controllers/chatController";
import { withStore } from "../../../../modules/store";
import dialog from "./chatOptions.tmpl";
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

    /* navigation */
    closeButton?:ImageButton;
    backButton?:ImageButton;

    /* state buttons */

    createChatButton?:ImageButton;
    addUserButton?:ImageButton;
    deleteUserButton?:ImageButton;    
    setChatAvatar?:ImageButton;

    /* loading */
    spinner?: string;

    /* state pages */
    createChat?:CreateChat;
    addUser?:AddUser;
    deleteUser?:DeleteUserList;
    setAvatar?:SetAvatar;
}

class ChatOptionsComponent extends Block<IChatOptionsProps>{
    constructor(props:IChatOptionsProps){
        props.class = "chat-options";
        super(props, "dialog");
    }

    public init(): void { 
        
        this.props.state = ChatOptionsState.CHOOSE_ACTION;
        this.props.spinner = spinner;

        /* navigation */

        this.children.closeButton = new ImageButton({
            class: "chat-options__nav-button",
            iconClass:"fa-solid fa-x", 
            events:{
                click: ()=>{ 
                    chatController.showChatMessages(); //todo if no messages??
                    this._setInitialState();  
                    this._closeModal();                  
                }
        }});    

        this.children.backButton = new ImageButton({
            class: "chat-options__nav-button",
            iconClass:"fa-solid fa-arrow-left", 
            events:{
                click: ()=>{ this._setInitialState(); }
        }}); 

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
            events:{
                click: ()=>{ this.setProps({state: ChatOptionsState.ADD_USER}); }
        }});
        this.children.deleteUserButton = new ImageButton({
            class: "chat-options__round-button",
            iconClass:"fa-solid fa-x", 
            events:{
                click: ()=>{ this.setProps({state: ChatOptionsState.DELETE_USER}); }
        }});    
        
        this.children.setChatAvatar = new ImageButton({
            class: "chat-options__round-button",
            iconClass:"fa-solid fa-user-plus", 
            events:{
                click: ()=>{ this.setProps({state: ChatOptionsState.SET_AVATAR}); }
            }
        });

        /* init state pages */

        this.children.addUser = new AddUser({});  
        this.children.deleteUser = new DeleteUserList({});
        this.children.setAvatar = new SetAvatar({});
        this.children.createChat = new CreateChat({});        
    }

    public render(): DocumentFragment{ 
        return this.compile(dialog);
    }

    private _setInitialState(){
        this.setProps({ state: ChatOptionsState.CHOOSE_ACTION });
        this.children.setAvatar.reset();        
        this.children.addUser.reset();
        this.children.createChat.reset();
    }

    private _closeModal(){
        (this.getContent() as HTMLDialogElement).close();
    }
}

//todo store check??

const withChatOptions = withStore((state) => ({ ...state.chat.chatOptions }));

const ChatOptions = withChatOptions(ChatOptionsComponent);

export default ChatOptions;
