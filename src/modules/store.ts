import Block, { IProps } from "../components/block/block";
import EventBus from "../utils/eventbus";
import { ChatInfoModel, MessageDetailsModel, UserInChatModel, UserModel, UserWithAvatarModel } from "../models/models";
import {set} from "../utils/helpers";
import { ChatContentState } from "../components/chatComponents/chatContent/chatContent";
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
      userSavingMessage: string
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
        token: string,
        state: ChatContentState,
        chatUsers: UserInChatModel[], //without me!!!
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
        foundUsers: UserModel[]
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
      user: null
    },
    chat:{
      chatId: null,
      error: "",
      chatList:{
        isLoading: true,
        chats: new Array<ChatInfoModel>, //todo model
      },      
      chatContent:{
        isLoading: false,
        token: "",
        state: ChatContentState.CREATE_CHAT,
        shortUserInfo:{
          avatar: "",
          username: ""
        },
        socket: null,
        message: "",
        messages: new Array<MessageDetailsModel>, //todo make null
        chatUsers: new Array<UserInChatModel>
      },
      addUserToChat:{
        isLoading:false,
        foundUsers: new Array<UserModel>
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
  return (Component: typeof Block) => {
    return class WithStore extends Component<IProps> {
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
