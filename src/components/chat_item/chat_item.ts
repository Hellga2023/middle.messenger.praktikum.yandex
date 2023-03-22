import Handlebars from 'handlebars';
import chatItem from 'bundle-text:./chat_item.hbs';
import './chat_item.css';

export const ChatItem = (data) => {    
    return Handlebars.compile(chatItem)(data); 
}
 
