import profileForm from './profileForm.tmpl';
import Button from '../button/button';
import Link from '../link/link';
import ValidatableInput, { IValidatableInputProps } from '../validatableInput/validatableInput';
import Avatar from '../avatar/avatar';
import avatarImg from '../../../static/avatar.png';
import Block, { IProps } from '../../block/block';
import './profileForm.scss';
import { store, StoreEvents, withStore } from '../../modules/store';
import { Routes } from '../../routing/router';
import userController from '../../controllers/userController';

interface IProfileFormProps extends IProps{ //todo all props here
    editMode: boolean;   
    isLoading: boolean;
    /* calculated props */
    footerClass?:string;
    username?: string;    
    avatarImg?: any;
    id?: number;
    first_name?: string;
    second_name?: string;
    login?: string;
    email?: string;
    password?: string;
    phone?: string;
    /* children */
    infos?: ValidatableInput[];
    avatar?: Avatar;
}

class ProfileForm extends Block<IProfileFormProps> {
    constructor(data:IProfileFormProps) {

        data.class = "profile-container";    
        data.avatarImg = avatarImg;
        data.footerClass = data.editMode? "" :"text_left";   //move where?
        super(data, "form");

        store.on(StoreEvents.Updated, () => { 
            try{
                const state = store.getState().profile;
                    console.log("setting");
                    this.setProps({
                        isLoading : state.isLoading,
                        editMode : state.editMode,
                        username: state.user!.first_name,
                        footerClass : state.editMode ? "" :"text_left"
                    })
                    console.log("editmode " + state.editMode);
                    this.children.userinfos.forEach((validatableInput:ValidatableInput) => { 
                        let input = validatableInput.children.input,
                            name = input.props.name,
                            val = state.user![name];
                            console.log("group " + validatableInput.props.isDisabled);
                            console.log("input " + input.props.isDisabled);
                            //remove disabled attr!!!

                        input.setProps({value: val, isDisabled: state.editMode });                  
                    });
                
            }catch(err){
                console.log(err);
            }            
        });
    }

    public init(): void {

        let links = new Array<Link>,
                underlinedClass = "underlined",
                infoTemplates=new Array<ValidatableInput>,
                infos = [{label:"Email", name: "email"},
                        {label:"Login", name: "login"},
                        {label:"Name", name: "first_name"},
                        {label:"Surname", name: "second_name"},
                        {label:"Nickname", name: "display_name"},
                        {label:"Phone", name: "phone"}] ;  

        links.push(new Link({text:"Edit profile", 
                                url: Routes.Profile, 
                                class_: underlinedClass, 
                                events: {click: (event:Event)=>{ 
                                    event.preventDefault();
                                    userController.setEditMode(true);
                                }}}));
        links.push(new Link({text:"Change password", url: "editpassword", class_: underlinedClass}));
        links.push(new Link({text:"Return"}));

        infos.forEach((info, id, arr)=>{
            let props = {
                labelText: info.label,
                labelClass: "info-line__label",
                divClasses: ["info-line", arr.length-1 == id ? "" : underlinedClass],
                inputProps: {
                    name:info.name,
                    isDisabled: !this.props.editMode,
                    class:  "info-line__input"
                }
            } as IValidatableInputProps;

            infoTemplates.push(new ValidatableInput(props));
        });

        this.children.links = links;
        this.children.avatar= new Avatar({avatarUrl: this.props.avatarImg, alt: "avatar"});
        this.children.btn = new Button({ text:"Save"});
        this.children.userinfos = infoTemplates;

        this.props.events = {
            submit:(event:Event)=>{
                event.preventDefault();
                let data = {},
                    isFormValid = true;
                this.children.userinfos.forEach((input:ValidatableInput) => { 
                    let isValid = input.validateInForm(data);
                    if(!isValid) { isFormValid = false;}
                });
                console.log(data); 
                console.log(isFormValid);
                if(isFormValid){
                    // user controller post user data
                }
        }}
    }

    public render(): DocumentFragment{
       return this.compile(profileForm);
    }

}

/*todo withStore???*/

export default ProfileForm;
