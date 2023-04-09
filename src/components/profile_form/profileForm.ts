import profileForm from './profileForm.tmpl';
import Button from '../button/button';
import Link from '../link/link';
import Info from '../profileInfoLine/profileInfoLine';
import Avatar from '../avatar/avatar';
import avatarImg from '../../../static/avatar.png';
import Block, { IProps } from '../../block/block';
import Validation from '../../utils/validation';
import './profileForm.scss';
import { store, StoreEvents, withStore } from '../../modules/store';
import { Routes } from '../../routing/router';

interface IProfileFormProps extends IProps{ //todo all props here
    username: string;
    avatarImg?: any;
    avatar?: Avatar;
    editMode: boolean;   
    infos: any[]; //todo create interface
    class_?:string;
    id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  
}
class ProfileForm extends Block<IProfileFormProps> {
    constructor(data:IProfileFormProps) {

        data.class = "profile-container";    
        data.avatarImg = avatarImg;
        data.class_ = data.editMode? "" :"text_left";   
        data.events = {
            submit:(event:Event)=>{
                event.preventDefault();
                let data = {};
                this.children.userinfos.forEach(input => { Validation.validateInputInForm(input, data); });
                console.log(data); 
        }}     
        super(data, data.editMode ? "form":"div");

        store.on(StoreEvents.Updated, () => { 
            try{
                const mappedState = store.getState().profile.user;
                if(mappedState!=null){
                    //const newProps = {...this.props, ...mappedState};
                    //this.setProps(newProps); 

                    this.children.userinfos.forEach(
                    (inputGroup:Info) => { 
                        let input = inputGroup.children.input,
                            name = input.props.name,
                            val = mappedState[name];
                        input.setProps({value: val});                    
                    }
                );
                //newProps.username = mappedState.first_name;
                //this.setProps(newProps)
                }
                
            }catch(err){
                console.log(err);
            }
            
        });

    }

    public init(): void {

        this.children.avatar= new Avatar({avatarUrl: this.props.avatarImg, alt: "avatar"});
        if(this.props.editMode){
            this.children.btn = new Button({ text:"Save" });
        }else{
            let links = new Array<Link>,
            underlinedClass = "underlined";
            links.push(new Link({text:"Edit profile", url: Routes.Profile, class_: underlinedClass, events: {click: ()=>{ /* set state editMode */}}}));
            links.push(new Link({text:"Change password", url: "editpassword", class_: underlinedClass}));
            links.push(new Link({text:"Return"}));
            this.children.links = links;
        }


        /*let props = {editMode: false,
            infos: [{label:"Email", value:this.props.email, name: "email"},
                    {label:"Login", value:"Hellga", name: "login"},
                    {label:"Name", value:"Olga", name: "first_name"},
                    {label:"Surname", value:"Kup", name: "second_name"},
                    {label:"Nickname", value:"Hellga", name: "display_name"},
                    {label:"Phone", value:"+7 999 111-11-11", name: "phone"}],
            username: "Olga" };  */


        let infoTemplates=new Array<Info>, 
        underlinedClass = "underlined";
        this.props.infos.forEach((element, id, arr)=>{
            element.isDisabled = !this.props.editMode;
            element.class_ = arr.length-1 == id ? "" : underlinedClass;
            infoTemplates.push(new Info(element));
        });
        this.children.userinfos = infoTemplates;

        /*console.log("name from state");
        console.log(store.getState());
        console.log(store.getState().profile);
        console.log("name from props");
        console.log(this.props)*/
    }

    public render(): DocumentFragment{
       return this.compile(profileForm);
    }

}

//const withUser = withStore((state) => ({ ...state.profile.user }));
//const ProfileForm = withUser(ProfileFormPage);

export default ProfileForm;
