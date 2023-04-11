import chatContent from './chatContent.tmpl';
import './chatContent.scss';
import Block, { IProps } from '../../block/block';
import ImageButton from '../../commonComponents/imageButton/imageButton';
import UserSearch from '../userSearch/userSearch';
//import Message from '../message/message';
import chatController from '../../../controllers/chatController';
import { store, StoreEvents } from '../../../modules/store';
import MessageInput from '../messageInput/messageInput';

export const enum ChatContentState {
    CHAT_CREATED,
    ADD_USER,
    CHAT_MESSAGES
}

interface IChatContentProps extends IProps{    

    /* state props */
    contentState: ChatContentState;
    isLoading: boolean;
    
    /* data props */
    //messages?: Array<any>;
    //username?:string; //todo?
    //avatarUrl?:string;

    /* children */
    addUserButton?:ImageButton; //shows user search to add user to chat

    messageInput?:MessageInput; //to type a message to chat   
    
    userSearch?: UserSearch; //list of users to add to chat
}

class ChatContent extends Block<IChatContentProps> { //todo withStore store.getState().chat.chatContent
    constructor(props:IChatContentProps) {        
        super(props);
        this.props.contentState = ChatContentState.CHAT_CREATED;
        store.on(StoreEvents.Updated, () => { 
            try{
                let state = store.getState().chat.chatContent;
                console.log(state); // created, add user, messages
                this.setProps({contentState: state.state, isLoading: state.isLoading });

            }catch(err){ console.log(err); }            
        });}

    init(): void {

        this.children.addUserButton = new ImageButton({
            iconClass:"fa-solid fa-ellipsis-vertical", 
            type: "button",
            events:{
                click: ()=>{ chatController.showUserSearch(); }
            }});     
            
        
        
        /*this.children.messages = new Array<Message>;
        this.props.messages.forEach((message)=>{
            this.children.messages.push(
                new Message({text: message.text, 
                            time: message.time, 
                            class: "chat-content__messages__messag"})) });  */     

    }

    public render(): DocumentFragment{
        //this.children.userSearch = new UserSearch({});
        console.log("render content state : " + this.props.contentState);

        switch(this.props.contentState){
            case ChatContentState.CHAT_CREATED:
                //this.children.userSearch = new UserSearch({});
                console.log("created chat");
                this.props.message = "Please add user to chat";
                if(this.children.userSearch instanceof UserSearch){
                    //this.children.userSearch.hide();
                }
                if(this.children.messageInput instanceof MessageInput){
                    this.children.messageInput.hide();
                }
                break;
                //todo hide chat messages
            case ChatContentState.ADD_USER:
                console.log("add user");
                //this.children.userSearch = new UserSearch({});
                if(!(this.children.userSearch instanceof UserSearch)){
                    console.log(234234);
                    this.children.userSearch = new UserSearch({});
                    this.children.addUserButton1 = new ImageButton({
                        iconClass:"fa-solid fa-ellipsis-vertical", 
                        type: "button",
                        events:{
                            click: ()=>{ chatController.showUserSearch(); }
                        }});  
                    this.props.messageEr = "test";
                    console.log(23);
                    console.log(this.children);
                }else{
                    console.log(2343);
                    this.children.userSearch.show();
                }
                this.props.message = "";
                if(this.children.messageInput instanceof MessageInput){
                    this.children.messageInput.hide();
                }
                //todo hide chat messages
                break;
            case ChatContentState.CHAT_MESSAGES:
                //this.children.userSearch = new UserSearch({});
                console.log("messages");
                if(!(this.children.messageInput instanceof MessageInput)){
                    this.children.messageInput = new MessageInput({});
                }else{
                    this.children.messageInput.show();
                }                
                this.props.message = "";
                if(this.children.userSearch instanceof UserSearch){
                   // this.children.userSearch.hide();
                }
                //todo show messages
                break;  
            default:
                console.log("default");
                //this.children.userSearch = new UserSearch({});
                break;              
        }

       return this.compile(chatContent);
    }
}

export default ChatContent;
 