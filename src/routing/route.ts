//import {isEqual} from '../utils/isEqual';
import {renderBlock} from '../utils/renderDom';
import Block, { IProps } from '../components/block/block';

export default class Route {
    
    private _pathname: string;
    private _blockClass: any;
    private _block?: Block<IProps> | null;
    private _props: any;

  constructor(pathname:string, view: new (props:IProps) => Block<IProps>, props:any) { //todo use interface instead?
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname:string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide(); //remove from dom
    }
  }

  match(pathname:string) {
    //return isEqual(pathname, this._pathname);  //todo
    return pathname==this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      renderBlock(this._props.rootQuery, this._block!); //todo?
      return;
    }

    this._block.show(); //do not need? will be removed from dom
  }
}
