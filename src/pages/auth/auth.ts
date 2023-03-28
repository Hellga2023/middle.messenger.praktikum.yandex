import auth from './auth.tmpl';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Auth_Input from '../../components/auth_input/auth_input';
import './auth.scss';
import Block from '../../block/block';
import Validation from '../../utils/validation';

interface IAuthProps{
    inputs:any,
    isLoginMode: boolean,
    btn:any,
    link:any
}

class Auth extends Block<IAuthProps>{

    constructor(data:IAuthProps) {
        let params, 
        inputs:Array<Auth_Input> = new Array<Auth_Input>;
    
        data.inputs.forEach((element:any) => {

            let validateFn = Validation.chooseMethod(element.name);
            
            inputs.push(new Auth_Input({...element, events:{
                focusout: (event:Event) => {
                    const element = event.target as HTMLInputElement,
                          result = validateFn(element.value);    
                    element.classList[result.isValid?"remove":"add"](Validation.ERROR_CLASS);
                    const infoComponent = this.children.inputs.find((el:any) => { return el.props.name === element.name; });
                    infoComponent.setProps({errorMessage: result.errorMessage});                    
                },
                focusin: (event:Event) => {
                    const element = event.target as HTMLInputElement,
                          result = validateFn(element.value);    
                    element.classList[result.isValid?"remove":"add"](Validation.ERROR_CLASS);
                    const infoComponent = this.children.inputs.find((el:any) => { return el.props.name === element.name; });
                    infoComponent.setProps({errorMessage: result.errorMessage});                        
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
                    submit: function(event:Event) {
                        event.preventDefault();                        
                        Validation.validateForm(this.element);                     
                    }}
        };

        super('form', params);
    }

    init() {
        //this.children.btn = new Button(this.props.btn);
        //this.children.link = new Link(this.props.link);
        /*
        this.children.inputs = inputs;
        */
    }

    render():DocumentFragment{
        return this.compile(auth);
    }

}

export default Auth;
