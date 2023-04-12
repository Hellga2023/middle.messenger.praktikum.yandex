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
    selectedChatId: number|null;
    chats?: ChatInfoModel[];    
    
    /* childrens */
    chatItems?: ChatItem[];
    
}
class ChatList extends Block<IChatListProps> {
    constructor(props:IChatListProps) {
        super(props);
        store.on(StoreEvents.Updated, () => { 
            try{
                //make rerender only if selectedChatId is updated or error need to show
               let state =  store.getState().chat; 
               this.setProps({selectedChatId: state.selectedChatId, chats: state.chatList.chats, isLoading: state.chatList.isLoading});//todo check             
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
        console.log(this.props.chatItems);

        let chats = new Array<ChatItem>();

        this.props.chats?.forEach((element : any)=>{  //chatInfoModel    
            chats.push(new ChatItem({
                id: element.id, 
                title: element.title, 
                lastMessage: element.last_message.content,
                avatar: element.avatar,
                date: new Date(element.last_message.time),
                unreadCount: element.unread_count,
                selectedClass: (element.id == this.props.selectedChatId) ? "chat-item_selected" : ""
            }));
        });
        this.children.chatItems = chats;

       return this.compile(chatList);
    }
}

export default ChatList;
 