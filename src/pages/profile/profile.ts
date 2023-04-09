import profile from './profile.tmpl';
import Block, { IProps } from '../../block/block';
import SectionLeft from '../../components/section_nav_left/section_nav_left';
import ProfileForm from '../../components/profile_form/profileForm';
import {store, StoreEvents, withStore } from '../../modules/store';
import authController from '../../controllers/authController';
import { User } from '../../types/models';
import Info from '../../components/profileInfoLine/profileInfoLine';
//import { connect } from '../../modules/connect';


interface IProfileProps extends IProps {
    username: string;
    editMode: boolean;   
    infos: any[]; //todo create interface
    user: User|null;
    isLoading: boolean;
}

class Profile extends Block<IProfileProps>{

    constructor(data:IProfileProps) {       

        data.class = "content";
        //super(data);

        const mappedState = store.getState().profile;

        super({ ...data, ...mappedState });

        //super(data);
        
        authController.getUser(); 
        store.on(StoreEvents.Updated, () => { 
            const isLoading = store.getState().profile.isLoading;
            this.setProps({...this.props, ... {isLoading}});
        });
       // UserController.getUser();
        /*store.on(StoreEvents.Updated, () => { 
            try{
                const mappedState = store.getState().profile;
                const newProps = {...this.props, ...mappedState};
                this.setProps(newProps); 

                this.children.profileForm.children.userinfos.forEach(
                    (inputGroup:Info) => { 
                        let input = inputGroup.children.input,
                            name = input.props.name,
                            val = mappedState.user![name];
                        input.setProps({value: val});                    
                    }
                );
                this.children.profileForm.setProps({username: mappedState.user!.first_name})
            }catch(err){
                console.log(err);
            }
            
        });*/
    }

    init(): void {

           
        
        this.children.sectionLeft = new SectionLeft({});//todo params?


        let props = {editMode: false,
            infos: [{label:"Email", value:this.props.user?.email, name: "email"},
                    {label:"Login", value:this.props.user?.login, name: "login"},
                    {label:"Name", value:this.props.user?.first_name, name: "first_name"},
                    {label:"Surname", value:this.props.user?.second_name, name: "second_name"},
                    {label:"Nickname", value:this.props.user?.display_name, name: "display_name"},
                    {label:"Phone", value:this.props.user?.phone, name: "phone"}],
            username: this.props.user?.first_name };

        this.children.profileForm = new ProfileForm(props);
        //this.children.profileForm = new ProfileForm();
    }

    render():DocumentFragment{
        return this.compile(profile);
    }
}

//const withUser = withStore((state) => ({ ...state.profile }));
//const Profile = withUser(ProfilePage);

export default Profile;

