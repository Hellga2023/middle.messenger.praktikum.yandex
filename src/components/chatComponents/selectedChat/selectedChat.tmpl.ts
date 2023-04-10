const selectedChat = `  <div class="chat-content__user">
                        <img alt="user avatar" src="{{avatarUrl}}"/>
                        <p>{{username}}</p>
                </div>
                <div class="chat-content__messages">
                <div>{{date}}</div>
                <div>{{#each messages}}
                        {{{this}}}
                     {{/each}} 
                </div>
                </div>                
                <div class="chat-content__new-message-block">
                {{{loadBtn}}}
                {{{messageInput}}}
                {{{sendBtn}}}
                </div>   
                `;
export default selectedChat;
