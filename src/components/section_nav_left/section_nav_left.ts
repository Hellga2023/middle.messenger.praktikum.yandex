import section from './section_nav_left.tmpl';
import './section_nav_left.scss';
import Block, { IProps } from '../block/block';

class SectionLeft extends Block<IProps> {
    constructor(props:IProps) {
        props.class = "section-left";
        super(props);
    }

    init(): void {
        this.props.events = {
            click: ()=>{
                history.back();//todo how to remember history without refresh???
            }            
        };
    }

    public render(): DocumentFragment{
       return this.compile(section);
    }

}

export default SectionLeft;

