import auth from './auth.tmpl';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Auth_Input from '../../components/auth_input/auth_input';
import './auth.scss';
import Block from '../../block/block';
import Validation from '../../utils/validation';

interface IAuthProps{
    
}

class Auth extends Block<IAuthProps>{

    constructor(data) {
        let params, 
        inputs:Array<Auth_Input> = new Array<Auth_Input>;
    
        data.inputs.forEach(element => {

            let validateFn = Validation.chooseMethod(element.name);
            
            inputs.push(new Auth_Input({...element, events:{
                focusout: event => {
                    let element = event.target;
                    let isValid = validateFn(element.value);                    
                    event.target.classList[isValid?"remove":"add"](Validation.ERROR_CLASS);
                },
                focusin: event => {
                    let element = event.target;
                    let isValid = validateFn(element.value);                    
                    event.target.classList[isValid?"remove":"add"](Validation.ERROR_CLASS);              
                }
            }}));
            });
    
        params = {
                isLogin: data.isLoginMode, 
                btn:new Button(data.btn), 
                link: new Link(data.link),
                inputs: inputs,
                class: "auth-form",
                events: {
                    submit: function(event) {
                        event.preventDefault();                        
                        Validation.validateForm(this.element);                     
                    }}
        };

        super('form', params);
    }

    init() {
        
        /*
        this.children.inputs = inputs;
        */
    }

    render():DocumentFragment{
        return this.compile(auth);
    }

}

export default Auth;
