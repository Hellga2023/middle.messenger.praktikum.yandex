import section from './section_nav_left.tmpl';
import './section_nav_left.scss';
import Block from '../../block/block';

interface ISectionProps{
    
}

class SectionLeft extends Block<ISectionProps> {
    constructor(props) {
        props.class = "section-left";
        super(props);
    }

    public render(): DocumentFragment{
       return this.compile(section);
    }

}

export default SectionLeft;

