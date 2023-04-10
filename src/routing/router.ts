import Block, { IProps } from "../components/block/block";
import Route from "./route";

export const enum Routes {
  Login = "/",
  Signup = "/sign-up",
  Profile = "/settings",
  Chat = "/messenger"
}

class Router {

  private static __instance : Router;
  private _currentRoute : Route|null;
  private _rootQuery : string;

  public routes : Route[];
  public history : History;

    constructor(rootQuery:string) {
      if (Router.__instance) {
        return Router.__instance;
      }
      this._rootQuery = rootQuery;
      this.routes = [];
      this.history = window.history;
      this._currentRoute = null;
  
      Router.__instance = this;
    }
  
    use(pathname:string, block:new (props:IProps) => Block<IProps>, props: IProps) {
        const route = new Route(pathname, block, {...props, rootQuery: this._rootQuery}); //todo props??
    
        this.routes.push(route);
        
        return this;
    }
  
    start() {
      window.onpopstate = (event : Event) => {
        this._onRoute((event.currentTarget as Window).location.pathname);
      };
  
      this._onRoute(window.location.pathname);
    }
  
    _onRoute(pathname:string) {
      const route = this.getRoute(pathname);
      if (!route) {
        return;
      }
  
      if (this._currentRoute) {
        this._currentRoute.leave();
      }
      this._currentRoute = route;
      route.render();
    }
  
    go(pathname:string) {
      this.history.pushState({}, "", pathname);
      this._onRoute(pathname);
    }

    getRoute(pathname:string) {
        return this.routes.find(route => route.match(pathname));
    }

    back(){
      this.history.back();
    }

    forward(){
      this.history.forward();
    }
}

export default new Router("#content");

/* todo where it is used?? */
export function withRouter(Component: typeof Block<any>){
  type Props = typeof Component extends typeof Block<infer P> ? P : any;

  return class WithRouter extends Component {
      constructor(props: Props & PropsWithRouter) {
        super({ ...props, router: Router });
      }
    }
  }
  
export interface PropsWithRouter {
    router: typeof Router;
}
