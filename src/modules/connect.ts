import Block, { IProps } from "../block/block";
import { isEqual } from "../utils/isEqual";
import store, { StoreEvents } from "./store";

/*export function connect(Component: typeof Block) {
    
  return class extends Component<IProps> {
    constructor(...args) {
            // не забываем передать все аргументы конструктора
      super(...args);
            
      store.on(StoreEvents.Updated, () => { this.setProps({...store.getState()}); });
    }
  } 
} */


/*function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
    // используем class expression
  return class extends Component<IProps> {
    constructor(props) {
      super({...props, ...mapStateToProps(store.getState())});

      // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // вызываем обновление компонента, передав данные из хранилища
          this.setProps({...mapStateToProps(store.getState())});
            });
    }
  } 
}*/

function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function(Component: typeof Block) {
      return class extends Component<IProps> {
        constructor(props:IProps) {
                  
            let state = mapStateToProps(store.getState());
  
            super({...props, ...state}); //todo tag
  
            store.on(StoreEvents.Updated, () => {
                      const newState = mapStateToProps(store.getState());
                
                      if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                      }
  
                      state = newState;
                  });
        }
      }
      }
  }

function mapUserToProps(state) {
  return {
    name: state.user.name,
    avatar: state.user.avatar,
  };
}

const withUser = connect(state => ({ user: state.user }));

withUser(UserProfile);
withUser(SettingsPage); 

connect(Profile, mapUserToProps); 
