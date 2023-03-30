const chat = `  <div class="leftMenu">
                    <div class="text-right">
                        {{{link}}}
                        <input type="search" class="search" placeholder="Search"/>
                    </div>
                    <div>
                        {{#each chats}}
                            {{{this}}}
                        {{/each}} 
                    </div>
                </div>
                <div class="chat-content">
                    {{{selectedChat}}}    
                </div>`;
export default chat;
