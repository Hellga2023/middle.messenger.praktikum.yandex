import Block,{IProps} from "../../block/block";

const button =`<i class="{{iconClass}}"></i>`;

interface IButtonProps extends IProps{
    type?:string;
    disabled?:boolean;
    disabledClass?:string;
}

class ImageButton extends Block<IButtonProps> {
    constructor(props:IButtonProps) {
        super(props, 'button');
    }

    init(): void {
        this.element?.setAttribute("type", this.props.type||"button");
    }

    public render(): DocumentFragment{
        this.getContent()?.classList[this.props.disabled? "add":"remove"](this.props.disabledClass!); //todo union disabled and class        
        return this.compile(button);
    }
}

export default ImageButton;
