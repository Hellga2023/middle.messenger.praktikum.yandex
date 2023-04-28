import chatContent from './chatContent.tmpl';
import './chatContent.scss';
import Block, { IProps } from '../../../block/block';
import { withStore } from '../../../../modules/store';
import ChatInfo from '../chatShortInfo/chatShortInfo';
import { spinner } from '../../../commonComponents/spinner/spinner';
import CreateChat from '../../chatOptions/createChat/createChat';
import OptionsContainer from '../../chatOptions/optionsContainer/optionsContainer';
import ChatMessages from '../chatMessages/chatMessages';

export const enum ChatContentState {
    CREATE_CHAT,
    CHAT_MESSAGES
}

interface IChatContentProps extends IProps{    

    state: ChatContentState;

    spinner?: string;
    
    /* children */

    chatInfo?:ChatInfo; //short chat info
    optionsContainer?:OptionsContainer;
    chatMessages?:ChatMessages;
    createChat?:CreateChat;
}

class ChatContentComponent extends Block<IChatContentProps> { //todo withStore store.getState().chat.chatContent
    constructor(props:IChatContentProps) {     
        super(props);
    }

    init(): void {
        this.props.spinner = spinner;        

        /* header section */
        this.children.chatInfo = new ChatInfo({});         
        this.children.optionsContainer = new OptionsContainer({});        

        /* messages section */
        this.children.createChat = new CreateChat({});
        this.children.chatMessages = new ChatMessages({});        
    }

    public render(): DocumentFragment{
       return this.compile(chatContent);
    }
}

const withChatContent = withStore((state)=>({...{
    state:state.chat.chatContent.state  
}}));

const ChatContent = withChatContent(ChatContentComponent);

export default ChatContent;
 