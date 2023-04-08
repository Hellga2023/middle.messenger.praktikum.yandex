import './button.scss';
import Block, { IProps } from '../../block/block';

interface IButtonProps extends IProps{
    type?:string;
    text:string;    
}

const button =`<button type="{{type}}" class="button">{{text}}</button>`;

class Button extends Block<IButtonProps> {
    constructor(props:IButtonProps) {
        props.type = props.type||"submit";
        super(props);
    }

    public render(): DocumentFragment{
       return this.compile(button);
    }
}

export default Button;
