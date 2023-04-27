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
      editMode: boolean,
      userSavingMessage: string,
      avatarSavingMessage: string
    },
    chat:{
      error: string, //get token error, create chat error
      chatId: number|null,      
      chatList: {
        isLoading: boolean,
        chats: ChatInfoModel[]
      },
      chatContent: {
        //todo separate a chat selected values and chat create values
        isLoading: boolean,
        state: ChatContentState,
        chatUsers: UserInChatModel[], //without me!!!        
        shortUserInfo:{ //from chat users
          avatar: string,
          username: string
        },
        token: string,        
        socket: WebSocketService|null,
        //message: string,
        //messages: MessageDetailsModel[]//|null //todo, this is array of old messages
      },
      chatMessages:{
        isLoading: boolean,
        messages: MessageDetailsModel[]
      },  
      chatOptions:{
        isLoading: boolean        
      },
      addUserToChat:{
        isLoading: boolean,
        foundUsers: UserWithAvatarModel[]
      },
      setAvatar:{
        avatarSaveMessage: string
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
      avatarSavingMessage: ""
    },
    chat:{      
      chatId: null,      
      error: "",
      chatMessages:{
        isLoading: false,
        messages: new Array<MessageDetailsModel>
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
        state: 0,//ChatContentState.CREATE_CHAT, todo wtf???
        chatUsers: new Array<UserInChatModel>,
        shortUserInfo:{
          avatar: "",
          username: ""
        },
        token: "",
        socket: null,
        //messages: new Array<MessageDetailsModel>, //todo make null        
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
