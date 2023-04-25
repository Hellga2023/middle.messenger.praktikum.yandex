import chatContent from './chatContent.tmpl';
import './chatContent.scss';
import Block, { IProps } from '../../../block/block';
import ImageButton from '../../../commonComponents/imageButton/imageButton';
import chatController from '../../../../controllers/chatController';
import { store, StoreEvents } from '../../../../modules/store';
import MessageInput from '../messageInput/messageInput';
import ShortUserInfo from '../shortUserInfo/shortUserInfo';
import MessageList from '../messagesList/messagesList';
import { MessageDetailsModel } from '../../../../models/models';
import { spinner } from '../../../commonComponents/spinner/spinner';
import ChatOptions from '../../chatOptions/chatOptions/chatOptions';
import CreateChat from '../../chatOptions/createChat/createChat';

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

    error?: string; //todo do we need this

    //do we need chatId here?
    chatId?: number;

    message?: string; //please add user message
    messages?: MessageDetailsModel[]; 

    spinner?: string;
    
    /* children */

    showOptions?:ImageButton; //shows options modal
    chatOptions?:ChatOptions; //modal with options add/delete user, add avatar

    messageInput?:MessageInput; //to type a message to chat  
    shortUserInfo?:ShortUserInfo; //short chat info
    messageList?:MessageList; // all messages

    createChat?:CreateChat;
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
                    else if(state.selected.chatId){
                        this.setProps({
                            contentState: state.chatContent.state, 
                            isLoading: false, 
                            chatId: state.selected.chatId,
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

        this.children.createChat = new CreateChat({});
        this.children.messageInput = new MessageInput({});
        this.children.shortUserInfo = new ShortUserInfo({}); 
        let state = store.getState();
        //this.children.messageList = new MessageList({messages: this.props.messages, userId: state.user?.id!});   
        this.props.message = "To create a chat or add a user please click this button (⋮)";      
    }

    public render(): DocumentFragment{
        switch(this.props.contentState){
            case ChatContentState.CHAT_MESSAGES:
                let state = store.getState();
                this.children.messageList = new MessageList({messages: this.props.messages, userId: state.user?.id!});                
                break;             
        }

       return this.compile(chatContent);
    }
}

export default ChatContent;
 