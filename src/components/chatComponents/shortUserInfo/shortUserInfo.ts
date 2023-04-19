import { store, StoreEvents } from "../../../modules/store";
import Block, { IProps } from "../../block/block";
import avatarImg from '../../../../static/defaultAvatar.png';

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
            if(users!=null){
                let user = users[0]; //todo if users are more than 1 in chat compile avatar
                this.setProps({username: user.first_name, avatarUrl: user.avatar || avatarImg });
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
