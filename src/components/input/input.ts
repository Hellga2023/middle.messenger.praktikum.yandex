import Block, {IProps} from "../../block/block";

export interface IInputProps extends IProps{
    type?: string;
    name?:string; //todo?
    value?:string;
    placeholder?:string;
}

class Input extends Block<IInputProps>{
    constructor(props:IInputProps){
        super("input", props);
    }

    public init(): void {
        this.element?.setAttribute("type", this.props.type!);
        this.element?.setAttribute("name", this.props.name!);
        this.props.placeholder && this.element?.setAttribute("placeholder", this.props.placeholder);
        if(this.props.value){
            (this.element as HTMLInputElement).value = this.props.value;
        }       
    }

    public render(): DocumentFragment{        
        return this.compile("");
    }

}

export default Input;
