import button from './button.tmpl';
import './button.scss';
import Block from '../../block/block';

interface IButtonProps{
    type:string;
    text:string;
}

class Button extends Block<IButtonProps> {
    constructor(props:IButtonProps) {
        props.type = props.type||"submit";
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(button);
    }
}

export default Button;
