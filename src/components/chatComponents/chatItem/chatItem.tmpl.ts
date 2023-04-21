const chatItem = `<div class="chat-item {{selectedClass}}">
                    <div class="chat-item__user-data">
                        <img class="chat-item__user-data__avatar" alt="user avatar" src="{{chatInfo.avatar}}"/>
                        <div class="chat-item__user-data__message-preview">
                            <p class="message-preview__user">{{chatInfo.title}}</p>
                            <p>{{chatInfo.last_message.content}}</p>
                        </div>         
                    </div>
                    <div class="chat-item__message-data">
                        <p class="grey-text">{{convertedTime}}</p>   
                        {{#if hasUnreadMessages}}
                        <p class="chat-item__message-count">{{chatInfo.unread_count}}</p>
                        {{/if}}
                    </div>   
                  </div>`;
export default chatItem; 
