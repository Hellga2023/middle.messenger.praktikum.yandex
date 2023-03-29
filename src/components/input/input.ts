import Block from "../../block/block";

interface IInputProps{
    class?: string;
    type?: string;
    name:string;
    events?: any;
    value?:string;
}

class Input extends Block<IInputProps>{
    constructor(props:IInputProps){
        super("input", props);
    }

    public init(): void {
        this.element?.setAttribute("type", this.props.type!);
        this.element?.setAttribute("name", this.props.name);
        if(this.props.value){
            (this.element as HTMLInputElement).value = this.props.value;
        }       
    }

    public render(): DocumentFragment{        
        return this.compile("");
    }

}

export default Input;
