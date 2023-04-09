import Block, { IProps } from "../block/block";
import EventBus from "../block/eventbus";
import { User } from "../types/models";
import {set} from "../utils/helpers";

export enum StoreEvents {
    Updated = 'updated',
  }

type State = {
    signup:{
      isLoading: boolean;
      validationError: string;
    },
    login:{
      isLoading: boolean;
      validationError: string;
    },
    profile:{
      isLoading: boolean;
      user: null | User;
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
      isLoading: true,
      user: null
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
