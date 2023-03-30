import auth_input from './authInput.tmpl';
import Block from '../../block/block';
import Input, {IInputProps} from '../input/input';
import Label from '../label/label';
import Validation from '../../utils/validation';
import './authInput.scss';

interface IInputGroupProps extends IInputProps{
    label?:string;
}

class AuthInput extends Block<IInputGroupProps> {
    constructor(props:IInputGroupProps) {
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
 
