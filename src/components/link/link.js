import Handlebars from 'handlebars';
import link from 'bundle-text:./link.hbs';
import './link.css';

export const Link = ({text, url, class_}) => Handlebars.compile(link)({ text, url, class_});

