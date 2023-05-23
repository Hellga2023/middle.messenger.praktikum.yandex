import { store } from "../modules/store";
import ChatAPI from "../api/chatAPI";
import { ChatContentState } from "../components/chatComponents/chatContent/chatContent/chatContent";
import { ChatInfoModel, MessageDetailsModel, UserInChatModel, UserWithAvatarModel } from "../models/models";
import { XssProtect } from "../utils/xssProtect";
import messageController from "./messageController";
import tokenController from "./tokenController";

class IErrorOrDataResponse{
  isSuccess: boolean;
  data: string;
}

class ChatController {
    
    private _api : ChatAPI;

    constructor(){
      this._api = new ChatAPI();
    }

    /* store methods */
    private _addChatToStore(chat:ChatInfoModel){
      const chats = new Array<ChatInfoModel>();
      chats.push(...store.getState().chat.chatList.chats);
      chats.unshift(chat);
      console.log("chat list refreshed");
      store.set("chat.chatList.chats", chats);
    }

    private _setChatUsers(user: UserInChatModel){
       //need to create new array cause compare method will check same arrays
      const chatUsers = new Array<UserInChatModel>();
      chatUsers.push(...store.getState().chat.chatContent.chatUsers);
      chatUsers.push(user);
      store.set("chat.chatContent.chatUsers", chatUsers);
    }

    /* private calls to api */

    private async _addUserToChat(userId: number, chatId: number):Promise<IErrorOrDataResponse> {
      return await this._api.addUserToChat(userId, chatId)
      .then((response)=>{
        let xhr = response as XMLHttpRequest,
            success = xhr.status==200;
            return { 
              isSuccess: success,
              data: success ? "" : JSON.parse(xhr.responseText).reason
            };
      });
    }   
    
    private async _createNewChat(title:string):Promise<IErrorOrDataResponse>{
      return await this._api.createChat(title)
      .then((response)=>{
        let xhr = response as XMLHttpRequest,
        data = JSON.parse(xhr.responseText),
        success = xhr.status==200,
        result:IErrorOrDataResponse = { 
          isSuccess: success,
          data: success ? data.id : data.reason
        };
        return result;
      });
    }

    private async _getChatUsers(id:number){
      return await this._api.getChatUsers(id).then((response)=>{
        let xhr = response as XMLHttpRequest;
        if(xhr.status!=200){ console.log(xhr); }
        else{
          let chatUsers:UserInChatModel[] = JSON.parse(xhr.responseText);
          
          let currentUserId = store.getState().user?.id;
          store.set("chat.chatContent.chatUsers", chatUsers.filter(user => user.id!=currentUserId));
        }
      });
    }

    /* public action methods */

    /* all actions from select to loading chat data */
    public async selectChat(id: number){
      const currentChatId = store.getState().chat.chatId;
      if(currentChatId==id){ return; }
      store.set("chat.chatContent.chatMessages.isLoading", true);
      store.set("chat.chatId", id);
      store.set("chat.chatContent.chatMessages.messages", new Array<MessageDetailsModel>());//clean old data

      const selectedChat = store.getState().chat.chatList.chats.find(chat => chat.id === id);

      if(!selectedChat){ console.log("selectChat : no chat find in the list"); }
      await this._getChatUsers(id); 
      messageController.getOldMessages(id);
      store.set("chat.chatContent.state", ChatContentState.CHAT_MESSAGES);
    }    

    /* all actions from create to add user */
    public async createChat(title:string){

      store.set("chat.chatOptions.createChat.isLoading", true);

      const result:IErrorOrDataResponse = await this._createNewChat(XssProtect.sanitizeHtml(title));
      if(!result.isSuccess){ 
        store.set("chat.chatOptions.createChat.error", result.data);
      }else{ 
        let chatId = result.data as unknown as number;
        let userId = store.getState().user?.id!;
        const selectedChat:ChatInfoModel = {
          id: chatId,
          last_message: null,
          avatar: null,
          title: title,
          unread_count: 0,
          created_by: userId,
          socket: null,
          token:null
        };

        await tokenController.setTokenToChatAndCreateWebsocket(selectedChat!, userId);       
        
        //why it's not working in other order????
        this._addChatToStore(selectedChat);
        store.set("chat.chatId", chatId);
        store.set("chat.chatOptions.createChat.isLoading", false);
        store.set("chat.chatContent.state", ChatContentState.CHAT_MESSAGES);
      }
    }

    public async addUserToChat(user:UserWithAvatarModel){
      store.set("chat.chatOptions.addUserToChat.isLoading", true);
      let chatId = store.getState().chat.chatId;
      if(!chatId){ console.log("chat id is null"); }
      else{
        const result:IErrorOrDataResponse = await this._addUserToChat(user.id, chatId);
        if(!result.isSuccess){ console.log(result.data); }
        else{
          this._setChatUsers(user as UserInChatModel);
          store.set("chat.chatOptions.addUserToChat.isLoading", false);
        }
      }
    }

    public async deleteUserFromChat(userId:number){      
      this._api.deleteUserFromChat(userId,store.getState().chat.chatId!)
      .then((response)=>{
        let xhr = response as XMLHttpRequest;
        if(xhr.status!=200){ console.log(xhr); }
        else{
          console.log("in delete chat users");
          const users = store.getState().chat.chatContent.chatUsers;
          store.set("chat.chatContent.chatUsers", users.filter(user => user.id != userId));
        }
      });
    }

    public async saveAvatar(data:FormData){     
      store.set("chat.chatOptions.isLoading", true);
      this._api.saveAvatar(data)
      .then((response)=>{
        let xhr = response as XMLHttpRequest,
          data = JSON.parse(xhr.responseText),
          message;
        if(xhr.status==200){          
          message = "Avatar is saved";
          this.getChats();//todo set new avatar in chat list
        }else{
          message = data.reason;
        }
        store.set("chat.chatOptions.isLoading", false);
        store.set("chat.setAvatar.avatarSaveMessage", message);
      });
    }

    public async deleteChat() {
      store.set("chat.chatOptions.isLoading", true);
      const id= store.getState().chat.chatId; 
      if(!id){ console.log("chat id is null"); return; }
        
      this._api.deleteChat(id)
        .then((response)=>{
          let xhr = response as XMLHttpRequest,
            data = JSON.parse(xhr.responseText),
            message;
          if(xhr.status==200){          
            message = "Chat is deleted";
            this.getChats();
            store.set("chat.chatId", null); 
          }else{
            message = data.reason;
          }
          console.log(message);
          store.set("chat.chatOptions.isLoading", false);
        });
    }

    public async getChats(){ // todo handle error with IError result?
      console.log("get chats called");
      store.set("chat.chatList.isLoading", true);
      await this._api.getChats()
      .then((response)=>{
        let xhr = response as XMLHttpRequest;
        if(xhr.status!=200){ console.log(xhr); }
        else{
          let chats:ChatInfoModel[] = JSON.parse(xhr.responseText);          
          console.log("set tokens");
          tokenController.setTokensToChats(chats);
          console.log("store chats");
          store.set("chat.chatList.chats", chats);
          store.set("chat.chatList.isLoading", false);     
        }
      })
      .catch(console.log);
    }
}

export default new ChatController();
