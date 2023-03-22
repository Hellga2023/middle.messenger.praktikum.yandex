import main from './main.tmpl';
import Block from '../../blocks/block';

/*export const Main = ()=> { 
    return Handlebars.compile(main)(); 
};*/

class Main extends Block{ 
    constructor (){
        super('div', {});
    }
    render():DocumentFragment{
        return this.compile(main, this.props);
    }
}
export default Main;
