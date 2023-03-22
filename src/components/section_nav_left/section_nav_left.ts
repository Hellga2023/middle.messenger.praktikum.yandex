import section from './section_nav_left.tmpl';
import './section_nav_left.css';
import Block from '../../blocks/block';

class SectionLeft extends Block {
    constructor(props) {
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(section);
    }

}

export default SectionLeft;

