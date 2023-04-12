import chat from './chat.tmpl';
import './chat.scss'; 
import Block, {IProps} from '../../components/block/block';
import ChatContent from '../../components/chatComponents/chatContent/chatContent';
import Link from '../../components/commonComponents/link/link';
import Button from '../../components/commonComponents/button/button';
import Input from '../../components/commonComponents/input/input';
import chatController from '../../controllers/chatController';
import { store, StoreEvents } from '../../modules/store';
import ChatList from '../../components/chatComponents/chatList/chatList';

interface IChatProps extends IProps{
    /* state props */
    isLoading:boolean;
    selectedChatId?:number;
    error: string;

    /* data props */

    /*children */

    /* selected chat content*/
    chatContent?:ChatContent;
    /* profile link */
    link?: Link;
    /* create new chat */
    createChatBtn?: Button;
    chatTitle?: Input;
    /* chat list */
    chatList?:ChatList;

    //todo chats search!!!
}

class Chat extends Block<IChatProps> {
    constructor(data:IChatProps) {
        data.class = "content";
        //todo make select
        data.selectedChatId = undefined;
        super(data, 'main');
        chatController.getChats();

        store.on(StoreEvents.Updated, () => { 
            try{
                console.log("state.chats1");  
                //todo make rerender only if selectedChatId is updated or error need to show
               let state =  store.getState().chat; 
               console.log("state.chats5");  
               console.log(state.chatList.chats);  

               if(state.error){
                this.setProps({error: state.error});
               }
               //todo is loading state

               /*if(this.props.selectedChatId!=state.chatContent.chatId){
                    this.setProps({selectedChatId: state.chatContent.chatId})
               }else if(this.props.error!=state.error){
                this.setProps({error: state.error});
               }  */             
            }catch(err){
                console.log(err);
            }            
        });
    }

    init():void{
        this.children.link = new Link({text:"Profile >", url: "/profile", class_: "grey-text"});
    } 

    render():DocumentFragment{         

        //todo loading for chat list is separate, move to chat list control??
        if(!(this.children.chatList instanceof ChatList)){
            this.children.chatList = new ChatList({selectedChatId: this.props.selectedChatId});
        }

        if(this.props.isLoading){
            console.log(1);
            return this.compile(chat);
        }else{ 
            if(this.props.selectedChatId){
                console.log("selected chat : "+this.props.selectedChatId);
                /* render chat content control */
                if(!(this.children.chatContent instanceof Chat)){
                    this.children.chatContent = new ChatContent({});
                }
            }         
            else{
                /* create new chat screen */
                this.children.createChatBtn = new Button({text: 'create new chat', type: "button", events:{
                    click: (event:Event)=>{
                        const value = (this.children.chatTitle.element as HTMLInputElement).value;
                        if(value){
                            console.log("value : "+ value);    
                            chatController.createChat(value);
                        }else{
                            console.log("no value")
                        }                   
                    }
                }});
                this.children.chatTitle = new Input({name: "title", placeholder: 'chat title'});
            }  
        }
        return this.compile(chat);
    }
}
export default Chat;
