import profile from './profile.tmpl';
import Block from '../../block/block';
import SectionLeft from '../../components/section_nav_left/section_nav_left';
import ProfileForm from '../../components/profile_form/profileForm';


interface IProfileProps {
    username: string;
    editMode: boolean;   
    infos: any[]; //todo create interface
}

class Profile extends Block<IProfileProps>{

    constructor(data:IProfileProps) {

        let params = {
            sectionLeft: new SectionLeft({}),//todo
            profileForm: new ProfileForm(data),
            class : "content"
        };

        super('div', params);
    }

    render():DocumentFragment{
        return this.compile(profile);
    }
}

export default Profile;

