import chatList from './chatList.tmpl';
import './chatList.scss';
import Block,{IProps} from '../../block/block';
import ChatItem from '../chatItem/chatItem';
import { store, StoreEvents } from '../../../modules/store';
import { ChatInfoModel } from '../../../models/models';

interface IChatListProps extends IProps{
    /* state props */
    isLoading?: boolean;

    /* data props */
    selectedChatId?: number;
    chats?: ChatInfoModel[];    
    
    /* childrens */
    chatItems?: ChatItem[];
    
}
class ChatList extends Block<IChatListProps> {
    constructor(props:IChatListProps) {
        super(props);
        store.on(StoreEvents.Updated, () => { 
            console.log("state.chats2");  
            try{
                //todo make rerender only if selectedChatId is updated or error need to show
               let state =  store.getState().chat; 
               console.log("state.chats3");  
               console.log(state.chatList.chats);  
               console.log(state.chatList.isLoading);  
               this.setProps({selectedChatId: state.chatContent.chatId!, chats: state.chatList.chats, isLoading: state.chatList.isLoading});//todo check             
            }catch(err){
                console.log(err);
            }            
        });
    }

    init(): void {
        this.props.isLoading = true;
        this.props.chats = [];
    }

    public render(): DocumentFragment{
        console.log("in chat list render");

        let chats = new Array<ChatItem>();

        this.props.chats?.forEach((element : any)=>{ //todo any?
            if(element.id == this.props.selectedChatId){ element.class_ = "chat-item_selected"; }
            element.events = {
                click: (event:Event) => {
                    const selectedChatId = (event.target as HTMLElement).dataset.id;
                    const currentChat = this.children.chats.find((chat:any) =>{ return chat.props.id == selectedChatId});
                }
            };  
            chats.push(new ChatItem({
                id: element.id, 
                title: element.title, 
                lastMessage: element.last_message.content,
                avatar: element.avatar,
                date: new Date(element.last_message.time),
                unreadCount: element.unread_count
            }));
        });
        this.children.chatItems = chats;

       return this.compile(chatList);
    }
}

export default ChatList;
 