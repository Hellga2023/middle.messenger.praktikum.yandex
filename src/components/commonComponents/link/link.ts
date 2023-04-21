import link from './link.tmpl';
import './link.scss';
import Block, { IProps } from '../../block/block';
import router from '../../../routing/router';

interface ILinkProps extends IProps{
    url:string;//todo?
    text:string;
    router: typeof router;
    class_?:string;    
}

class Link extends Block<ILinkProps> {
    constructor(props:ILinkProps) {
        super(props);
    }

    init(): void {
        if(!this.props.events){
            this.props.events = {
                click: () => {
                    this._navigate();
                }
            };
        }        
    }

    public render(): DocumentFragment{
       return this.compile(link);
    }

    private _navigate(){
        this.props.router.go(this.props.url);
    }

}

export default Link;
