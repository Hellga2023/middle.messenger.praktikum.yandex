import Block from "../../block/block";

interface ILabelProps{
    class?: string;
    text?:string;
}

class Input extends Block<ILabelProps>{
    constructor(props:ILabelProps){
        props.class = "input-container__errorlabel";
        super(props,"label");
    }

    public init(): void {
        
    }

    public render(): DocumentFragment{       
        this.element!.textContent = this.props.text; 
        return this.compile("");
    }

}

export default Input;
