import Handlebars from 'handlebars';
import auth_input from './auth_input.tmpl';
import './auth_input.css';

export const Auth_Input = ({name,type, label}) => {
    if(!type) { type ="text";}
    return Handlebars.compile(auth_input)({ name, type, label})
};
 
