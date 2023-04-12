import userController from "../../../controllers/userController";
import { store, StoreEvents } from "../../../modules/store";
import Block, { IProps } from "../../block/block";
import Input from "../../commonComponents/input/input";
import UserToAdd from "../userToAdd/userToAdd";
import userSearch from "./userSearch.tmpl";

interface IUserSearchProps extends IProps{
    users?:any[];
    usersFound?: boolean;
}

class UserSearch extends Block<IUserSearchProps> {
    constructor(props:IUserSearchProps){
        super(props);

        store.on(StoreEvents.Updated, ()=>{
            let users = store.getState().chat.addUserToChat.foundUsers;
            this.setProps({users: users, usersFound: users.length>0});
        });
    }

    init(): void {
        this.children.userSearchInput = new Input({
            type: "search", 
            name:"login_name", 
            class:"chat-content__new-message-block__input", 
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
            this.props.users.forEach((data)=>{
                this.children.userItems.push(new UserToAdd({userId: data.id, login: data.login,name: data.first_name, avatar: data.avatar}));
            });
        }
        return this.compile(userSearch);
    }
}

export default UserSearch;
