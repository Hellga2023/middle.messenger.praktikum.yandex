import chatController from "../../../../controllers/chatController";
import { UserInChatModel } from "../../../../models/models";
import Block, { IProps } from "../../../block/block";

export interface IUserToAddProps extends IProps{
    user: UserInChatModel;
    login?: string;
    name?: string;
    avatar?: string;
}

const template = `<div class="chat-options__delete-user"><img src="{{avatar}}"/><p>  {{login}} {{name}} </p></div>`;

class UserToDelete extends Block<IUserToAddProps> {

    constructor(props:IUserToAddProps){
        props.login = props.user.login;
        props.name = props.user.first_name;
        props.avatar = props.user.avatar;

        super(props);
    }

    init(): void {
        /*this.props.events = {
            click: () =>{ 
                //add but not open chat
                chatController.deleteUserFromChat(this.props.user.id);
            }
        };*/
    }

    public render(): DocumentFragment {
        return this.compile(template);
    }
}

export default UserToDelete;
