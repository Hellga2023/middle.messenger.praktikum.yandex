import Block,{IProps} from "../../block/block";

const button =`<i class="{{iconClass}}"></i>`;

interface IButtonProps extends IProps{
    type?:string;
}

class ImageButton extends Block<IButtonProps> {
    constructor(props:IButtonProps) {
        super(props, 'button');
    }

    init(): void {
        this.element?.setAttribute("type", this.props.type||"button");
    }

    public render(): DocumentFragment{
       return this.compile(button);
    }
}

export default ImageButton;
