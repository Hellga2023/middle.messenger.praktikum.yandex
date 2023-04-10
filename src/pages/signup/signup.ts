import './signup.scss';
import signup from './signup.tmpl';
import Button from '../../components/commonComponents/button/button';
import Link from '../../components/commonComponents/link/link';
import Block, { IProps } from '../../components/block/block';
import AuthController from '../../controllers/authController';
import { SignUpFormModel } from '../../models/models';
import { withStore } from '../../modules/store';
import ValidatableInput, { IValidatableInputProps } from '../../components/commonComponents/validatableInput/validatableInput';

interface ISignupProps extends IProps{
    /* calculated props */
    validationError: string,
    /* children */
    inputs: ValidatableInput[],
    btn:Button,
    link:Link
}    

class SignupPage extends Block<ISignupProps>{

    constructor(data:ISignupProps) { 
        data.isLoading = false;
        data.class = "auth-form";      
        data.events = {
                submit: (event:Event) => {
                    event.preventDefault();

                    let formData = {},
                    isFormValid = true;

                    this.children.inputs.forEach((validatableInput:ValidatableInput) => {
                        let isValid = validatableInput.validateInForm(formData);
                        if(!isValid){ isFormValid = false; }
                     });

                     if(isFormValid){
                        AuthController.signup(formData as SignUpFormModel);
                     }     
                }
            };        

        super(data, 'form');
    }

    init() {
        const inputsData = [
            {label: "Email", type: "text", name: "email"}, 
            {label: "Login", type: "text", name: "login"}, 
            {label: "Name", type: "text", name: "first_name"}, 
            {label: "Surname", type: "text", name: "second_name"}, 
            {label: "Phone", type: "text", name: "phone"}, 
            {label: "Password", type: "password", name: "password"},
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
            inputs.push(new ValidatableInput(props));
        });
        this.children.btn = new Button({text: "Sign up"});
        this.children.link = new Link({text:"Login", url: "/"});
        this.children.inputs = inputs;
    }

    render():DocumentFragment{
        return this.compile(signup);
    }
}

const withSignup = withStore((state) => ({ ...state.signup }));

const Signup = withSignup(SignupPage);

export default Signup;
