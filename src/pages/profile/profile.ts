import profile from './profile.tmpl';
import Block, { IProps } from '../../block/block';
import SectionLeft from '../../components/section_nav_left/section_nav_left';
import ProfileForm from '../../components/profile_form/profileForm';
import {store, withStore } from '../../modules/store';
import authController from '../../controllers/authController';
import { User } from '../../types/models';
//import { connect } from '../../modules/connect';


interface IProfileProps extends IProps {
    username: string;
    editMode: boolean;   
    infos: any[]; //todo create interface
    user: User|null;
    isLoading: boolean;
}

class ProfilePage extends Block<IProfileProps>{

    constructor(data:IProfileProps) {       

        data.class = "content";
        //super(data);
        super(data);
        

       // UserController.getUser();
        //store.on(StoreEvents.Updated, () => { this.setProps({...mapStateToProps(store.getState())}); });
    }

    init(): void {

        let result = authController.getUser();
        console.log("result");
        console.log(result);
        console.log("store");
        console.log(store.getState());
        
        
        this.children.sectionLeft = new SectionLeft({});//todo params?


        let props = {editMode: false,
            infos: [{label:"Email", value:this.props.user?.email, name: "email"},
                    {label:"Login", value:"Hellga", name: "login"},
                    {label:"Name", value:"Olga", name: "first_name"},
                    {label:"Surname", value:"Kup", name: "second_name"},
                    {label:"Nickname", value:"Hellga", name: "display_name"},
                    {label:"Phone", value:"+7 999 111-11-11", name: "phone"}],
            username: "Olga" };


            console.log("name from state");
            console.log(store.getState());
            console.log(store.getState().profile);
            console.log(store.getState().profile.user);
            console.log("name from props");
            console.log(this.props);
            console.log(this.props.user);

        this.children.profileForm = new ProfileForm(props);
        //this.children.profileForm = new ProfileForm();
    }

    render():DocumentFragment{
        return this.compile(profile);
    }
}

const withUser = withStore((state) => ({ ...state.profile }));
const Profile = withUser(ProfilePage);

export default Profile;

