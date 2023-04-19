import profile from './profile.tmpl';
import Block, { IProps } from '../../components/block/block';
import SectionLeft from '../../components/section_nav_left/section_nav_left';
import ProfileForm from '../../components/profileComponents/profile_form/profileForm';
import authController from '../../controllers/authController';

class Profile extends Block<IProps>{

    constructor(data:IProps) { 
        
        data.class = "content";
        super(data);               
        authController.getUser(); 
    }

    init(): void {           
        
        this.children.sectionLeft = new SectionLeft({});//todo params?
        this.children.profileForm = new ProfileForm({editMode: false, isLoading: false}); //todo set initially true and then remove??? do we need this
    }

    render():DocumentFragment{
        return this.compile(profile);
    }
}

export default Profile;

