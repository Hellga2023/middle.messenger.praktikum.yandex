import chat from './chat.tmpl';
import ChatItem from '../../components/chatItem/chatItem';
import SelectedChat from '../../components/selectedChat/selectedChat';
import Link from '../../components/link/link';
import './chat.scss'; 
import Block, {IProps} from '../../block/block';
import ChatList from '../../components/chatList/chatList';

interface IChatProps extends IProps{
    chats:any[]; //todo
    selectedUsername?:string;
    selectedUserAvatar?:string;
    selectedChatId?:number;
}

class Chat extends Block<IChatProps> {
    constructor(data:IChatProps) {
        const selectedChat = data.chats.find((chat:any) =>{ return chat.id == data.selectedChatId});
        data.selectedUsername = selectedChat.name;
        data.selectedUserAvatar = selectedChat.avatarUrl;     
        data.selectedChatMessages = selectedChat.messages;
        data.class = "content";
        super(data, 'main');
    }

    init():void{
        this.children.link = new Link({text:"Profile >", url: "/profile", class_: "grey-text"});
        
        //this.children.chatList = new ChatList({chats: this.props.chats, selectedChatId: this.props.selectedChatId});
        this.children.selectedChat = new SelectedChat({
            username:this.props.selectedUsername, 
            avatarUrl:this.props.selectedUserAvatar,
            messages: this.props.selectedChatMessages as Array<any>
        });
        let chats = new Array<ChatItem>();

        this.props.chats.forEach((element : any)=>{ //todo any?
            if(element.id == this.props.selectedChatId){ element.class_ = "chat-item_selected"; }
            element.events = {
                click: (event:Event) => {
                    const selectedChatId = (event.target as HTMLElement).dataset.id as unknown as number; //todo is it ok?
                    const currentChat = this.children.chats.find((chat:any) =>{ return chat.props.id == selectedChatId});
                    this.children.selectedChat.setProps({username : currentChat.props.name});
                    this.children.selectedChat.setProps({avatarUrl : currentChat.props.avatarUrl});
                }
            };  
            chats.push(new ChatItem(element));
        });
        this.children.chats = chats;
    } 

    render():DocumentFragment{
        return this.compile(chat);
    }
}
export default Chat;
