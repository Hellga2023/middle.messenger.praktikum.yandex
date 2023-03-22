import auth from './auth.tmpl';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Auth_Input from '../../components/auth_input/auth_input';
import './auth.css';
import Block from '../../blocks/block';

class Auth extends Block{

    constructor(data) {
        let params, 
        inputs = [];
    
        data.inputs.forEach(element => {
            inputs.push(new Auth_Input(element));
            });
    
        params = {
                isLogin: data.isLoginMode, 
                btn:new Button(data.btn), 
                link: new Link(data.link),
                inputs: inputs
        };

        super('div', params);
    }

    render():DocumentFragment{
        return this.compile(auth, this.props);
    }
}

export default Auth;
