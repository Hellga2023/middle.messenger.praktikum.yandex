import info_line from './profile_info_line.tmpl';
import './profile_info_line.scss';
import Block from '../../block/block';

interface IProfileInfoLineProps {
    name: string;
    label:string;
    value:string;
    isDisabled:boolean;
    hasValue:boolean;
    class_: string;
}

class Info extends Block<IProfileInfoLineProps> {
    constructor(props:IProfileInfoLineProps) {
        props.hasValue = props.value!='undefined';
        super('div', props);
    }

    public render(): DocumentFragment{
       return this.compile(info_line);
    }
}

export default Info;
 
