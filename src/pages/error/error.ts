import error from './error.tmpl';
import Link from '../../components/commonComponents/link/link';
import './error.scss'; 
import Block, { IProps } from '../../components/block/block';
import router, { Routes } from '../../routing/router';

interface IErrorProps extends IProps {
    /* code */
    code?: number;
}

class Error extends Block<IErrorProps> {
    constructor(data:IErrorProps) {
        if(data.code==500){
            data.message = "We are fixing the problem";
        }else{
            data.message = "Sorry, this page doesn't exist";
        }
        
        super(data);
    }
    init(): void {
        this.children.link = new Link({text:"Back to chats", url: Routes.CHAT, router: router})
    }
    render():DocumentFragment{
        return this.compile(error);
    }
}
export default Error;
