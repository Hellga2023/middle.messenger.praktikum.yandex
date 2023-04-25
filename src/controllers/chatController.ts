import { store } from "../modules/store";
import ChatAPI from "../api/chatAPI";
import WebSocketService from "../utils/websocketService";
import { ChatContentState } from "../components/chatComponents/chatContent/chatContent/chatContent";
import { ChatInfoModel, MessageDetailsModel, UserInChatModel, UserWithAvatarModel } from "../models/models";
import { XssProtect } from "../utils/xssProtect";
import defaultImg from '../../static/defaultAvatar.png';

class IErrorOrDataResponse{
  isSuccess: boolean;
  data: string;
}

enum ChatComponents{
  CHAT_CONTENT,
  CHAT_LIST
}

class ChatController {
    
    private _api : ChatAPI;

    constructor(){
      this._api = new ChatAPI();
    }

    /* private helper methods */
    private _setChatError(error:string){
      store.set("chat.error", error);
      this._hideComponentSpinner(true);
    }

    private _showComponentSpinner(component:ChatComponents):void{
      switch(component){
        case ChatComponents.CHAT_CONTENT:
          store.set("chat.chatContent.isLoading", true);
          break;
        case ChatComponents.CHAT_LIST:
          store.set("chat.chatList.isLoading", true);
          break;
      }      
    }

    private _hideComponentSpinner(hasError:boolean=false){      
      if(hasError){
        store.set("chat.chatContent.isLoading", false);
        return;
      }
      //if no error we will check if messages are in store otherwise check if no messages are in the chat      
      const state = store.getState().chat.chatContent;
      if(state.isLoading){
      //if(state.chatUsers!=null && state.isLoading){// && state.messages.length>0){
        store.set("chat.chatContent.isLoading", false);       
      }
    }

    /* store methods */
    private _addChatToStore(chat:ChatInfoModel){
      const chats = store.getState().chat.chatList.chats;
      chats.unshift(chat);
      console.log("chat list refreshed");
      console.log(chats);
      store.set("chat.chatList.chats", chats);
    }

    private _setChatUsers(user: UserInChatModel){
       //need to create new array cause compare method will check same arrays
      const chatUsers = new Array<UserInChatModel>();
      chatUsers.push(...store.getState().chat.users.chatUsers);
      chatUsers.push(user);
      store.set("chat.users.chatUsers", chatUsers);
    }

    /* private calls to api */

    private async _getToken(id:number):Promise<IErrorOrDataResponse>{
      return await this._api.getToken(id)
      .then((response)=>{
        let xhr = response as XMLHttpRequest,
            data = JSON.parse(xhr.responseText),
            success = xhr.status==200,
            result:IErrorOrDataResponse = { 
              isSuccess: success,
              data: success ? data.token : data.reason
            };
        return result;
      });
    }

