import { store } from "../modules/store";
import ChatAPI from "../api/chatAPI";
import WebSocketService from "../utils/websocketService";
import authController from "./authController";
import { ChatContentState } from "../components/chatComponents/chatContent/chatContent";

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
    }

    public showUserSearch() {
      store.set("chat.chatContent.state", ChatContentState.ADD_USER);
    }

    public async addUserToChat(userId: number) {
      store.set("chat.chatContent.isLoading", true);
      let chatId = store.getState().chat.chatContent.chatId!; //todo check
      await this._api.addUserToChat(userId, chatId)//todo remake to users array
      .then(async (response)=>{
        console.log("added");
        let xhr = response as XMLHttpRequest;
        console.log(32);
        store.set("chat.chatContent.isLoading", false);
          if(xhr.status!=200){
            let data = JSON.parse(xhr.responseText)
            console.log(data.reason);
            //todo show error
          }else{
            store.set("chat.chatContent.state", ChatContentState.CHAT_MESSAGES);
            //hide users
            //store.set("chat.chatContent.foundUsers", []);
            //hide add user menu
            console.log("user added to chat can fetch user")
            await authController.getUser();
            console.log("waited for user");
            let token = store.getState().chat.chatContent.token,
              currentUserId = store.getState().profile.user?.id;       
            console.log("userID : "+currentUserId);  
            if(typeof currentUserId == "number"){
              this.createWebsocket(currentUserId, chatId, token);
            }else{
              store.set("chat.error", "no user id");
            }            
          }          
        }).catch(console.log);
    }    
}

export default new ChatController();
