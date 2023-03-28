import error from './error.tmpl';
import Link from '../../components/link/link';
import './error.scss'; 
import Block from '../../block/block';

interface IErrorProps{}

class Error extends Block<IErrorProps> {
    constructor(data) {
        if(data.code==404){
            data.message = "Sorry, this page doesn't exist";
        }else if(data.code==500){
            data.message = "We are fixing the problem";
        }
        data.link = new Link({text:"Back to chats", url: "/chat"})
        super('div', data);
    }
    render():DocumentFragment{
        return this.compile(error);
    }
}
export default Error;
