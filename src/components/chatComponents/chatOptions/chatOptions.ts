import "./chatOptions.scss";
import Block, {IProps} from "../../block/block";
import ImageButton from "../../commonComponents/imageButton/imageButton";
import UserSearch from "../userSearch/userSearch";
import chatController from "../../../controllers/chatController";
import UserToDelete from "../userToDelete/userToDelete";
import { store } from "../../../modules/store";

const dialog =` 
<div class="add-or-delete-user__close-btn-row">{{{closeButton}}}</div>
{{#if isChooseAction}}
    <div class="add-or-delete-user__button-row">{{{addUserButton}}} Add user</div>
    <div class="add-or-delete-user__button-row">{{{deleteUserButton}}} Delete user</div>
    <div class="add-or-delete-user__button-row">{{{setChatAvatar}}} Set chat avatar</div>
{{else}}

    {{#if isAddUser}}
        <div class="add-or-delete-user__user-search">
        Please find the user to add
        {{{userSearch}}}
        </div>
    {{else}}
    <div>
    Delete user
    {{#each usersToDelete}}
        {{{this}}}
    {{/each}}
    </div>
    {{/if}}
{{/if}}
`;

enum ChatOptionsState {
    CHOOSE_ACTION,
    ADD_USER,
    DELETE_USER
}

interface IChatOptionsProps extends IProps{
    state?:ChatOptionsState;
    isChooseAction?: boolean;
    isAddUser?: boolean;

    usersToDelete?: UserToDelete[];

    /* children */

    addUserButton?:ImageButton;
    deleteUserButton?:ImageButton;
    closeButton?:ImageButton;
    setChatAvatar?:ImageButton;
    userSearch?:UserSearch;
}

class ChatOptions extends Block<IChatOptionsProps>{
    constructor(props:IChatOptionsProps){
        props.class = "add-or-delete-user";
        super(props, "dialog");
    }

    public init(): void {    
        this.props.state = ChatOptionsState.CHOOSE_ACTION;
        this.children.addUserButton = new ImageButton({
            class: "add-or-delete-user__round-button",
            iconClass:"fa-solid fa-plus", 
            type: "button",
            events:{
                click: ()=>{
                    this.setProps({state: ChatOptionsState.ADD_USER});                    
                }
        }});
        this.children.deleteUserButton = new ImageButton({
            class: "add-or-delete-user__round-button",
            iconClass:"fa-solid fa-x", 
            type: "button",
            events:{
                click: ()=>{ 
                    console.log("remove"); 
                this.setProps({state: ChatOptionsState.DELETE_USER});
            }
        }});    
        this.children.closeButton = new ImageButton({
            class: "add-or-delete-user__close-button",
            iconClass:"fa-solid fa-x", 
            type: "button",
            events:{
                click: ()=>{ 
                    chatController.showChatMessages();
                    this._setInitialState();                    
                }
        }});    
        this.children.setChatAvatar = new ImageButton({
            class: "add-or-delete-user__round-button",
            iconClass:"fa-solid fa-user-plus", 
            type: "button",
            events:{
                click: ()=>{ 
                    console.log("set avatar"); 
                    //this.setProps({state: AddOrDeleteUserState.DELETE_USER});
                }
            }
        });
        this.children.userSearch = new UserSearch({});  
        
    }

    public render(): DocumentFragment{ 

        this.props.isChooseAction = this.props.state == ChatOptionsState.CHOOSE_ACTION;
        this.props.isAddUser = this.props.state == ChatOptionsState.ADD_USER;

        this.children.usersToDelete = new Array<UserToDelete>(); 
        const chatUsers = store.getState().chat.chatContent.chatUsers;
        console.log("chat users in render add or delete");
        console.log(chatUsers);
        chatUsers.forEach(user => {
            console.log(user);
            this.children.usersToDelete.push(new UserToDelete({user:user, events: {
                click: () =>{
                    //add but not open chat
                    chatController.deleteUserFromChat(user.id);
                    //rerender deleted list or go to initial state if no users?
                    //refresh chat content after deleting user
                }
            }}));
        })

        return this.compile(dialog);
    }

    private _setInitialState(){
        this.setProps({
            state: ChatOptionsState.CHOOSE_ACTION,
        });
        (this.getContent() as HTMLDialogElement).close();
    }
}

export default ChatOptions;
