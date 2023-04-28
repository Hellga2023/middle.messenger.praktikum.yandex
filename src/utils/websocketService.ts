class WebSocketService {
    
    private _socket:WebSocket;
    private _chatId:number;

    public createWebsocket(userId:number, chatId:number, token:string, getDataCallback: Function){
        this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`); 
        this._chatId = chatId;

        this._socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            setInterval(()=>{
              this._socket.send(JSON.stringify({
                type: "ping"
              }));
            }, 59000);
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
          console.log(getDataCallback);
          getDataCallback(event.data, this._chatId);
        });
        
        this._socket.addEventListener('error', event => {
          console.log('Ошибка', event);
        });
    }

    public sendMessage(message:string){  
      this.sendData(JSON.stringify({
        content: message,
        type: 'message', //messageTypes
      }));
    }

    public sendData(data:any){
      if(this._socket.OPEN){
        this._socket.send(data);
      }else{
        console.log("sorry the socket is closed");
      }
    }

    public getState():number{
      return this._socket.readyState;
    }
}

export default WebSocketService;
