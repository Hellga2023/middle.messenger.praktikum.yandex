import info_line from './profileInfoLine.tmpl';
import './profileInfoLine.scss';
import Block from '../../block/block';
import Input from '../input/input';
import Label from '../label/label';
import Validation from '../../utils/validation';

interface IProfileInfoLineProps {
    name: string;
    label:string;
    value:string;
    isDisabled:boolean;
    hasValue:boolean;
    class_: string;
    class?:string;
    type?: string;
}

class Info extends Block<IProfileInfoLineProps> {
    constructor(props:IProfileInfoLineProps) {
        props.hasValue = props.value!='undefined';
        props.class= "info-line__input";
        super(props);
    }

    public init(): void {
        this.children.errorLabel = new Label({});
        this.children.input = new Input({...this.props, events:{
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
       return this.compile(info_line);
    }
}

export default Info;
 
