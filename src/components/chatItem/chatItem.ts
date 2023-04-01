import chatItem from './chatItem.tmpl';
import './chatItem.scss';
import Block,{IProps} from '../../block/block';

/*interface IChatItemProps{
    type:string;
    text:string;
}*/
class ChatItem extends Block<IProps> {
    constructor(props:IProps) {
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(chatItem);
    }
}

export default ChatItem;
 
