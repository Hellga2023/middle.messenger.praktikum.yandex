import { store } from "../modules/store";
import ChatAPI from "../api/chatAPI";
import WebSocketService from "../utils/websocketService";
import { ChatContentState } from "../components/chatComponents/chatContent/chatContent";
import { ChatInfoModel, MessageDetailsModel, UserInChatModel, UserWithAvatarModel } from "../models/models";

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

    public _hideComponentSpinner(hasError:boolean=false){
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
    
    public async _createNewChat(title:string):Promise<IErrorOrDataResponse>{
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
          store.set("chat.chatContent.chatUsers", chatUsers);
        }
      });
    }

    /* public action methods */

     /* public methods */
     public showUserSearch() {
      store.set("chat.chatContent.state", ChatContentState.ADD_USER);
      console.log(1324264);
    }

    /* all actions from select to loading chat data */
    public async selectChat(id: number){
      
      this._showComponentSpinner(ChatComponents.CHAT_CONTENT);

      store.set("chat.chatContent.chatId", id);
      store.set("chat.chatContent.messages", new Array<MessageDetailsModel>());//clean old data
      

      const tokenResult:IErrorOrDataResponse = await this._getToken(id);
      if(tokenResult.isSuccess){ 
        store.set("chat.chatContent.token", tokenResult.data);
      }else{ 
        this._setChatError(tokenResult.data); return; 
      }
      let userId = store.getState().user?.id;
      let service = this._createWebsocket(userId!, id, tokenResult.data);
      service.getOldMessages();
      await this._getChatUsers(id);  
      store.set("chat.chatContent.state", ChatContentState.CHAT_MESSAGES);    
      this._hideComponentSpinner();
    }

    /* all actions from create to add user */
    public async createChat(title:string){
      this._showComponentSpinner(ChatComponents.CHAT_CONTENT);

      const result:IErrorOrDataResponse = await this._createNewChat(title);
      if(!result.isSuccess){ 
        this._setChatError(result.data); return; 
      }else{ 
        store.set("chat.chatContent.chatId", result.data); 
      }

      const tokenResult:IErrorOrDataResponse = await this._getToken(result.data as unknown as number);
      if(tokenResult.isSuccess){ 
        store.set("chat.chatContent.token", tokenResult.data); 
      }else{ 
        this._setChatError(tokenResult.data); return; 
      }

      this._hideComponentSpinner();
    }

    public async addUserAndOpenChat(user:UserWithAvatarModel){
      this._showComponentSpinner(ChatComponents.CHAT_CONTENT);
      let chatId = store.getState().chat.chatContent.chatId;
      if(!chatId){ this._setChatError("chat id is null"); return; }
      else{
        const result:IErrorOrDataResponse = await this._addUserToChat(user.id, chatId);
        if(!result.isSuccess){ this._setChatError(result.data); return; }
        else{
          let userId = store.getState().user?.id,
              token = store.getState().chat.chatContent.token;
          let service = this._createWebsocket(userId!, chatId, token);          
          service.getOldMessages();
          const chatUsers:UserInChatModel[] = [user as UserInChatModel];
          store.set("chat.chatContent.chatUsers", chatUsers);
          store.set("chat.chatContent.state", ChatContentState.CHAT_MESSAGES);

          this._hideComponentSpinner();
        }
      }
    }
    
    public async getChats(){ // todo handle error with IError result?
      await this._api.getChats()
      .then((response)=>{
        let xhr = response as XMLHttpRequest;
        store.set("chat.chatList.isLoading", false);
        if(xhr.status!=200){ console.log(xhr); }
        else{
          let chats:ChatInfoModel[] = JSON.parse(xhr.responseText);
          store.set("chat.chatList.chats", chats);
        }
      })
      .catch(console.log);
    }
    

    public onGetMessages(data:any){

      const messages = store.getState().chat.chatContent.messages;
      if(Array.isArray(messages)){
        let messagesArray:MessageDetailsModel[] = JSON.parse(data);
        if(Array.isArray(messagesArray)){
          messages.push(...messagesArray);
        }else{
          messages.push(messagesArray)
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
}

export default new ChatController();
