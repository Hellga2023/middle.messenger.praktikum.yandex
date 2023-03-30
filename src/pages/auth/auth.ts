import auth from './auth.tmpl';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import AuthInput from '../../components/authInput/authInput';
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

        data.class = "auth-form";
        data.events = {
            submit: (event:Event) => {
                event.preventDefault();
                let data = {};
                this.children.inputs.forEach((input:AuthInput) => { Validation.validateInputInForm(input, data); });
                console.log(data); 
            }};
        super('form', data);
    }

    init() {
        let inputs:Array<AuthInput> = new Array<AuthInput>;
        this.props.inputs.forEach((element:any) => { inputs.push(new AuthInput(element)); });
        this.children.btn = new Button(this.props.btn);
        this.children.link = new Link(this.props.link);
        this.children.inputs = inputs;
    }

    render():DocumentFragment{
        return this.compile(auth);
    }
}

export default Auth;
