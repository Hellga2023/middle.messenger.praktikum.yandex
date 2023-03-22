import error from './error.tmpl';
import Link from '../../components/link/link';
import './error.css'; 
import Block from '../../blocks/block';

/*export const Error = (data)=> { 
    if(data.code==404){
        data.message = "Sorry, this page doesn't exist";
    }else if(data.code==500){
        data.message = "We are fixing the problem";
    }
    data.link = new Link({text:"Back to chats", url: "/chat"})
    return Handlebars.compile(error)(data); 
};*/


class Error extends Block {
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
