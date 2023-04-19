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
    public addUserToChat(userId: number, chatId: number) {
        return this.http.put('/users', {
            headers: { 'content-type': 'application/json' },
            data:JSON.stringify({users: [userId], chatId: chatId})  
        });
    }
    public getChats() {
        return this.http.get('/');
    }     
    getChatUsers(id: number):Promise<any> {
        return this.http.get(`/${id}/users`);
    }
}

export default ChatAPI;
