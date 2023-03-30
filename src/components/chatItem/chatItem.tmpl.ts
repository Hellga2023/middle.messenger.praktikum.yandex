const chatItem = `<div class="chat-item {{{class_}}}" data-id="{{{id}}}">
                    <div class="chat-item__user-data">
                        <img alt="user avatar" src="{{{avatarUrl}}}"/>
                        <div class="chat-item__user-data__message-preview">
                            <p>{{{name}}}</p>
                            <p>{{{last_message.type}}}</p>
                            <p>{{{last_message.content}}}</p>
                        </div>         
                    </div>
                    <div class="chat-item__message-data">
                        <p class="grey-text">{{{time}}}</p>   
                        <p class="chat-item__message-count">{{{unread_messages_count}}}</p>
                    </div>   
                  </div>`;
export default chatItem; 
