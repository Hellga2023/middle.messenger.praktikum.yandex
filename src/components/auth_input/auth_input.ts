import auth_input from './auth_input.tmpl';
import Block from '../../blocks/block';
import './auth_input.css';

class Auth_Input extends Block {
    constructor(props) {
        if(!props.type) { props.type ="text";}
        super('div', props);
    }

    public render(): DocumentFragment{        
        return this.compile(auth_input);
    }

}

export default Auth_Input;
 
