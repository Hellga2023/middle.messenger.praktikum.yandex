import Block, {IProps} from "../../block/block";

export interface IMessageProps extends IProps{
    text:string;
    time:string;
}

const message =`{{text}}<p>{{time}}</p>`;

class Message extends Block<IMessageProps>{
    constructor(props:IMessageProps){
        super(props);
    }

    public init(): void {
        
    }

    public render(): DocumentFragment{        
        return this.compile(message);
    }

}

export default Message;
