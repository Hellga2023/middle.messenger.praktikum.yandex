import chatController from "../../../../controllers/chatController";
import { UserInChatModel } from "../../../../models/models";
import { store, withStore } from "../../../../modules/store";
import Block, { IProps } from "../../../block/block";
import UserToDelete from "../userToDelete/userToDelete";

const template = `
<div> 
    <p>Delete user</p>
    {{#each usersToDelete}}
        {{{this}}}
    {{/each}}
</div>`;

interface IDeleteUserListProps extends IProps{
    users?:UserInChatModel[];
    usersToDelete?: UserToDelete[];
}

class DeleteUserListComponent extends Block<IDeleteUserListProps>{
    constructor(props:IDeleteUserListProps){
        super(props);
    }

    public render(): DocumentFragment {
        this.children.usersToDelete = new Array<UserToDelete>(); 
        const chatUsers = store.getState().chat.chatContent.chatUsers;
        chatUsers.forEach(user => {
            this.children.usersToDelete.push(new UserToDelete({user:user, events: {
                click: () =>{
                    chatController.deleteUserFromChat(user.id);
                }
            }}));
        });
        return this.compile(template);
    }
}

const withChatUsers = withStore((state) => ({ ...{users:state.chat.chatContent.chatUsers} }));

const DeleteUserList = withChatUsers(DeleteUserListComponent);

export default DeleteUserList;
