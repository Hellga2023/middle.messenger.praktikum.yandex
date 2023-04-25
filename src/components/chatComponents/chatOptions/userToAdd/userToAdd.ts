import chatController from "../../../../controllers/chatController";
import { UserWithAvatarModel } from "../../../../models/models";
import Block, { IProps } from "../../../block/block";

export interface IUserToAddProps extends IProps{
    user: UserWithAvatarModel;
    login?: string;
    name?: string;
    avatar?: string;
}

const template = ` <div><p> {{login}} {{name}} </p></div>`;

class UserToAdd extends Block<IUserToAddProps> {

    constructor(props:IUserToAddProps){
        props.login = props.user.login;
        props.name = props.user.first_name;
        props.avatar = props.user.avatar;
        super(props);
    }

    init(): void {
        this.props.events = {
            click: () =>{ 
                //todo review this flow
                chatController.addUserToChat(this.props.user);}
        };
    }

    public render(): DocumentFragment {
        return this.compile(template);
    }
}

export default UserToAdd;
