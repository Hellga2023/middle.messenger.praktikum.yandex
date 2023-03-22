import button from './button.tmpl';
import './button.css';
import Block from '../../blocks/block';

class Button extends Block {
    constructor(props) {
        props.type = props.type||"submit";
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(button);
    }

}

export default Button;
