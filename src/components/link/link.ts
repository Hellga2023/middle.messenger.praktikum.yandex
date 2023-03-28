import link from './link.tmpl';
import './link.scss';
import Block from '../../block/block';

interface ILinkProps{
    class_?:string;
    url?:string;//todo?
    text:string;
}

class Link extends Block<ILinkProps> {
    constructor(props:ILinkProps) {
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(link);
    }

}

export default Link;
