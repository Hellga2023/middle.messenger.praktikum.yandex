import Handlebars from 'handlebars';
import avatar from './avatar.tmpl';

export const Avatar = ({avatarUrl}) => { return Handlebars.compile(avatar)({avatarUrl}) };
 