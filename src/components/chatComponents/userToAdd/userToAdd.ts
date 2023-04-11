import chatController from "../../../controllers/chatController";
import Block, { IProps } from "../../block/block";

export interface IUserToAddProps{
    userId: number;
    login: string;
    name: string;
}

class UserToAdd extends Block<IProps> {

    private _template = ` <div><p> {{login}} {{name}} </p></div>`;

    constructor(props:IProps){
        super(props);
    }

    init(): void {
        this.props.events = {
            click: () =>{
                chatController.addUserToChat(this.props.userId);
            }
        };
    }

    public render(): DocumentFragment {
        return this.compile(this._template);
    }
}

export default UserToAdd;
