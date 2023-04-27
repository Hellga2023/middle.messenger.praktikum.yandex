import { MessageDetailsModel } from "../models/models";
import { store } from "../modules/store";
import WebSocketService from "../utils/websocketService";


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

    public onGetSocketData(data:any){
        let parsed = JSON.parse(data);
        console.log("socket data");
        console.log(parsed);

        //content id time type user_id
    }

    public onGetMessages(data:any){
        //temp array fix - need to review isEqual for arrays!!!!
        const messages = new Array<MessageDetailsModel>();
        messages.push(...store.getState().chat.chatMessages.messages);
        //const messages = store.getState().chat.chatMessages.messages;
        if(Array.isArray(messages)){
          console.log(data);
          let messagesArray:MessageDetailsModel[]|MessageDetailsModel = JSON.parse(data);
          if(Array.isArray(messagesArray)){
            messages.push(...messagesArray);
          }else{
            if(messagesArray.type==MessageController.MessageTypes.MESSAGE){
              messages.push(messagesArray);
            }else if(messagesArray.type=="user connected"){
              console.log("user connected");
            }          
          }
          messages.sort((a,b)=>{ return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0)});
          store.set("chat.chatMessages.messages", messages); 
          store.set("chat.chatMessages.isLoading", false); //todo do we need to place it together with start loading?
        }else{
          console.log("messages should be an array initially")
        }
    }

    public getOldMessages(socketService:WebSocketService):any{
        if(socketService.getState() === 1){
            /*return socketService.send(JSON.stringify({
              content: '0',
              type: 'get old',
            })); */
            return socketService.sendData(JSON.stringify({
                content: '0',
                type: MessageController.MessageTypes.OLD_MESSAGES,
              }));
          }else if(socketService.getState() === 0){
            setTimeout(() =>{
              this.getOldMessages(socketService);
          }, 1000);
          }else{
            console.log("socket has been closed before get messages");
          }         
    }

    //todo add file or media handle
    public sendMessage(message:string){     
        let socket = store.getState().chat.chatContent.socket;
        if(socket!=null){ socket.sendMessage(message); }            
      }

    private async _createSocketAndGetMessages(chatId:number){
        let state = store.getState(),
            userId = state.user?.id,
            token = state.chat.chatContent.token;
           
          let service = this._createWebsocket(userId!, chatId, token, this.onGetMessages);   
          store.set("chat.chatContent.socket", service);
          this.getOldMessages(service);            
          //store.set("chat.chatContent.state", ChatContentState.CHAT_MESSAGES);
                
      }

    public _createWebsocket(userId:number, chatId:number, token:string, callback:Function):WebSocketService{
        let service = new WebSocketService();
        service.createWebsocket(userId, chatId, token, callback);      
        return service;
    }
}

export default new MessageController();
