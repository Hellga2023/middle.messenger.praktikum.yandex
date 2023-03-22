import chatItem from './chat_item.tmpl';
import './chat_item.css';
import Block from '../../blocks/block';

/*export const ChatItem = (data) => {    
    return Handlebars.compile(chatItem)(data); 
}*/

class ChatItem extends Block {
    constructor(props) {
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(chatItem);
    }
}

export default ChatItem;
 
