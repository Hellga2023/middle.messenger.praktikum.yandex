import Handlebars from 'handlebars';
import info_line from 'bundle-text:./profile_info_line.hbs';
import './profile_info_line.css';

export const Info = ({name, value, isDisabled, class_}) => {
    const hasValue = value!='undefined';
    return Handlebars.compile(info_line)({ name, hasValue, value, isDisabled, class_ })
};
 
