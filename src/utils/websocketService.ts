import { store } from "../modules/store";

class WebSocketService {
    
    private _socket:WebSocket;


    public createWebsocket(userId:number, chatId:number, token:string){
        this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`); 
        
        this._socket.addEventListener('open', () => {
            console.log('Соединение установлено');
          
            //this.sendMessage('Моё первое сообщение миру!');
            
          });
          
          this._socket.addEventListener('close', event => {
            if (event.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }
          
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            console.log(event);
          });
          
          this._socket.addEventListener('message', event => {
            //todo show message
            console.log('Получены данные', event.data);
            this.onGetDataCallback(event.data);
          });
          
          this._socket.addEventListener('error', event => {
            console.log('Ошибка', event);
          }); 
        
  
    }

    public sendMessage(message:string){
        this._socket.send(JSON.stringify({
            content: message,
            type: 'message',
          }));
    }

    public onGetDataCallback(data:any){ //move to chat controller!!
      console.log("in callback");
      console.log(data);
      console.log("array : ", Array.isArray(data));
      console.log(data[0]);
      let messagesArray = JSON.parse(data);
      console.log("array : ", Array.isArray(messagesArray));
      console.log(messagesArray);
      messagesArray.forEach(element => {
        console.log(element.id);
      });

      if(Array.isArray(data)){
        //assume this is messages and save to store 
        //very bad in here, remove somewhere tomorrow!!!
        console.log("assume this is messages");
        console.log(data);
        store.set("chat.chatContent.messages", data);
      }


    }

    public getOldMessages():any { //todo
      if(this._socket.readyState === 1){
        console.log("send message");
        return this._socket.send(JSON.stringify({
          content: '0',
          type: 'get old',
        })); 
      }else{
        console.log("wait a second to send")
        setTimeout(() =>{
          this.getOldMessages();
      }, 1000);
      }            
    }

}

export default WebSocketService;