    public _createWebsocket(userId:number, chatId:number, token:string):WebSocketService{
      let service = new WebSocketService();
      service.createWebsocket(userId, chatId, token, this.onGetMessages);
      store.set("chat.chatContent.socket", service);
      return service;
    }

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
          store.set("chat.users.chatUsers", chatUsers.filter(user => user.id!=currentUserId));
        }
      });
    }

    private async _createSocketAndGetMessages(chatId:number){
      let state = store.getState(),
          userId = state.user?.id,
          token = state.chat.chatContent.token;
         
        let service = this._createWebsocket(userId!, chatId, token);          
        service.getOldMessages();            
        //store.set("chat.chatContent.state", ChatContentState.CHAT_MESSAGES);
              
    }

    /* public action methods */

    /* all actions from select to loading chat data */
    public async selectChat(id: number){
      
      this._showComponentSpinner(ChatComponents.CHAT_CONTENT);

      store.set("chat.selected.chatId", id);
      store.set("chat.chatContent.messages", new Array<MessageDetailsModel>());//clean old data     

      const tokenResult:IErrorOrDataResponse = await this._getToken(id);
      if(!tokenResult.isSuccess){ 
        this._setChatError(tokenResult.data);        
      }else{ 
        store.set("chat.chatContent.token", tokenResult.data);        
        await this._getChatUsers(id);

        //if users show chat if no users show add user
        let users = store.getState().chat.users.chatUsers;
        if(users.length>0){
          this._createSocketAndGetMessages(id); 
          this._hideComponentSpinner(); 
          this.showChatMessages();
        }else{
          this._hideComponentSpinner();
          store.set("chat.chatContent.state", ChatContentState.ADD_USER);
        }       
      }      
    }    

    /* all actions from create to add user */
    public async createChat(title:string){
      this._showComponentSpinner(ChatComponents.CHAT_CONTENT);

      const result:IErrorOrDataResponse = await this._createNewChat(XssProtect.sanitizeHtml(title));
      if(!result.isSuccess){ 
        this._setChatError(result.data); 
      }else{ 
        let chatId = result.data as unknown as number;
        let userId = store.getState().user?.id;
                
        let chatInList:ChatInfoModel = {
          id: chatId,
          last_message: null,
          avatar: null,
          title: title,
          unread_count: 0,
          created_by: userId!
        };
        //why it's not working in other order????
        this._addChatToStore(chatInList);
        store.set("chat.selected.chatId", chatId);

        const tokenResult:IErrorOrDataResponse = await this._getToken(chatId);
        if(tokenResult.isSuccess){ 
          store.set("chat.chatContent.token", tokenResult.data); 
        }else{ 
          this._setChatError(tokenResult.data); return; 
        }
        this._hideComponentSpinner();  
        store.set("chat.chatContent.state", ChatContentState.ADD_USER);
      }
    }

    public async addUserToChat(user:UserWithAvatarModel){
      this._showComponentSpinner(ChatComponents.CHAT_CONTENT);
      let chatId = store.getState().chat.selected.chatId;
      if(!chatId){ this._setChatError("chat id is null"); return; }
      else{
        const result:IErrorOrDataResponse = await this._addUserToChat(user.id, chatId);
        if(!result.isSuccess){ this._setChatError(result.data); return; }
        else{
          //set chat users if success no open??
          this._setChatUsers(user as UserInChatModel);
          this._createSocketAndGetMessages(chatId);
          //odo check if we can add further
          this._hideComponentSpinner();
        }
      }
    }

    public async deleteUserFromChat(userId:number){      
      this._api.deleteUserFromChat(userId,store.getState().chat.selected.chatId!)
      .then((response)=>{
        let xhr = response as XMLHttpRequest;
        if(xhr.status!=200){ console.log(xhr); }
        else{
          console.log("in delete chat users");
          const users = store.getState().chat.users.chatUsers;
          store.set("chat.users.chatUsers", users.filter(user => user.id != userId));
        }
      });
    }

    public async saveAvatar(data:FormData){     
      store.set("chat.chatOptions.isLoading", true);
      this._api.saveAvatar(data)
      .then((response)=>{
        //loader end
        
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
        //todo rerender makes not showModal!!!
      });
    }
    
    public showChatMessages(){
      if(store.getState().chat.users.chatUsers.length>0){
        store.set("chat.chatContent.state", ChatContentState.CHAT_MESSAGES);
      }         
    }

    public async getChats(){ // todo handle error with IError result?
      console.log("get chats called");
      store.set("chat.chatList.isLoading", true);
      await this._api.getChats()
      .then((response)=>{
        let xhr = response as XMLHttpRequest;
        store.set("chat.chatList.isLoading", false);
        if(xhr.status!=200){ console.log(xhr); }
        else{
          console.log("chats set to store");
          let chats:ChatInfoModel[] = JSON.parse(xhr.responseText);
          store.set("chat.chatList.chats", chats);
        }
      })
      .catch(console.log);
    }    

    public onGetMessages(data:any){
      //temp array fix - need to review isEqual for arrays!!!!
      const messages = new Array<MessageDetailsModel>();
      messages.push(...store.getState().chat.chatContent.messages);
      //const messages = store.getState().chat.chatContent.messages;
      if(Array.isArray(messages)){
        console.log(data);
        let messagesArray:MessageDetailsModel[]|MessageDetailsModel = JSON.parse(data);
        if(Array.isArray(messagesArray)){
          messages.push(...messagesArray);
        }else{
          if(messagesArray.type=="message"){
            messages.push(messagesArray);
          }else if(messagesArray.type=="user connected"){
            console.log("user connected");
          }          
        }
        messages.sort((a,b)=>{ return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0)});
        store.set("chat.chatContent.messages", messages); 
      }else{
        console.log("messages should be an array initially")
      }
    }

    //todo add file or media handle
    public sendMessage(message:string){     
      let socket = store.getState().chat.chatContent.socket;
      if(socket!=null){ socket.sendMessage(message); }            
    }

    //todo move it to resources controller?? 
    public getChatAvatarUrl(path:string|null){
      if(path){
        return "https://ya-praktikum.tech/api/v2/resources" + path;
      }else{
        return defaultImg;
      }      
    }
}

export default new ChatController();
