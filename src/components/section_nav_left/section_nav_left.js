import Handlebars from 'handlebars';
import section from 'bundle-text:./section_nav_left.hbs';
import './section_nav_left.css';

export const SectionLeft = () => Handlebars.compile(section)();

