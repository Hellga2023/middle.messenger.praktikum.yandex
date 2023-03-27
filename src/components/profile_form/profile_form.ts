import profileForm from './profile_form.tmpl';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Info from '../../components/profile_info_line/profile_info_line';
import Avatar from '../../components/avatar/avatar';
import avatarImg from '../../../static/avatar.png';
import './profile_form.scss';
import Block from '../../block/block';
import Validation from '../../utils/validation';

interface IProfileFormProps{ //todo all props here
    user: IUser;
    editMode: boolean;    
}

interface IUser{
    name: string;
    infos: any[];
    avatarUrl: any;
    avatar: Avatar;
}

interface IInfoProps{
    name: string;
    label: string;
    value: string;
}

class ProfileForm extends Block<IProfileFormProps> {
    constructor(data:IProfileFormProps) {

        let infoTemplates=new Array<Info>, 
        links = new Array<Link>,
        underlinedClass = "underlined",        
        params = {
            name: data.user.name,
            editMode: data.editMode, 
            class: "profile-container",
            class_: "",            
            links: new Array<Link>,
            avatar: new Avatar({avatarUrl: avatarImg, alt: "avatar"}),
            avatarUrl: avatarImg
        };

        data.user.infos.forEach(function(element, id, arr){
            console.log(element);
            element.isDisabled = !data.editMode;
            element.class_ = arr.length-1 == id ? "" : underlinedClass;
            let validateFn = Validation.chooseMethod(element.name);
            infoTemplates.push(new Info({...element, events:{
                focusin: event => {
                    let element = event.target;
                    let isValid = validateFn(element.value);                    
                    event.target.classList[isValid?"remove":"add"](Validation.ERROR_CLASS);
                },
                focusout: event => {
                    let element = event.target;
                    let isValid = validateFn(element.value);                    
                    event.target.classList[isValid?"remove":"add"](Validation.ERROR_CLASS);
                }
            }
            
            }));
            console.log(infoTemplates[id]);
        });
    
        params.userinfos =infoTemplates;
                
    
        if(data.editMode){        
            params.btn = new Button({
                text:"Save"
            });
            params.class_ = "";
            params.events = {
                submit: function(event) {
                    event.preventDefault();  
                    //console.log(this.children.infos[0].props.name);  
                    //console.log(this.children.infos[0].props.value);                      
                    Validation.validateForm(this.element);                     
                }
            };
        }else{
            links.push(new Link({text:"Edit profile", url: "/editprofile", class_: underlinedClass}));
            links.push(new Link({text:"Change password", url: "editpassword", class_: underlinedClass}));
            links.push(new Link({text:"Return"}));
            params.links = links;
            params.class_ = "text_left";
        }   


        super(data.editMode ? "form":"div", params);
    }

    public render(): DocumentFragment{
       return this.compile(profileForm);
    }

}

export default ProfileForm;
