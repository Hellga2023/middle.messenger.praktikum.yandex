import {BaseAPI} from './baseAPI';

class ChatAPI extends BaseAPI {

    constructor(){
        super("/chats");
    }
    public createChat(title:string) {
          return this.http.post('/', {
            headers: { 'content-type': 'application/json' },
            data:JSON.stringify({title: title})            
        });
    }
    public getToken(id:number) {
        return this.http.post(`/token/${id}`);
    }
}

export default ChatAPI;
