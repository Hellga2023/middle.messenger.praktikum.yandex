import { store, StoreEvents } from "../../../modules/store";
import Block, { IProps } from "../../block/block";

interface IShortUserInfoProps extends IProps{
    username?:string,
    avatarUrl?: string
}

const template = `<img src="{{avatarUrl}}"/> {{username}}`;

class ShortUserInfo extends Block<IShortUserInfoProps>{
    constructor(props:IShortUserInfoProps){
        super(props);
        store.on(StoreEvents.Updated, ()=>{
            let info = store.getState().chat.chatContent.shortUserInfo;
            this.setProps({username: info.username, avatarUrl: info.avatar});
        })
    }

    init(){
        const state = store.getState().chat.chatContent.shortUserInfo;
        console.log("shortUserInfo in init");
        console.log(state);
        this.props.username = state.username;
        this.props.avatarUrl = state.avatar;
    }

    render(): DocumentFragment {
        return this.compile(template);
    }
}

export default ShortUserInfo;
