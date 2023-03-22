const chat = `  <div class="leftMenu">
                    <div class="text-right">
                        {{{link}}}
                        <input type="search" class="search" placeholder="Search"/>
                    </div>
                    <div>
                        {{#each chat_items}}
                            {{{this}}}
                        {{/each}} 
                    </div>
                </div>
                <div class="chat-content">
                    <div class="chat-content__user">
                        <img alt="user avatar" src="{{selectedChat.avatarUrl}}"/>
                        <p>{{selectedChat.username}}</p>
                    </div>
                    <p>Please select chat to send the message</p>    
                </div>`;
export default chat;
