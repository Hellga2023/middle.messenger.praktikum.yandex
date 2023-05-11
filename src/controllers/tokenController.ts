import ChatAPI from "../api/chatAPI";
import { ChatInfoModel } from "../models/models";
import { store } from "../modules/store";
import WebSocketService from "../utils/websocketService";
import messageController from "./messageController";

class IErrorOrDataResponse{
    isSuccess: boolean;
    data: string;
  }

class TokenController {

    private _api : ChatAPI;

    constructor(){
        this._api = new ChatAPI();
    }

    public async setTokensToChats(chats:ChatInfoModel[]){
        const userId = store.getState().user?.id!;
        chats.forEach(async (chat) => {
            await this.setTokenToChatAndCreateWebsocket(chat, userId);
        });
        console.log("chats with sockets");
        console.log(chats);
    }
  
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

    public async setTokenToChatAndCreateWebsocket(chat:ChatInfoModel,userId:number){
        const tokenResult:IErrorOrDataResponse = await this._getToken(chat.id);
        if(tokenResult.isSuccess){ 
          chat.token = tokenResult.data;
          chat.socket = this._createWebsocket(userId, chat.id, chat.token, messageController.onGetSocketData);
        }else{ 
            console.log("error while getting token : " + tokenResult.data);
        }
    }

    private _createWebsocket(userId:number, chatId:number, token:string, callback:(data:any, chatId:number)=>void):WebSocketService{
        let service = new WebSocketService();
        service.createWebsocket(userId, chatId, token, callback);      
        return service;
    }
}

export default new TokenController();
