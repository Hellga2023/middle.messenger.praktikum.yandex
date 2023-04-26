import Block, { IProps } from "../components/block/block";
import EventBus from "../utils/eventbus";
import { ChatInfoModel, MessageDetailsModel, UserInChatModel, UserModel, UserWithAvatarModel } from "../models/models";
import {set} from "../utils/helpers";
import { ChatContentState } from "../components/chatComponents/chatContent/chatContent/chatContent";
import WebSocketService from "../utils/websocketService";

export enum StoreEvents {
    Updated = 'updated',
  }

export type State = {
    //userId: number|null,
    user: UserWithAvatarModel | null,
    signup:{
      isLoading: boolean,
      validationError: string
    },
    login:{
      isLoading: boolean,
      validationError: string
    },
    profile:{
      isLoading: boolean,
      user: null | UserWithAvatarModel,
      editMode: boolean,
      userSavingMessage: string,
      avatarSavingMessage: string
    },
    chat:{
      error: string, //get token error, create chat error
      selected:{
        chatId: number|null, ///todo!!! do not need this if we can create anon objects!!!
      },
      chatList: {
        isLoading: boolean,
        chats: ChatInfoModel[]
      },
      chatOptions:{
        isLoading: boolean        
      },
      users: {
        chatUsers: UserInChatModel[]
      },
      setAvatar:{
        avatarSaveMessage: string
      },
      chatContent: {
        //todo separate a chat selected values and chat create values
        isLoading: boolean,
        token: string,
        state: ChatContentState,
        //chatUsers: UserInChatModel[], //without me!!!
        shortUserInfo:{
          avatar: string,
          username: string
        },
        socket: WebSocketService|null,
        message: string,
        messages: MessageDetailsModel[]//|null //todo, this is array of old messages
      },      
      /* add user to chat control */
      addUserToChat:{
        isLoading: boolean,
        foundUsers: UserWithAvatarModel[]
      }
    }
}
  
const initialState: State = {
    //userId: null,
    user: null,
    signup:{
      isLoading: false,
      validationError: ""
    },
    login:{
      isLoading: false,
      validationError: ""
    },
    profile:{
      editMode: false,
      isLoading: false, //all loading set to true and then check when it can be set to false
      userSavingMessage: "",
      avatarSavingMessage: "",
      user: null
    },
    chat:{
      selected:{
        chatId: null,
      },
      error: "",
      users: {
        chatUsers:new Array<UserInChatModel>
      },
      chatList:{
        isLoading: true,
        chats: new Array<ChatInfoModel>, //todo model
      },      
      chatOptions:{
        isLoading: false        
      },
      setAvatar:{
        avatarSaveMessage: ""
      },
      chatContent:{
        isLoading: false,
        token: "",
        state: 0,//ChatContentState.CREATE_CHAT, todo wtf???
        shortUserInfo:{
          avatar: "",
          username: ""
        },
        socket: null,
        message: "",
        messages: new Array<MessageDetailsModel>, //todo make null        
      },
      addUserToChat:{
        isLoading:false,
        foundUsers: new Array<UserWithAvatarModel>
      }
    }    
};

class Store extends EventBus{
    
  private state:State = initialState;
  
  public getState() {
    return this.state;
  }
  
  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  };
} 

const store = new Store();

export const withStore = (mapStateToProps: (state: State) => any) => {
  return (Component: typeof Block<any>) => {
    type Props = typeof Component extends typeof Block<infer P> ? P : any;
    return class WithStore extends Component {
      constructor(props: IProps) {
        const mappedState = mapStateToProps(store.getState());

        super({ ...props, ...mappedState });
  
        store.on(StoreEvents.Updated, () => {          
          const newMappedState = mapStateToProps(store.getState());      
          this.setProps(newMappedState);
        });
      }
    }
  }
}

export { store };
