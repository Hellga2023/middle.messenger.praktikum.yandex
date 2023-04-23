import './avatar.scss';
import Block, { IProps } from '../../block/block';
import Input from '../../commonComponents/input/input';

interface IImageProps extends IProps {
    src: string;    
}

class Image extends Block<IImageProps>{
    constructor(props:IImageProps) {
        props.class = "avatar";
        super(props, "img");
    }

    public init(): void {        
        this.element?.setAttribute("alt", "user avatar");                              
    }

    public render(): DocumentFragment{   
        this.element?.setAttribute("src", this.props.src);   
        return this.compile("");
    }
}

const avatar = `{{{avatarImage}}} {{{input}}}`;

interface IAvatarProps{
    avatarUrl:string;
    isDisabled: boolean;  

    /* children */
    input?:Input;
    avatarImage?:Image;
}

class Avatar extends Block<IAvatarProps> {

    constructor(props:IAvatarProps) {
        super(props, "form");
    }

    public init(): void {
        this.children.input = new Input({
            name: "avatar",
            placeholder: "Avatar photo",
            type: "file",
            class: "avatar-upload"
            //accept="image/*"
        });
        
        this.children.avatarImage = new Image({
            src: this.props.avatarUrl,
            events : {
                click: ()=>{
                    console.log("click");
                    console.log(!this.props.isDisabled);
                    !this.props.isDisabled && this.children.input.element.click();
                }
            }
        });
    }

    public render(): DocumentFragment{        
        return this.compile(avatar);
    }

}

export default Avatar;
