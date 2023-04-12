import { store } from "../modules/store";
import ChatAPI from "../api/chatAPI";
import WebSocketService from "../utils/websocketService";
import authController from "./authController";
import { ChatContentState } from "../components/chatComponents/chatContent/chatContent";
import { ChatInfoModel } from "../models/models";

class ChatController {
    
    private _api : ChatAPI;

    constructor(){
      this._api = new ChatAPI();
    }

    public async createChat(title:string){
      store.set("chat.chatContent.isLoading", true);
      await this._api.createChat(title)
      .then((response)=>{
        let xhr = response as XMLHttpRequest,
            data = JSON.parse(xhr.responseText);
        if(xhr.status==200){
          store.set("chat.chatContent.chatId", data.id);
          this.getToken(data.id);
        }else{ store.set("chat.error", data.reason); }
      })
      .catch(console.log);
    }

    public async getToken(id:number){
      await this._api.getToken(id)
      .then((response)=>{
        store.set("chat.chatContent.isLoading", false);
        let xhr = response as XMLHttpRequest,
            data = JSON.parse(xhr.responseText);
        if(xhr.status==200){ store.set("chat.chatContent.token", data.token); }
        else{ store.set("chat.error", data.reason); }
      })
      .catch(err => {console.log(err);});
    }

    public createWebsocket(userId:number, chatId:number, token:string){
      let service = new WebSocketService();
      service.createWebsocket(userId, chatId, token);
      store.set("chat.chatContent.socket", service);
    }

    public showUserSearch() {
      store.set("chat.chatContent.state", ChatContentState.ADD_USER);
    }

    public sendMessage(message:string){
      store.set("chat.chatContent.message", message);
      let socket = store.getState().chat.chatContent.socket;
      if(socket!=null){
        socket.sendMessage(message);
      }      
    }

    public async addUserToChat(userId: number, username: string, avatar: string) { //todo pass user entity or make separate method???
      store.set("chat.chatContent.isLoading", true);
      let chatId = store.getState().chat.chatContent.chatId!; //todo check
      await this._api.addUserToChat(userId, chatId)//todo remake to users array
      .then(async (response)=>{
        let xhr = response as XMLHttpRequest;
        store.set("chat.chatContent.isLoading", false);
          if(xhr.status!=200){
            let data = JSON.parse(xhr.responseText)
            console.log(data.reason);
            //todo show error
          }else{
            store.set("chat.chatContent.state", ChatContentState.CHAT_MESSAGES);
            //console.log("added user id : " + userId);
            store.set("chat.chatContent.shortUserInfo.username", username);
            store.set("chat.chatContent.shortUserInfo.avatar", avatar);

            console.log("shortUserInfo");
            console.log(store.getState().chat.chatContent.shortUserInfo);

            await authController.getUser();
            let token = store.getState().chat.chatContent.token,
              currentUserId = store.getState().profile.user?.id;       
            if(typeof currentUserId == "number"){
              this.createWebsocket(currentUserId, chatId, token);
            }else{
              store.set("chat.error", "no user id");
            }            
          }          
        }).catch(console.log);
    }  
    
    public async getChats(){
      await this._api.getChats()
      .then((response)=>{
        let xhr = response as XMLHttpRequest;
        store.set("chat.chatList.isLoading", false);
        if(xhr.status!=200){
          console.log(xhr);
        }else{
          console.log("chats fetched");          
          console.log(xhr.responseText);
          let chats:ChatInfoModel[] = JSON.parse(xhr.responseText);
          console.log(chats);
          store.set("chat.chatList.chats", chats);
          console.log("store updated");
          console.log(store.getState().chat);
        }
      })
      .catch(console.log);
    }


    public setSelectedChat(id: number) {
      console.log("selected chat set : " + id);
      store.set("chat.selectedChatId", id);
      console.log(store.getState());
    }
}

export default new ChatController();
