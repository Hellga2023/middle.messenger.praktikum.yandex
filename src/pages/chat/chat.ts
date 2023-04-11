import chat from './chat.tmpl';
import './chat.scss'; 
import Block, {IProps} from '../../components/block/block';
import ChatItem from '../../components/chatComponents/chatItem/chatItem';
import ChatContent from '../../components/chatComponents/chatContent/chatContent';
import Link from '../../components/commonComponents/link/link';
import Button from '../../components/commonComponents/button/button';
import Input from '../../components/commonComponents/input/input';
import chatController from '../../controllers/chatController';
import { store, StoreEvents } from '../../modules/store';

interface IChatProps extends IProps{
    /* state props */
    isLoading:boolean;
    selectedChatId?:number;
    error: string;

    /* data props */
    chats:any[]; //todo    

    /*children */

    /* selected chat content*/
    chatContent?:ChatContent;
    /* profile link */
    link?: Link;
    /* create new chat */
    createChatBtn?: Button;
    chatTitle?: Input;
}

class Chat extends Block<IChatProps> {
    constructor(data:IChatProps) {
        data.class = "content";
        //todo make select
        data.selectedChatId = undefined;
        super(data, 'main');

        store.on(StoreEvents.Updated, () => { 
            try{
                //todo make rerender only if selectedChatId is updated or error need to show
               let state =  store.getState().chat;   
               if(this.props.selectedChatId!=state.chatContent.chatId){
                    this.setProps({selectedChatId: state.chatContent.chatId})
               }else if(this.props.error!=state.error){
                this.setProps({error: state.error});
               }               
            }catch(err){
                console.log(err);
            }            
        });
    }

    init():void{
        this.children.link = new Link({text:"Profile >", url: "/profile", class_: "grey-text"});
    } 

    render():DocumentFragment{         

        if(this.props.isLoading){
            console.log(1);
            return this.compile(chat);
        }else if(this.props.selectedChatId){
            console.log("selected chat : "+this.props.selectedChatId);

            /* render selected chat control */

            if(!(this.children.chatContent instanceof Chat)){
                this.children.chatContent = new ChatContent({});
            }

            /* todo how to handle select chat in list? */
                        
            if(!Array.isArray(this.children.chats)){
                let chats = new Array<ChatItem>();
    
                this.props.chats.forEach((element : any)=>{ //todo any?
                    /*if(element.id == this.props.selectedChatId){ element.class_ = "chat-item_selected"; }
                    element.events = {
                        click: (event:Event) => {
                            const selectedChatId = (event.target as HTMLElement).dataset.id as unknown as number; //todo is it ok?
                            const currentChat = this.children.chats.find((chat:any) =>{ return chat.props.id == selectedChatId});
                            this.children.selectedChat.setProps({username : currentChat.props.name});
                            this.children.selectedChat.setProps({avatarUrl : currentChat.props.avatarUrl});
                        }
                    };  */
                    chats.push(new ChatItem(element));
                });
                this.children.chats = chats;
            }

        
            //this.children.chatList = new ChatList({chats: this.props.chats, selectedChatId: this.props.selectedChatId});
            
            
        }else{            
            /* this case is called if the page is just opened without selected chat */

            //todo what condition should be to check if all components are inited
            if(!Array.isArray(this.children.chats)){
                let chats = new Array<ChatItem>();
                this.props.chats.forEach((element : any)=>{ //todo any?
                    //if(element.id == this.props.selectedChatId){ element.class_ = "chat-item_selected"; }
                    /*element.events = {
                        click: (event:Event) => {
                            const selectedChatId = (event.target as HTMLElement).dataset.id as unknown as number; //todo is it ok?
                            const currentChat = this.children.chats.find((chat:any) =>{ return chat.props.id == selectedChatId});
                            this.children.selectedChat.setProps({username : currentChat.props.name});
                            this.children.selectedChat.setProps({avatarUrl : currentChat.props.avatarUrl});
                        }
                    };  */
                    chats.push(new ChatItem(element));
                });
                this.children.chats = chats;

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
