import profileForm from './profileForm.tmpl';
import Button from '../../commonComponents/button/button';
import Link from '../../commonComponents/link/link';
import ValidatableInput, { IValidatableInputProps } from '../../commonComponents/validatableInput/validatableInput';
import Avatar from '../avatar/avatar';
import Block, { IProps } from '../../block/block';
import './profileForm.scss';
import { store, StoreEvents } from '../../../modules/store';
import router, { Routes } from '../../../routing/router';
import userController from '../../../controllers/userController';
import AuthController from '../../../controllers/authController';
import { UserModel, UserWithAvatarModel } from '../../../models/models';
import { XssProtect } from '../../../utils/xssProtect';
import resourceController from '../../../controllers/resourceController';

interface IProfileFormProps extends IProps{ 
    //todo check if all of that we need
    editMode: boolean;   
    isLoading: boolean;
    /* calculated props */
    footerClass?:string;
    username?: string;    
    avatarImg?: string;
    id?: number;
    first_name?: string;
    second_name?: string;
    login?: string;
    email?: string;
    password?: string;
    phone?: string;
    userSavingMessage?:string;
    avatarSavingMessage?:string;
    /* children */
    infos?: ValidatableInput[];
    avatar?: typeof Avatar;
}

class ProfileForm extends Block<IProfileFormProps> {
    constructor(data:IProfileFormProps) {
        data.class = "profile-container";    
        data.footerClass = data.editMode? "" :"text_left";   //move where?
        super(data, "form");

        store.on(StoreEvents.Updated, () => { 
            if(store.getState().user){
                this._setUserInfo();
            }             
        });
    }

    public init(): void { //todo move to render!!!

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
                                url: Routes.PROFILE, 
                                router: router,
                                class_: underlinedClass, 
                                events: {click: (event:Event)=>{ 
                                    event.preventDefault();
                                    userController.setEditMode(true);
                                }}}));
        links.push(new Link({text:"Change password", url: Routes.EDIT_PASSWORD, router: router, class_: underlinedClass}));
        links.push(new Link({text: "Logout", router: router, url: "", events:{ click: (event:Event)=>{
                event.preventDefault();
                AuthController.logout();
            }}}));

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
        this.children.avatar= new Avatar({avatarUrl: this.props.avatarImg, isDisabled: !this.props.editMode});
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
                const avatarImg = (this.children.avatar.children.input.element as HTMLInputElement).value;
                if(avatarImg){
                    let form = new FormData(this.children.avatar.element);
                    userController.saveUserAvatar(form);
                }
                if(isFormValid){
                    console.log(data);
                    userController.saveUser(data as UserModel);
                    // user controller post user data
                }
        }}
        this._setUserInfo();
    }

    public render(): DocumentFragment{
       return this.compile(profileForm);
    }

    private _setUserInfo(){
        try{
            console.log("in set user info");
            const state = store.getState().profile,
                user = store.getState().user as UserWithAvatarModel;
                if(user!=null){

                    this.setProps({
                        isLoading : state.isLoading,
                        editMode : state.editMode,
                        username: user?.first_name,
                        userSavingMessage: state.userSavingMessage,
                        avatarSavingMessage: state.avatarSavingMessage,
                        footerClass : state.editMode ? "" :"text_left"
                    })
                    this.children.userinfos.forEach((validatableInput:ValidatableInput) => { 
                        let input = validatableInput.children.input,
                            name = input.props.name as keyof UserWithAvatarModel,
                            val = XssProtect.sanitizeHtml(user[name] as string);
                        input.setProps({value: val, isDisabled: !state.editMode });                  
                    });
                    this.children.avatar.setProps({
                        isDisabled:!state.editMode
                    });
                    //todo check if default is shown?
                    this.children.avatar.children.avatarImage.setProps({src: resourceController.getAvatarUrl(user.avatar)});                                        
                }else{
                    console.log("user is null");
                }                
        }catch(err){
            console.log(err);
        }            
    }
}

/*todo withStore???*/

export default ProfileForm;
