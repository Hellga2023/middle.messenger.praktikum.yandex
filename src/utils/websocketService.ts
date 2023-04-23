class WebSocketService {
    
    private _socket:WebSocket;

    public createWebsocket(userId:number, chatId:number, token:string, getDatacallback: Function){
        this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`); 
        
        this._socket.addEventListener('open', () => {
            console.log('Соединение установлено');
        });
          
        this._socket.addEventListener('close', event => {
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения');
          }        
          console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
        
        this._socket.addEventListener('message', event => {
          console.log('Получены данные', event.data);
          console.log(event);
          getDatacallback(event.data);
        });
        
        this._socket.addEventListener('error', event => {
          console.log('Ошибка', event);
        });
    }

    public sendMessage(message:string){      
      if(this._socket.OPEN){
        this._socket.send(JSON.stringify({
          content: message,
          type: 'message',
        }));
      } 
    }

    public getOldMessages() {
      if(this._socket.readyState === 1){
        console.log("send message");
        return this._socket.send(JSON.stringify({
          content: '0',
          type: 'get old',
        })); 
      }else if(this._socket.readyState === 0){
        setTimeout(() =>{
          this.getOldMessages();
      }, 1000);
      }            
    }
}

export default WebSocketService;
