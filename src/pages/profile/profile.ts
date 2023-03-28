import profile from './profile.tmpl';
import Block from '../../block/block';
import SectionLeft from '../../components/section_nav_left/section_nav_left';
import ProfileForm from '../../components/profile_form/profile_form';
import './profile.scss';

interface IProfileProps {

}

class Profile extends Block<IProfileProps>{

    constructor(data:IProfileProps) {

        let params = {
            sectionLeft: new SectionLeft({}),//todo
            profileForm: new ProfileForm(data),
            class : "content"
        };

        super('div', params);
        //console.log(this.children.infos);
        //this.children.btn = new Button({text:"Save"}); todo init
    }

    render():DocumentFragment{
        return this.compile(profile);
    }
}

export default Profile;

