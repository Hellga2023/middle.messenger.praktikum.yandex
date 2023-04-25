import chatController from "../../../../controllers/chatController";
import { store } from "../../../../modules/store";
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
    usersToDelete?: UserToDelete[];
}

class DeleteUserList extends Block<IDeleteUserListProps>{
    constructor(props:IDeleteUserListProps){
        super(props);
    }

    public init():void{

    }

    public render(): DocumentFragment {
        this.children.usersToDelete = new Array<UserToDelete>(); 
        const chatUsers = store.getState().chat.chatContent.chatUsers;
        console.log("chat users in delete");
        console.log(chatUsers);
        chatUsers.forEach(user => {
            console.log(user);
            this.children.usersToDelete.push(new UserToDelete({user:user, events: {
                click: () =>{
                    //add but not open chat
                    chatController.deleteUserFromChat(user.id);
                    //rerender deleted list or go to initial state if no users?
                    //refresh chat content after deleting user
                }
            }}));
        });
        return this.compile(template);
    }
}

export default DeleteUserList;
