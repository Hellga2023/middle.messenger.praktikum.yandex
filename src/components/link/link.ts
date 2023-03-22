import link from './link.tmpl';
import './link.css';
import Block from '../../blocks/block';

class Link extends Block {
    constructor(props) {
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(link);
    }

}

export default Link;
