import profileForm from './profileForm.tmpl';
import Button from '../button/button';
import Link from '../link/link';
import Info from '../profile_info_line/profile_info_line';
import Avatar from '../avatar/avatar';
import avatarImg from '../../../static/avatar.png';
import Block from '../../block/block';
import Validation from '../../utils/validation';
import './profileForm.scss';

interface IProfileFormProps{ //todo all props here
    username: string;
    avatarImg?: any;
    avatar?: Avatar;
    editMode: boolean;   
    infos: any[]; //todo create interface
    class?:string;
    class_?:string;
    userinfos?:any;
    events?:any;
}

interface IInfoProps{
    name: string;
    label: string;
    value: string;
    userinfos?:any;
    
}

class ProfileForm extends Block<IProfileFormProps> {
    constructor(data:IProfileFormProps) {

        let infoTemplates=new Array<Info>, 
        underlinedClass = "underlined";

        data.infos.forEach(function(element, id, arr){
            element.isDisabled = !data.editMode;
            element.class_ = arr.length-1 == id ? "" : underlinedClass;
            infoTemplates.push(new Info(element));
        });
        data.class = "profile-container";    
        data.userinfos =infoTemplates;
        data.avatarImg = avatarImg;
        data.class_ = data.editMode? "" :"text_left";   
        data.events = {
            submit:(event:Event)=>{
            event.preventDefault();
            let data = {};
            this.children.userinfos.forEach(input => {
                this.validateInput(input, data);                
            });
            console.log(data); 
        }}     
        super(data.editMode ? "form":"div", data);
    }

    public init(): void {

        this.children.avatar= new Avatar({avatarUrl: this.props.avatarImg, alt: "avatar"});
        if(this.props.editMode){
            this.children.btn = new Button({ text:"Save" });
        }else{
            let links = new Array<Link>,
            underlinedClass = "underlined";
            links.push(new Link({text:"Edit profile", url: "/editprofile", class_: underlinedClass}));
            links.push(new Link({text:"Change password", url: "editpassword", class_: underlinedClass}));
            links.push(new Link({text:"Return"}));
            this.children.links = links;
        }
    }

    validateInput(inputGroup:Block<any>, data:object):void{
        const input = inputGroup.children.input,
              name = inputGroup.props.name,
              value = (input.element! as HTMLInputElement).value;
        data[name] = value;
        let result = Validation.validateInput(name,value);
        input.element!.classList[result.isValid?"remove":"add"](Validation.ERROR_CLASS);
        inputGroup.children.errorLabel.setProps({text: result.isValid? "":result.errorMessage});
    }

    public render(): DocumentFragment{
       return this.compile(profileForm);
    }

}

export default ProfileForm;
