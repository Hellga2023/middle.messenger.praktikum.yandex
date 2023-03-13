import Handlebars from 'handlebars';
import auth from 'bundle-text:./auth.hbs';
import {Button} from '../../components/button/button';
import {Link} from '../../components/link/link';
import {Auth_Input} from '../../components/auth_input/auth_input';
import './auth.css';

export const Auth = (data)=> { 
    let params, 
    inputs = [];

    data.inputs.forEach(element => {
        inputs.push(Auth_Input(element));
        });

    params = {
            isLogin: data.isLoginMode, 
            btn:Button(data.btn), 
            link: Link(data.link),
            inputs: inputs
    };

    return Handlebars.compile(auth)(params);
};