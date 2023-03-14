import Handlebars from 'handlebars';
import profile from 'bundle-text:./profile.hbs';
import {Button} from '../../components/button/button';
import {Link} from '../../components/link/link';
import {Info} from '../../components/profile_info_line/profile_info_line';
import {SectionLeft} from '../../components/section_nav_left/section_nav_left';
import avatarImg from '../../../static/avatar.png';
import './profile.css';

export const Profile = (data)=> {

    let infoTemplates=[], 
        links = [],
        underlinedClass = "underlined",
        params = {
            name: data.user.name,
            isInEditMode: data.isProfileInEditMode, 
            sectionLeft: SectionLeft(),
            avatarUrl: avatarImg,
            tag: data.isProfileInEditMode ? "form":"div"
        };

    data.user.infos.forEach(function(element, id, arr){
        element.isDisabled = !data.isProfileInEditMode;
        element.class_ = arr.length-1 == id ? "" : underlinedClass;
        infoTemplates.push(Info(element));
    });
    
    params.infos =infoTemplates;
    
    if(data.isProfileInEditMode){        
        params.btn = Button({text:"Save"});
        params.class_ = "";
    }else{
        links.push(Link({text:"Edit profile", url: "/editprofile", class_: underlinedClass}));
        links.push(Link({text:"Change password", url: "editpassword", class_: underlinedClass}));
        links.push(Link({text:"Return"}));
        params.links = links;
        params.class_ = "text_left";
    }
    return Handlebars.compile(profile)(params); 
};

