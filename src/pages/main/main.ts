import main from './main.tmpl';
import Block from '../../block/block';

interface IMainProps{}


class Main extends Block<IMainProps>{ 
    constructor (){
        super({});
    }
    render():DocumentFragment{
        return this.compile(main);
    }
}
export default Main;
