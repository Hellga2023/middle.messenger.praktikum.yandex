import Handlebars from 'handlebars';
import main from 'bundle-text:./main.hbs';

export const Main = ()=> { 
    return Handlebars.compile(main)(); 
};