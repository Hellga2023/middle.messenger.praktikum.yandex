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
        data.events = {submit:function(event:Event){
            event.preventDefault();
            Validation.validateForm(event.target as HTMLFormElement);
        }}
        super('form', data);
    }

    init() {
        console.log("page init");
        console.log(this.children);
        console.log(this.props);
        this.children.btn = new Button({...this.props.btn, events:{
            click: function(event:Event){
                console.log("click");
                console.log(this.children);

                /*this.children.inputs.forEach((input:any) => {
                    this.validateInput(input);
                });   */
            }
        }});
        this.children.link = new Link(this.props.link);
    }

    render():DocumentFragment{
        return this.compile(auth);
    }

    validateInput(input:Block<any>):void{
        let result = Validation.validateInput(input.props.name,input.props.value);
        input.element!.classList[result.isValid?"remove":"add"](Validation.ERROR_CLASS);
        input.setProps({errorMessage: result.errorMessage});
    }

}

export default Auth;
