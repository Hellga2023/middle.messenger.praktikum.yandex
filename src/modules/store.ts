import Block, { IProps } from "../components/block/block";
import EventBus from "../utils/eventbus";
import { ChatInfoModel, MessageDetailsModel, UserInChatModel, UserWithAvatarModel } from "../models/models";
import {set} from "../utils/helpers";
import { ChatContentState } from "../components/chatComponents/chatContent/chatContent/chatContent";

export enum StoreEvents {
    Updated = 'updated',
  }

export type State = {
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
      chatId: number|null,      
      chatList: {
        isLoading: boolean,
        chats: ChatInfoModel[]
      },
      chatContent: {
        state: ChatContentState,
        chatUsers: UserInChatModel[], //without me!!!        
        shortUserInfo:{ //from chat users
          avatar: string,
          username: string
        },
        chatMessages:{
          isLoading: boolean,
          messages: MessageDetailsModel[]
        }
      },
      chatOptions:{
        isLoading: boolean,
        addUserToChat:{
          isLoading: boolean,
          foundUsers: UserWithAvatarModel[]
        },
        setAvatar:{
          avatarSaveMessage: string
        },
        createChat:{
          isLoading: boolean,
          error: string          
        }     
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
      chatList:{
        isLoading: true,
        chats: new Array<ChatInfoModel>, //todo model
      },      
      chatOptions:{
        isLoading: false,
        setAvatar:{
          avatarSaveMessage: ""
        },
        addUserToChat:{
          isLoading:false,
          foundUsers: new Array<UserWithAvatarModel>
        },
        createChat:{
          isLoading: false,
          error: ""
        }       
      },      
      chatContent:{
        state: 0,//ChatContentState.CREATE_CHAT, todo wtf???
        chatUsers: new Array<UserInChatModel>,
        shortUserInfo:{
          avatar: "",
          username: ""
        },
        chatMessages:{
          isLoading: false,
          messages: new Array<MessageDetailsModel>
        }
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
