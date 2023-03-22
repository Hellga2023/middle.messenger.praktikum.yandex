import auth_input from './auth_input.tmpl';
import Block from '../../blocks/block';
import './auth_input.css';

/*export const Auth_Input = ({name,type, label}) => {
    if(!type) { type ="text";}
    return Handlebars.compile(auth_input)({ name, type, label})
};*/

class Auth_Input extends Block {
    constructor(props) {

        super('div', props);
    }

    public render(): DocumentFragment{
        
        const { name, label , __id, type } = this.props;
        
        //const compiled = Handlebars.compile(auth_input)({ name, type, label});
        
        const compiled = this.compile(auth_input, { name, type, label});
        return compiled;
    }

}

export default Auth_Input;
 
