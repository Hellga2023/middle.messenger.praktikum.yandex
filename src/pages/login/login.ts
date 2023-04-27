import login from './login.tmpl';
import Button from '../../components/commonComponents/button/button';
import Link from '../../components/commonComponents/link/link';
import './login.scss';
import Block, { IProps } from '../../components/block/block';
import AuthController from '../../controllers/authController';
import { LoginFormModel } from '../../models/models';
import { withStore } from '../../modules/store';
import router, { Routes } from '../../routing/router';
import ValidatableInput, { IValidatableInputProps } from '../../components/commonComponents/validatableInput/validatableInput';

interface ILoginProps extends IProps{
    /* children */
    inputs:ValidatableInput[],    
    btn:Button,
    link:Link
}

class LoginPage extends Block<ILoginProps>{

    constructor(data:ILoginProps) {        

        data.class = "auth-form";
        super(data, 'form');
    }

    init() {
        const inputsData = [
            {label: "Email", type: "text", name: "login"}, 
            {label: "Password", type: "password", name: "password"}
        ];
        let inputs:Array<ValidatableInput> = new Array<ValidatableInput>;
        inputsData.forEach((info:any) => {  
            let props = {
                labelText: info.label,
                labelClass: "input-container__label",
                divClasses: ["input-container"],
                errorLabelClass: "input-container__errorlabel",
                inputProps: {
                    name:info.name,
                    type: info.type,
                    class:  "input-container__input"
                }
            } as IValidatableInputProps;
        inputs.push(new ValidatableInput(props)); });
        
        this.children.btn = new Button({text: "Login"});
        this.children.link = new Link({text:"No account yet?", url: Routes.SIGNUP, router: router});
        this.children.inputs = inputs;
        

        this.props.events = {
            submit: (event:Event) => {
                event.preventDefault();
                let formData = {},
                    isFormValid = true;

                this.children.inputs.forEach((validatableInput:ValidatableInput) => {
                    let isValid = validatableInput.validateInForm(formData);
                    if(!isValid){ isFormValid = false; }
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
