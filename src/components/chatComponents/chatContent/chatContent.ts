import chatContent from './chatContent.tmpl';
import './chatContent.scss';
import Block, { IProps } from '../../block/block';
import ImageButton from '../../commonComponents/imageButton/imageButton';
import UserSearch from '../userSearch/userSearch';
//import Message from '../message/message';
import chatController from '../../../controllers/chatController';
import { store, StoreEvents } from '../../../modules/store';
import MessageInput from '../messageInput/messageInput';
import ShortUserInfo from '../shortUserInfo/shortUserInfo';

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

    //do we need chatId here?
    chatId: number;

    message?: string; //please add user message
    messages?: string[]; //Array<any>;

    /* children */
    addUserButton?:ImageButton; //shows user search to add user to chat

    messageInput?:MessageInput; //to type a message to chat  
    shortUserInfo?:ShortUserInfo;

    
    userSearch?: UserSearch; //list of users to add to chat
}

class ChatContent extends Block<IChatContentProps> { //todo withStore store.getState().chat.chatContent
    constructor(props:IChatContentProps) {        
        super(props);
        store.on(StoreEvents.Updated, () => { 
            try{
                let state = store.getState().chat;
                console.log(state); // created, add user, messages
                if(state.chatContent.message){
                    const messages = this.props.messages;
                    messages?.push(state.chatContent.message);
                    this.setProps({messages: messages });
                }
                else if(state.selectedChatId){
                    //TODO get messages?
                    console.log("content state : "+state.chatContent.state);
                    console.log("content loading : "+state.chatContent.isLoading);
                    console.log("content messages : "+state.chatContent.messages);
                    this.setProps({
                        contentState: ChatContentState.CHAT_MESSAGES, 
                        isLoading: false, 
                        chatId: state.selectedChatId,
                        messages: state.chatContent.messages
                    });
                }
                else{
                    this.setProps({contentState: state.chatContent.state, isLoading: state.chatContent.isLoading });
                }
            }catch(err){ console.log(err); }            
        });}

    init(): void {

        this.props.contentState = ChatContentState.CHAT_CREATED;
        this.props.messages = new Array<string>();        

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
                    console.log(23);
                    console.log(this.children);
                }else{
                    console.log(2343);
                    console.log(this.children.userSearch);
                    //this.children.userSearch.show();
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
                if(!(this.children.shortUserInfo instanceof ShortUserInfo)){
                    this.children.shortUserInfo = new ShortUserInfo({});
                }else{
                    this.children.shortUserInfo.show();
                }   
                
                this.props.message = "";
                if(this.children.userSearch instanceof UserSearch){
                   this.children.userSearch.hide();
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
 