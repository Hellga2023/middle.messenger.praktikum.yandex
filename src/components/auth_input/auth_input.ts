import auth_input from './auth_input.tmpl';
import Block from '../../block/block';
import './auth_input.scss';

interface IInputProps{
    type:string;
    label:string;
    name:string;
}

class Auth_Input extends Block<IInputProps> {
    constructor(props:IInputProps) {
        if(!props.type) { props.type ="text";}
        super('div', props);
    }

    public render(): DocumentFragment{        
        return this.compile(auth_input);
    }

}

export default Auth_Input;
 
