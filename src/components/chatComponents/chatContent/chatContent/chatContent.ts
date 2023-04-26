import chatContent from './chatContent.tmpl';
import './chatContent.scss';
import Block, { IProps } from '../../../block/block';
import { withStore } from '../../../../modules/store';
import ChatInfo from '../chatShortInfo/chatShortInfo';
import { spinner } from '../../../commonComponents/spinner/spinner';
import CreateChat from '../../chatOptions/createChat/createChat';
import OptionsButton from '../../chatOptions/optionsButton/optionsButton';
import ChatMessages from '../chatMessages/chatMessages';

export const enum ChatContentState {
    CREATE_CHAT,
    ADD_USER,
    CHAT_MESSAGES
}

interface IChatContentProps extends IProps{    

    /* state props */
    state: ChatContentState;
    isLoading: boolean;
    
    /* data props */

    addUserToChatMessage?: string; //please add user message
    spinner?: string;
    
    /* children */

    chatInfo?:ChatInfo; //short chat info
    optionsButton?:OptionsButton;

    chatMessages?:ChatMessages;    

    createChat?:CreateChat;
}

class ChatContentComponent extends Block<IChatContentProps> { //todo withStore store.getState().chat.chatContent
    constructor(props:IChatContentProps) {     
        super(props);
    }

    init(): void {

        this.props.spinner = spinner;
        this.props.addUserToChatMessage = "To create a chat or add a user please click this button (⋮)";

        /* header section */
        this.children.chatInfo = new ChatInfo({});         
        this.children.optionsButton = new OptionsButton({});

        this.children.createChat = new CreateChat({});

        /* messages section */
        this.children.chatMessages = new ChatMessages({});        
    }

    public render(): DocumentFragment{
        console.log("in render chat content");
        console
       return this.compile(chatContent);
    }
}

const withChatContent = withStore((state)=>({...{
    state:state.chat.chatContent.state,
    isLoading: state.chat.chatContent.isLoading    
}}));

const ChatContent = withChatContent(ChatContentComponent);

export default ChatContent;
 