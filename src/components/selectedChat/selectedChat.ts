import selectedChat from './selectedChat.tmpl';
import Block, { IProps } from '../../block/block';

interface ISelectedChatProps extends IProps{
    username?:string; //todo?
    avatarUrl?:string;
}

class SelectedChat extends Block<ISelectedChatProps> {
    constructor(props:ISelectedChatProps) {
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(selectedChat);
    }
}

export default SelectedChat;
 