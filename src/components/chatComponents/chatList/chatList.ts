import chatList from './chatList.tmpl';
import './chatList.scss';
import Block,{IProps} from '../../block/block';
import ChatItem from '../chatItem/chatItem';

interface IChatListProps extends IProps{
    chats: any[];
    selectedChatId?: number;
}
class ChatList extends Block<IChatListProps> {
    constructor(props:IChatListProps) {
        super(props);
    }

    init(): void {
        let chats = new Array<ChatItem>();

        this.props.chats.forEach((element : any)=>{ //todo any?
            if(element.id == this.props.selectedChatId){ element.class_ = "chat-item_selected"; }
            element.events = {
                click: (event:Event) => {
                    const selectedChatId = (event.target as HTMLElement).dataset.id;
                    const currentChat = this.children.chats.find((chat:any) =>{ return chat.props.id == selectedChatId});
                    this.children.selectedChat.setProps({username : currentChat.props.name});
                    this.children.selectedChat.setProps({avatarUrl : currentChat.props.avatarUrl});
                }
            };  
            chats.push(new ChatItem(element));
        });
        this.children.chats = chats;
    }

    public render(): DocumentFragment{
       return this.compile(chatList);
    }
}

export default ChatList;
 