import Handlebars from 'handlebars';
import link from 'bundle-text:./link.hbs';
import './link.css';
import Block from '../../blocks/block';

//export const Link = ({text, url, class_}) => Handlebars.compile(link)({ text, url, class_});

class Link extends Block {
    constructor(props) {
        super('div', props);
    }

    public render(): DocumentFragment{
       const { text, url, class_} = this.props;
       const compiled = this.compile(link, { text, url, class_});
       return compiled;
    }

}

export default Link;
