import Handlebars from 'handlebars';
import avatar from './avatar.tmpl';
import './avatar.scss';
import Block from '../../block/block';

//export const Avatar = ({avatarUrl}) => { return Handlebars.compile(avatar)({avatarUrl}) };


interface IAvatarProps{
    avatarUrl:string;
    alt:string;
}

class Avatar extends Block<IAvatarProps> {
    constructor(props:IAvatarProps) {
        super('div', props);
    }

    public render(): DocumentFragment{        
        return this.compile(avatar);
    }

}

export default Avatar;
