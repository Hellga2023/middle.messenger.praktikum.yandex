import login from './login.tmpl';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import AuthInput from '../../components/authInput/authInput';
import './login.scss';
import Block, { IProps } from '../../block/block';
import Validation from '../../utils/validation';
import AuthController from '../../controllers/authController';
import { LoginFormModel } from '../../types/models';
import { withStore } from '../../modules/store';
import { Routes } from '../../routing/router';

interface IAuthProps extends IProps{
    inputs:any,
    isLogin: boolean,
    btn:any,
    link:any
}

class LoginPage extends Block<IAuthProps>{

    constructor(data:IAuthProps) {        

        data.class = "auth-form";
        super(data, 'form');
    }

    init() {
        const inputsData = [
            {label: "Email", type: "text", name: "login"}, 
            {label: "Password", type: "password", name: "password"}
        ];
        let inputs:Array<AuthInput> = new Array<AuthInput>;
        inputsData.forEach((element:any) => { inputs.push(new AuthInput(element)); });
        this.children.btn = new Button({text: "Login"});
        this.children.link = new Link({text:"No account yet?", url: Routes.Signup});
        this.children.inputs = inputs;
        this.children.logout = new Link({text: "Logout", events:{
            click: (event:Event)=>{
                event.preventDefault();
                AuthController.logout();
            }
            }});

        this.props.events = {
            submit: (event:Event) => {
                event.preventDefault();
                let formData = {},
                    isFormValid = true;
                this.children.inputs.forEach((inputGroup:AuthInput) => { 
                    const input = inputGroup.children.input,
                        name = inputGroup.props.name!,
                        value = (input.element! as HTMLInputElement).value;

                        formData[name] = value; 
                        let result = Validation.validateInputInForm(name,value);
                        input.element!.classList[result.isValid?"remove":"add"](Validation.ERROR_CLASS); //todo move from validation
                        inputGroup.children.errorLabel.setProps({text: result.isValid? "":result.errorMessage});

                        if(!result.isValid){
                            isFormValid = false;
                        }
                 });
                 if(isFormValid){
                    AuthController.login(formData as LoginFormModel);
                 }
            }};
    }

    render():DocumentFragment{
        return this.compile(login);
    }
}

const withLogin = withStore((state) => ({ ...state.login }));

const Login = withLogin(LoginPage);

export default Login;
