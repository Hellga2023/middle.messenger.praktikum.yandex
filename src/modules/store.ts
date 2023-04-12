import Block, { IProps } from "../components/block/block";
import EventBus from "../utils/eventbus";
import { ChatInfoModel, UserModel, UserWithAvatarModel } from "../models/models";
import {set} from "../utils/helpers";
import { ChatContentState } from "../components/chatComponents/chatContent/chatContent";
import WebSocketService from "../utils/websocketService";

export enum StoreEvents {
    Updated = 'updated',
  }

export type State = {
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
      userID: number|null,
      error: string, //get token error, create chat error
      selectedChatId: number|null,
      chatList: {
        isLoading: boolean,
        chats: ChatInfoModel[]
      },
      chatContent: {
        isLoading: boolean,
        chatId: number|null,
        token: string,
        state: ChatContentState,
        shortUserInfo:{
          avatar: string,
          username: string
        },
        socket: WebSocketService|null,
        message: string
      },      
      /* add user to chat control */
      addUserToChat:{
        isLoading: boolean,
        foundUsers: UserModel[]
      }
    }
}
  
const initialState: State = {
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
      isLoading: true,
      userSavingMessage: "",
      user: null
    },
    chat:{
      userID: null,
      error: "",
      selectedChatId: null,
      chatList:{
        isLoading: true,
        chats: new Array<ChatInfoModel>, //todo model
      },      
      chatContent:{
        isLoading: false,
        chatId: null,
        token: "",
        state: ChatContentState.CHAT_CREATED,
        shortUserInfo:{
          avatar: "",
          username: ""
        },
        socket: null,
        message: ""
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
    //console.log("before event");
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
          //console.log("event here");
          const newMappedState = mapStateToProps(store.getState());          
          this.setProps(newMappedState);
        });
      }
    }
  }
}

export { store };
