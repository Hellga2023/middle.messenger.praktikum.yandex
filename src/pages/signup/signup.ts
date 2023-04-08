import signup from './signup.tmpl';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import AuthInput from '../../components/authInput/authInput';
import Block, { IProps } from '../../block/block';
import Validation from '../../utils/validation';
import AuthController from '../../controllers/authController';
import { SignUpFormModel } from '../../types/models';
import { withStore } from '../../modules/store';

interface ISignupProps extends IProps{
    inputs:any,
    btn:any,
    link:any,
    validationError: string
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
                        AuthController.signup(formData as SignUpFormModel);
                     }       
                }};        

        super(data, 'form');
    }

    init() {
        const inputsData = [
            {label: "Email", type: "text", name: "email", error: "Invalid email" }, 
            {label: "Login", type: "text", name: "login", error: "Invalid login"}, 
            {label: "Name", type: "text", name: "first_name", error: "Invalid name"}, 
            {label: "Surname", type: "text", name: "second_name", error: "Invalid surname"}, 
            {label: "Phone", type: "text", name: "phone", error: "Invalid phone"}, 
            {label: "Password", type: "password", name: "password", error: "Invalid password"},
        ];
        let inputs:Array<AuthInput> = new Array<AuthInput>;
        inputsData.forEach((element:any) => { inputs.push(new AuthInput(element)); });
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
