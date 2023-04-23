import { store, StoreEvents } from "../../../modules/store";
import Block, { IProps } from "../../block/block";

import userController from "../../../controllers/userController";

interface IShortUserInfoProps extends IProps{
    username?:string,
    avatarUrl?: string
}

const template = `<img class="chat-content__user__user-info__avatar" src="{{avatarUrl}}"/> <p class="chat-content__user__user-info__username">{{username}}</p>`;

class ShortUserInfo extends Block<IShortUserInfoProps>{
    constructor(props:IShortUserInfoProps){
        props.class ="chat-content__user__user-info";
        super(props);
        store.on(StoreEvents.Updated, ()=>{

            let users = store.getState().chat.chatContent.chatUsers;
            if(users.length>0){
                let user = users[0]; //todo if users are more than 1 in chat compile avatar
                this.setProps({username: user.first_name, avatarUrl: userController.getUserAvatarUrl(user.avatar)});
            }else{
                this.setProps({username: "", avatarUrl: "" });
            }
        })
    }

    init(){
    }

    render(): DocumentFragment {
        return this.compile(template);
    }
}

export default ShortUserInfo;
