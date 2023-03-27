import chatItem from './chat_item.tmpl';
import './chat_item.scss';
import Block from '../../block/block';

interface IChatItemProps{
    type:string;
    text:string;
}

class ChatItem extends Block<IChatItemProps> {
    constructor(props:IChatItemProps) {
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(chatItem);
    }
}

export default ChatItem;
 
