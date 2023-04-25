import chatList from './chatList.tmpl';
import Block,{IProps} from '../../../block/block';
import ChatItem from '../chatItem/chatItem';
import { store, StoreEvents } from '../../../../modules/store';
import { ChatInfoModel } from '../../../../models/models';

interface IChatListProps extends IProps{
    /* state props */
    isLoading?: boolean;

    /* data props */
    selectedChatId?: number|null;
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

               //todo  (chat.chatContent.messages) -> request whole chat list on new messages receive or send
               //or may be update only chat with id == messages of that socket?
               //can we map this shortly??
               if(this.props.selectedChatId!==state.chatId || 
                this.props.chats?.length!==state.chatList.chats?.length || 
                this.props.isLoading!==state.chatList.isLoading){
                    console.log("in list refresh");                    
                    this.setProps({selectedChatId: state.chatId, chats: state.chatList.chats, isLoading: state.chatList.isLoading});  
               }                          
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

        let chats = new Array<ChatItem>();

        this.props.chats?.forEach((element : any)=>{  //chatInfoModel    
            chats.push(new ChatItem({
                chatInfo: element,
                selectedClass: (element.id == this.props.selectedChatId) ? "chat-item_selected" : ""
            }));
        });
        console.log(chats);
        this.children.chatItems = chats;

       return this.compile(chatList);
    }
}

export default ChatList;
 