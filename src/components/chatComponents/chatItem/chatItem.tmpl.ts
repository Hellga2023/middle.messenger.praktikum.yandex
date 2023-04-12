const chatItem = `<div class="chat-item {{{class_}}}" data-id="{{{id}}}">
                    <div class="chat-item__user-data">
                        <img alt="user avatar" src="{{{avatar}}}"/>
                        <div class="chat-item__user-data__message-preview">
                            <p class="message-preview__user">{{{title}}}</p>
                            <p>{{{last_message.type}}}</p>
                            <p>{{{last_message.content}}}</p>
                            <p>{{{lastMessage}}}</p>
                        </div>         
                    </div>
                    <div class="chat-item__message-data">
                        <p class="grey-text">{{{convertedTime}}}</p>   
                        {{#if hasUnreadMessages}}
                        <p class="chat-item__message-count">{{{unreadCount}}}</p>
                        {{/if}}
                    </div>   
                  </div>`;
export default chatItem; 
