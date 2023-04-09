import Block, {IProps} from "../../block/block";

export interface IInputProps extends IProps{
    type?: string;
    name:string; //todo?
    value?:string;
    placeholder?:string;
    isDisabled: boolean;
}

class Input extends Block<IInputProps>{
    constructor(props:IInputProps){
        super(props, "input");
    }

    public init(): void {
        this.element?.setAttribute("type", this.props.type || "text");
        this.element?.setAttribute("name", this.props.name);
        if(this.props.isDisabled) {this.element?.setAttribute("disabled", "disabled")};
        this.props.placeholder && this.element?.setAttribute("placeholder", this.props.placeholder);
              
    }

    public render(): DocumentFragment{        
        if(this.props.value){
            (this.element as HTMLInputElement).value = this.props.value;
        } 
        return this.compile("");
    }

}

export default Input;
