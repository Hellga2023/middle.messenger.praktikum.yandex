class WebSocketService {

    private _socket:WebSocket;


    public createWebsocket(userId:number, chatId:number, token:string){
        this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`); 
        
        this._socket.addEventListener('open', () => {
            console.log('Соединение установлено');
          
            this.sendMessage('Моё первое сообщение миру!');
            
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
            console.log('Получены данные', event.data);
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
}

export default WebSocketService;
