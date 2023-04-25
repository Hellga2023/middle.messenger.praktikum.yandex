import chatList from './chatList.tmpl';
import Block,{IProps} from '../../../block/block';
import ChatItem from '../chatItem/chatItem';
import { withStore } from '../../../../modules/store';
import { ChatInfoModel } from '../../../../models/models';
import { spinner } from '../../../commonComponents/spinner/spinner';

interface IChatListProps extends IProps{
    /* state props */
    isLoading?: boolean;
    spinner?:string;

    /* data props */
    chatId?: number|null;
    chats?: ChatInfoModel[];    
    
    /* childrens */
    chatItems?: ChatItem[];
    
}
class ChatListComponent extends Block<IChatListProps> {
    constructor(props:IChatListProps) {
        super(props);
    }

    init(): void {
        this.props.isLoading = true;
        this.props.chats = [];
        this.props.spinner = spinner;
    }

    public render(): DocumentFragment{

        let chats = new Array<ChatItem>();

        this.props.chats?.forEach((element : any)=>{  //chatInfoModel    
            chats.push(new ChatItem({
                chatInfo: element,
                selectedClass: (element.id == this.props.chatId) ? "chat-item_selected" : ""
            }));
        });
        this.children.chatItems = chats;

       return this.compile(chatList);
    }
}

const withChatList = withStore((state) => ({ ...state.chat.chatList, ...state.chat.selected }));

const ChatList = withChatList(ChatListComponent);

export default ChatList;
 