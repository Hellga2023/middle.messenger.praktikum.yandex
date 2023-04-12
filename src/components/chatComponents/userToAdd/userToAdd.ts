import chatController from "../../../controllers/chatController";
import Block, { IProps } from "../../block/block";

export interface IUserToAddProps extends IProps{
    userId: number;
    login: string;
    name: string;

}

const template = ` <div><p> {{login}} {{name}} </p></div>`;

class UserToAdd extends Block<IUserToAddProps> {

    constructor(props:IUserToAddProps){
        super(props);
    }

    init(): void {
        this.props.events = {
            click: () =>{ chatController.addUserToChat(this.props.userId, this.props.name, this.props.avatar);}
        };
    }

    public render(): DocumentFragment {
        return this.compile(template);
    }
}

export default UserToAdd;
