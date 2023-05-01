import userController from "../../../../controllers/userController";
import { UserInChatModel } from "../../../../models/models";
import Block, { IProps } from "../../../block/block";

export interface IUserToAddProps extends IProps{
    user: UserInChatModel;
    login?: string;
    name?: string;
    avatar?: string;
}

const template = `
<div class="chat-options__user">
    <img class="chat-options__user-avatar" src="{{avatar}}"/>
    <p> {{login}} {{name}} </p>
</div>`;

class UserToDelete extends Block<IUserToAddProps> {

    constructor(props:IUserToAddProps){
        props.login = props.user.login;
        props.name = props.user.first_name;
        props.avatar = userController.getUserAvatarUrl(props.user.avatar);

        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(template);
    }
}

export default UserToDelete;
