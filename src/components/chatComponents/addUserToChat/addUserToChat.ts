import Block, { IProps } from "../../block/block";
import ImageButton from "../../commonComponents/imageButton/imageButton";
import addUserToChat from "./addUserToChat.tmpl";

class AddUserToChat extends Block<IProps> {
    constructor(props:IProps){
        super(props);
    }

    init(): void {
        /*this.children.addUserButton = new ImageButton({iconClass : "fa-regular fa-circle-plus", type: "button", events:{
            click: ()=>{
                
            }
        }});*/
    }

    public render(): DocumentFragment {
        return this.compile(addUserToChat);
    }
}

export default AddUserToChat;
