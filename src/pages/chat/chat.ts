import chat from './chat.tmpl';
import './chat.scss'; 
import Block, {IProps} from '../../components/block/block';
import ChatItem from '../../components/chatComponents/chatItem/chatItem';
import SelectedChat from '../../components/chatComponents/selectedChat/selectedChat';
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
    selectedUsername?:string; // todo remove to separate call
    selectedUserAvatar?:string; // todo remove to separate call
    
}

class Chat extends Block<IChatProps> {
    constructor(data:IChatProps) {
        const selectedChat = data.chats.find((chat:any) =>{ return chat.id == data.selectedChatId});
        data.selectedUsername = selectedChat.name;
        data.selectedUserAvatar = selectedChat.avatarUrl;     
        data.selectedChatMessages = selectedChat.messages;
        data.class = "content";
        data.selectedChatId = undefined;
        super(data, 'main');

        store.on(StoreEvents.Updated, () => { 
            try{
               let state =  store.getState().chat; 
               console.log(state);

               
               if(state.currentChatID){
                this.setProps({selectedChatId: state.currentChatID})
               }else if(state.error){
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

        }else if(this.props.selectedChatId){
            console.log(this.props.selectedChatId);

            /* render selected chat control */

            if(!(this.children.selectedChat instanceof SelectedChat)){
                this.children.selectedChat = new SelectedChat({id: this.props.selectedChatId });
            }else{
                this.children.selectedChat.setProps({id: this.props.selectedChatId});
            }
                        
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
