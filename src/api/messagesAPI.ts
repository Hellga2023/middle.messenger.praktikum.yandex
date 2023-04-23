import { BaseAPI } from './baseAPI';

class ChatMessagesAPI extends BaseAPI {
    request({id}) {
        return this.http.get(`/${id}`);
    }
}
