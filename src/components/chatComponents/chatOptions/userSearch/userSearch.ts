import userController from "../../../../controllers/userController";
import { store, StoreEvents } from "../../../../modules/store";
import Block, { IProps } from "../../../block/block";
import Input from "../../../commonComponents/input/input";
import UserToAdd from "../userToAdd/userToAdd";
import userSearch from "./userSearch.tmpl";
import "./userSearch.scss";
import { UserWithAvatarModel } from "../../../../models/models";

interface IUserSearchProps extends IProps{
    users?:UserWithAvatarModel[];
    usersFound?: boolean;
    userSearchInput?:Input;
}

class UserSearch extends Block<IUserSearchProps> {
    constructor(props:IUserSearchProps){
        super(props);

        store.on(StoreEvents.Updated, ()=>{
            const users = this._filterUsersToAdd();
            this.setProps({users: users, usersFound: users.length>0});
        });
    }

    init(): void {
        this.children.userSearchInput = new Input({
            type: "search", 
            name:"login_name", 
            class:"new-message-block__input", //move to chat content or create mixin??
            events: {
                keyup: (event:Event) => {
                    if((event as KeyboardEvent).key === 'Enter'){ //todo add button!
                        userController.searchUserByLogin((event.target as HTMLInputElement).value);
                    }
                }
            }
        });    
    }

    public render(): DocumentFragment {
        if(this.props.usersFound){
            this.children.userItems = new Array<UserToAdd>();
            this.props.users?.forEach((data:UserWithAvatarModel)=>{
                this.children.userItems.push(new UserToAdd({user: data}));
            });
        }
        return this.compile(userSearch);
    }

    public reset(){
        this.setProps({ users: []});
        this.children.userSearchInput.setProps({value: ""});
    }

    private _filterUsersToAdd(){
        let state = store.getState().chat,
            users = state.chatOptions.addUserToChat.foundUsers,
            chatUsers = state.chatContent.chatUsers;
        return users.filter(user => !chatUsers.find(u => u.id === user.id));
    }
}

export default UserSearch;
