import { store } from "../modules/store";
import ChatAPI from "../api/chatAPI";
import WebSocketService from "../utils/websocketService";

class ChatController {
    private _api : ChatAPI;

    constructor(){
      this._api = new ChatAPI();
    }

    public async createChat(title:string){
      await this._api.createChat(title)
      .then((response)=>{
        let xhr = response as XMLHttpRequest,
            data = JSON.parse(xhr.responseText);
        if(xhr.status==200){
          console.log("data ");
          console.log(data);
          store.set("chat.currentChatID", data.id);
        }else{
          console.log("reason ");
          console.log(data);
          let reason = data.reason;
          store.set("chat.error", reason);
        }
      })
      .catch(err => {console.log(err);});
    }

    public async getToken(id:number){
      await this._api.getToken(id)
      .then((response)=>{
        let xhr = response as XMLHttpRequest,
            data = JSON.parse(xhr.responseText);
        if(xhr.status==200){
          console.log("token ");
          console.log(data.token);
          let userId = 1;//???? todo! state.chat.userID
          let chatId = store.getState().chat.currentChatID as number;
          this.createWebsocket(userId, chatId, data.token);
          //store.set("chat.currentChatID", data.token);
        }else{
          console.log("reason ");
          console.log(data);
          let reason = data.reason;
          store.set("chat.error", reason);
        }
      })
      .catch(err => {console.log(err);});
    }

    public createWebsocket(userId:number, chatId:number, token:string){
      let service = new WebSocketService();
      service.createWebsocket(userId, chatId, token);

    }
    
}

export default new ChatController();
