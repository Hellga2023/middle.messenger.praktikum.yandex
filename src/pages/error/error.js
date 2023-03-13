import Handlebars from 'handlebars';
import error from 'bundle-text:./error.hbs';
import {Link} from '../../components/link/link';
import './error.css'; 

export const Error = (data)=> { 
    if(data.code==404){
        data.message = "Sorry, this page doesn't exist";
    }else if(data.code==500){
        data.message = "We are fixing the problem";
    }
    data.link = Link({text:"Back to chats", url: "/chat"})
    return Handlebars.compile(error)(data); 
};