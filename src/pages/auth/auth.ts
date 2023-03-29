import auth from './auth.tmpl';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import AuthInput from '../../components/auth_input/auth_input';
import './auth.scss';
import Block from '../../block/block';
import Validation from '../../utils/validation';

interface IAuthProps{
    inputs:any,
    isLogin: boolean,
    btn:any,
    link:any,
    class?: string,
    events?:any
}

class Auth extends Block<IAuthProps>{

    constructor(data:IAuthProps) {
        let params,
            inputs:Array<AuthInput> = new Array<AuthInput>;
    
        data.inputs.forEach((element:any) => { inputs.push(new AuthInput(element));
            });
        data.class = "auth-form";
        data.inputs = inputs;
        data.events = {
            submit: (event:Event) => {
                event.preventDefault();
                let data = {};
                this.children.inputs.forEach(input => {
                    this.validateInput(input, data);                
                });
                console.log(data); 
            }};
        super('form', data);
    }

    init() {
        this.children.btn = new Button(this.props.btn);
        this.children.link = new Link(this.props.link);
    }

    render():DocumentFragment{
        return this.compile(auth);
    }

    validateInput(inputGroup:Block<any>, data:object):void{
        const input = inputGroup.children.input,
              name = inputGroup.props.name,
              value = (input.element! as HTMLInputElement).value;
        data[name] = value;
        let result = Validation.validateInput(name,value);
        input.element!.classList[result.isValid?"remove":"add"](Validation.ERROR_CLASS);
        inputGroup.children.errorLabel.setProps({text: result.isValid? "":result.errorMessage});
    }

}

export default Auth;
