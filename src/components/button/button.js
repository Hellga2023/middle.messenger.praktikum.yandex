import Handlebars from 'handlebars';
import button from 'bundle-text:./button.hbs';
import './button.css';

export const Button = ({text}) => Handlebars.compile(button)({ text });

