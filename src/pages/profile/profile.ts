import profile from './profile.tmpl';
import Block from '../../block/block';
import SectionLeft from '../../components/section_nav_left/section_nav_left';
import ProfileForm from '../../components/profile_form/profileForm';


interface IProfileProps {
    username: string;
    editMode: boolean;   
    infos: any[]; //todo create interface
    class?:string;
}

class Profile extends Block<IProfileProps>{

    constructor(data:IProfileProps) {       

        data.class = "content";
        super('div', data);
    }

    init(): void {
        this.children.sectionLeft = new SectionLeft({});//todo params?
        this.children.profileForm = new ProfileForm(this.props);
    }

    render():DocumentFragment{
        return this.compile(profile);
    }
}

export default Profile;

