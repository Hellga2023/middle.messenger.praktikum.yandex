import link from './link.tmpl';
import './link.scss';
import Block, { IProps } from '../../block/block';

interface ILinkProps extends IProps{
    class_?:string;
    url?:string;//todo?
    text:string;
}

class Link extends Block<ILinkProps> {
    constructor(props:ILinkProps) {
        super(props);
    }

    public render(): DocumentFragment{
       return this.compile(link);
    }

}

export default Link;
