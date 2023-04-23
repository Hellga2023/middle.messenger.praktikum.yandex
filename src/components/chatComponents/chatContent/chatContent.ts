import chatContent from './chatContent.tmpl';
import './chatContent.scss';
import Block, { IProps } from '../../block/block';
import ImageButton from '../../commonComponents/imageButton/imageButton';
import UserSearch from '../userSearch/userSearch';
import chatController from '../../../controllers/chatController';
import { store, StoreEvents } from '../../../modules/store';
import MessageInput from '../messageInput/messageInput';
import ShortUserInfo from '../shortUserInfo/shortUserInfo';
import MessageList from '../messagesList/messagesList';
import { MessageDetailsModel } from '../../../models/models';
import { spinner } from '../../commonComponents/spinner/spinner';
import Input from '../../commonComponents/input/input';
import Button from '../../commonComponents/button/button';
import ChatOptions from '../chatOptions/chatOptions';


export const enum ChatContentState {
    CREATE_CHAT,
    ADD_USER,
    CHAT_MESSAGES
}

interface IChatContentProps extends IProps{    

    /* state props */
    contentState: ChatContentState;
    isLoading: boolean;
    
    /* data props */

    error?: string;

    //do we need chatId here?
    chatId?: number;

    message?: string; //please add user message
    messages?: MessageDetailsModel[]; 

    spinner?: string;
    
    /* children */

    /* create new chat */
    createChatBtn?: Button;
    chatTitle?: Input;

    showOptions?:ImageButton; //shows user search to add user to chat
    chatOptions?:ChatOptions; //modal with buttons

    messageInput?:MessageInput; //to type a message to chat  
    shortUserInfo?:ShortUserInfo;
    messageList?:MessageList;

    
    userSearch?: UserSearch; //list of users to add to chat
}

class ChatContent extends Block<IChatContentProps> { //todo withStore store.getState().chat.chatContent
    constructor(props:IChatContentProps) {     
        super(props);
        store.on(StoreEvents.Updated, () => { 
            try{
                let state = store.getState().chat;             

                if(state.chatContent.isLoading){
                    if(this.props.isLoading){
                        return;
                    }else{
                        this.setProps({isLoading: state.chatContent.isLoading});
                    }
                }else{
                    if(state.error){
                        this.setProps({error: state.error});
                        return;
                       }

                    if(state.chatContent.message){
                        const messages = this.props.messages;
                        messages?.push(state.chatContent.message);
                        this.setProps({messages: messages });
                    }
                    else if(state.chatId){
                        this.setProps({
                            contentState: state.chatContent.state, 
                            isLoading: false, 
                            chatId: state.chatId,
                            messages: state.chatContent.messages
                        });
                    }
                    else{
                        this.setProps({contentState: state.chatContent.state, isLoading: state.chatContent.isLoading });
                    }
                }  
            }catch(err){ console.log(err); }            
        });}

    init(): void {

        this.props.spinner = spinner;
        this.props.messages = new Array<MessageDetailsModel>();        

        this.children.showOptions = new ImageButton({
            class: "chat-content__user__button",
            iconClass:"fa-solid fa-ellipsis-vertical", 
            type: "button",
            events:{
                click: ()=>{ 
                    if(this.props.chatId){
                        this.children.chatOptions.getContent().showModal(); 
                    }else{
                        console.log("no chat id");
                    }                    
                }
            }});   

        this.children.chatOptions = new ChatOptions({});

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
            this.children.chatTitle = new Input({name: "title", placeholder: 'chat title'});
    }

    public render(): DocumentFragment{
        console.log("render content state : " + this.props.contentState);

        switch(this.props.contentState){
            case ChatContentState.CREATE_CHAT:
                // create new chat screen 
                this.children.createChatBtn.show();
                this.children.chatTitle.show();
                break;
            case ChatContentState.ADD_USER:
                console.log("created chat");
                this.props.message = "Please add user to chat";
                //hide messages state
                if(this.children.messageInput instanceof MessageInput){
                    this.children.messageInput.hide();
                }
                //hide create chat state
                this.children.createChatBtn.hide();
                this.children.chatTitle.hide();
                break;
                //todo hide chat messages
            case ChatContentState.CHAT_MESSAGES:
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
                let state = store.getState();
                this.children.messageList = new MessageList({messages: this.props.messages, userId: state.user?.id!});
                this.children.createChatBtn.hide();
                this.children.chatTitle.hide();
                break;             
        }

       return this.compile(chatContent);
    }
}

export default ChatContent;
 