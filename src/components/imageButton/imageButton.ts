import Block,{IProps} from "../../block/block";

const button =`<i class="{{class_}}"></i>`;

interface IButtonProps extends IProps{
    type?:string;
}

class Button extends Block<IButtonProps> {
    constructor(props:IButtonProps) {
        super('button', props);
    }

    init(): void {
        this.element?.setAttribute("type", this.props.type||"submit");
    }

    public render(): DocumentFragment{
       return this.compile(button);
    }
}

export default Button;
