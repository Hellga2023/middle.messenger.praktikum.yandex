import { ChatInfoModel, MessageDetailsModel } from "../models/models";
import { store } from "../modules/store";
import WebSocketService from "../utils/websocketService";

/*interface SocketMessage {
  id: number,
  time: string,
  type: string,
  user_id: number
}*/

class MessageController{

    static MessageTypes = {
       MESSAGE: "message",
       OLD_MESSAGES: "get old",
       PING: "ping",
       PONG: "pong",
       USER_CONNETED: 'user connected'
    } as const;

    constructor(){
    }

    public onGetSocketData(data:any, chatId: number){
      const parsedData = JSON.parse(data);
      //console.log(parsedData as SocketMessage);//content id time type user_id
      if(Array.isArray(parsedData)){
        MessageController.addOldMessagesToChat(parsedData);
      }else if(parsedData.type && parsedData.type==MessageController.MessageTypes.PONG){
        console.log("this is ping message")
      }else if(parsedData.type==MessageController.MessageTypes.USER_CONNETED){
        console.log("user connected");
      }else if(parsedData.type==MessageController.MessageTypes.MESSAGE){
        MessageController.addNewMessageToChat(parsedData);
      }
      else{
        console.log("other data");
      }       
    }

    public static addOldMessagesToChat(data:MessageDetailsModel[]):void{
      const messages = new Array<MessageDetailsModel>();
      messages.push(...store.getState().chat.chatContent.chatMessages.messages);
      let messagesArray:MessageDetailsModel[] = data;
      messages.push(...messagesArray);
      messages.sort((a,b)=>{ return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0)});
      store.set("chat.chatContent.chatMessages.messages", messages); 
      store.set("chat.chatContent.chatMessages.isLoading", false);
    }

    public static addNewMessageToChat(message:MessageDetailsModel):void{
      const messages = new Array<MessageDetailsModel>();
      messages.push(...store.getState().chat.chatContent.chatMessages.messages);
      messages.push(message);
      messages.sort((a,b)=>{ return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0)});
      store.set("chat.chatContent.chatMessages.messages", messages);      
    }

    public getOldMessages(chatId:number):any{
      console.log("getOldMessages");
        const chat:ChatInfoModel|undefined = store.getState().chat.chatList.chats.find(chat => chat.id == chatId);
        if(!chat){ console.log("getOldMessages : no chat is found"); return;}
        const socketService:WebSocketService = chat.socket!;
        this._getOldMessages(socketService);       
    }

    private _getOldMessages(socketService:WebSocketService){
      console.log("_getOldMessages");
      if(socketService.getState() === 1){
        console.log("_getOldMessages");
        socketService.sendData(JSON.stringify({
            content: '0',
            type: MessageController.MessageTypes.OLD_MESSAGES,
          }));
      }else if(socketService.getState() === 0){
        setTimeout(() =>{
          this._getOldMessages(socketService);
      }, 1000);
      }else{
        console.log("socket has been closed before get messages");
      }   
    }

    //todo add file or media handle
    public sendMessage(message:string){  
      const chatId = store.getState().chat.chatId;
      const chat:ChatInfoModel|undefined = store.getState().chat.chatList.chats.find(chat => chat.id == chatId);
      if(chat&&chat.socket){
        let socket = chat.socket;
        if(socket!=null){ socket.sendMessage(message); } 
      }else{
        console.log("no chat or no socket");
      }                  
    }    
}

export default new MessageController();
