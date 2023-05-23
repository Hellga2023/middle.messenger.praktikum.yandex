import Block, { IProps } from "../../block/block";
import Validation, { IValidationResult } from "../../../utils/validation";
import Input, { IInputProps } from "../input/input";
import Label from "../label/label";
import validatableInput from "./validatableInput.tmpl";

export interface IValidatableInputProps extends IProps {    
    labelText: string,
    inputProps: IInputProps,    
    labelClass: string,
    divClasses: string[],
    errorLabelClass?: string,
    /* calculated props */
    divClass?: string,
    /* children */
    input?: Input,
    errorLabel?: Label    
}

class ValidatableInput extends Block<IValidatableInputProps> {
    constructor(props:IValidatableInputProps){
        props.divClass = props.divClasses.join(' ');
        super(props);
    }

    init(): void {
        this.children.errorLabel = new Label({});
        this.children.input = new Input({ ...this.props.inputProps,
            events:{
                blur: () => { this.validate(); },
                focus: () => { this.validate(); }
        }});
    }

    public render(): DocumentFragment {
        return this.compile(validatableInput)
    }

    public validate():void{
        let element = this.children.input.element as HTMLInputElement;
        this.setError(Validation.validateInput(element.name, element.value)); 
    }

    public validateInForm(data:Record<string,string>):boolean{
        let element = this.children.input.element as HTMLInputElement,
            result = Validation.validateInput(element.name, element.value);

        this.setError(result); 
        data[element.name] = element.value;
        return result.isValid;
    }

    public setError(result:IValidationResult):void{
        this.children.input.element.classList[result.isValid?"remove":"add"]("error");
        this.children.errorLabel.setProps({text: result.isValid? "":result.errorMessage});
    }

}

export default ValidatableInput;
