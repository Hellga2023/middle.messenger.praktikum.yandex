import info_line from './profile_info_line.tmpl';
import './profile_info_line.css';
import Block from '../../blocks/block';

/*export const Info = ({name, value, isDisabled, class_, label}) => {
    const hasValue = value!='undefined';
    return Handlebars.compile(info_line)({ name, hasValue, value, isDisabled, class_, label })
};*/

class Info extends Block {
    constructor(props) {
        props.hasValue = props.value!='undefined';
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(info_line);
    }
}

export default Info;
 
