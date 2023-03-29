import info_line from './profile_info_line.tmpl';
import './profile_info_line.scss';
import Block from '../../block/block';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
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
        super('div', props);
    }

    public init(): void {
        this.children.errorLabel = new Label({});
        this.children.input = new Input({...this.props, events:{
                blur: (event:Event) => {                    
                    const element = event.target as HTMLInputElement;
                    this.validateInput(element);                 
                },
                focus: (event:Event) => {
                    const element = event.target as HTMLInputElement;
                    this.validateInput(element);     
                }

        }});
    }

    public render(): DocumentFragment{
       return this.compile(info_line);
    }

    private validateInput(element:HTMLInputElement):void{
        const result = Validation.validateInput(element.name, element.value);
        element.classList[result.isValid?"remove":"add"](Validation.ERROR_CLASS);
        this.children.errorLabel.setProps({text: result.isValid? "":result.errorMessage});
    }
}

export default Info;
 
