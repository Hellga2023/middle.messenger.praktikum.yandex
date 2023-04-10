import Block, {IProps} from "../../block/block";

export interface IInputProps extends IProps{
    name:string;
    type?: string;
    value?:string;
    placeholder?:string;
    isDisabled?: boolean;
}

class Input extends Block<IInputProps>{
    constructor(props:IInputProps){
        super(props, "input");
    }

    public init(): void {
        this.element?.setAttribute("type", this.props.type || "text");
        this.element?.setAttribute("name", this.props.name);
        this.props.placeholder && this.element?.setAttribute("placeholder", this.props.placeholder);              
    }

    public render(): DocumentFragment{        
        if(this.props.value){
            (this.element as HTMLInputElement).value = this.props.value;
        }
        if(typeof this.props.isDisabled !== "undefined") {this.setDisabled(this.props.isDisabled)};
        return this.compile("");
    }

    public setDisabled(isDisabled:boolean){
        if(isDisabled){
            this.element?.setAttribute("disabled", "disabled");
        }else{
            this.element?.removeAttribute("disabled");
        }
    }

}

export default Input;
