import auth_input from './auth_input.tmpl';
import Block from '../../block/block';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import Validation from '../../utils/validation';
import './auth_input.scss';

interface IInputProps{
    type:string;
    label:string;
    name:string;
    events?: any;
}

class AuthInput extends Block<IInputProps> {
    constructor(props:IInputProps) {
        if(!props.type) { props.type ="text";}
        super('div', props);
    }
    public init(): void {
        this.children.errorLabel = new Label({});
        this.children.input = new Input({...this.props, 
            class : "input-container__input",
            events:{
            blur: (event:Event) => {   
                const element = event.target as HTMLInputElement;
                Validation.validateInput(element, this.children.errorLabel);               
            },
            focus: (event:Event) => {
                const element = event.target as HTMLInputElement;
                Validation.validateInput(element, this.children.errorLabel);    
            }
        }});
    }

    public render(): DocumentFragment{        
        return this.compile(auth_input);
    }

}

export default AuthInput;
 
