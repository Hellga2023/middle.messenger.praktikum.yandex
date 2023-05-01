import chatContent from './chatContent.tmpl';
import './chatContent.scss';
import Block, { IProps } from '../../../block/block';
import { withStore } from '../../../../modules/store';
import ChatInfo from '../chatShortInfo/chatShortInfo';
import ChatMessages from '../chatMessages/chatMessages';
import OptionsButton from '../../chatOptions/optionsButton/optionsButton';

export const enum ChatContentState {
    CREATE_CHAT,
    CHAT_MESSAGES
}

interface IChatContentProps extends IProps{    

    state: ChatContentState;

    /* children */

    chatInfo?:ChatInfo; //short chat info
    optionsButton?:OptionsButton;
    chatMessages?:ChatMessages;
}

class ChatContentComponent extends Block<IChatContentProps> {
    constructor(props:IChatContentProps) {     
        super(props);
    }

    init(): void {
        /* header section */
        this.children.chatInfo = new ChatInfo({});         
        this.children.optionsButton = new OptionsButton({});        

        /* messages section */
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
 