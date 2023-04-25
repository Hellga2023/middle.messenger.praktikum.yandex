import chatController from "../../../../controllers/chatController";
import { store, withStore } from "../../../../modules/store";
import Block, { IProps } from "../../../block/block";
import ImageButton from "../../../commonComponents/imageButton/imageButton";
import Input from "../../../commonComponents/input/input";

const template=`
<div class="chat-options__set-avatar">
    <div class="chat-options__button-row">{{{chooseAvatarBtn}}} Please select an image</div>
    <p>{{avatarMessage}}</p>
        {{{input}}}
    <div class="chat-options__button-row">{{{saveAvatarBtn}}} Upload</div>
    <p class="">{{avatarSaveMessage}}</p>
</div>`;

interface ISetAvatarProps extends IProps{
    input?:Input;
    avatarMessage?:string;
    avatarSaveMessage?: string;

    saveAvatarBtn?:ImageButton;
    chooseAvatarBtn?:ImageButton;
}

const chooseAvatarMessage = "no file is selected";

class SetAvatarComponent extends Block<ISetAvatarProps>{
    constructor(props:ISetAvatarProps){
        super(props);
    }

    public init():void{
        this.props.avatarMessage = chooseAvatarMessage;

        this.children.input = new Input({
            name: "avatar",
            placeholder: "Avatar photo",
            type: "file",
            class: "avatar-upload",
            accept: "image/*",
            events: {
                change: (event:Event)=>{
                    this.setProps({avatarMessage: (event.target as HTMLInputElement).value});
                }
            }
        });
        this.children.chooseAvatarBtn = new ImageButton({
            class: "chat-options__round-button",
            iconClass:"fa-solid fa-plus", 
            events:{
                click: ()=>{ this.children.input.getContent().click(); }
            }
        });
        this.children.saveAvatarBtn = new ImageButton({
            class: "chat-options__round-button",
            iconClass:"fa-solid fa-download", 
            events:{
                click: ()=>{ 
                    console.log("save avatar");
                    const file = this.children.input.getContent().files[0];
                    if(file){
                        let formData = new FormData();
                        if(store.getState().chat.selected.chatId){
                            formData.append('chatId', store.getState().chat.selected.chatId!.toString());
                            formData.append('avatar', this.children.input.getContent().files[0]);                        
                            chatController.saveAvatar(formData);
                        }else{
                            console.log("no chat id");
                        }
                    }else{
                        console.log("no file");
                    }                     
                }
            }
        });
    }

    public render(): DocumentFragment {        
        return this.compile(template);
    }

    public reset(): void {
        this.children.input.getContent().value = "";
        this.setProps({avatarMessage: chooseAvatarMessage});
    }
}

const withAvatarSave = withStore((state) => ({ ...state.chat.setAvatar }));

const SetAvatar = withAvatarSave(SetAvatarComponent);

export default SetAvatar;
