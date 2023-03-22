import Handlebars from 'handlebars';
import button from 'bundle-text:./button.hbs';
import './button.css';
import Block from '../../blocks/block';

/*export const Button = (data) => {
    let buttonType = data.type || "submit";
    return Handlebars.compile(button)({ text: data.text, type: buttonType})
};*/

class Button extends Block {
    constructor(props) {
        //console.log("create btn");
        super('div', props);
       // console.log("create btn 2");
    }

    public render(): DocumentFragment{
       // console.log("create btn 3");
        const { text, __id, type } = this.props;
       // console.log("btn id "+__id); 
        //const compiled = Handlebars.compile(button)({ text: text, type: type||"submit"});
        const compiled = this.compile(button, { text: text, type: type||"submit"});
       // console.log(compiled);
        return compiled;
    }

}

export default Button;
