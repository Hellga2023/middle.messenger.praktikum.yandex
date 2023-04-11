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
                    {{#if isLoading}} 
                        Loading...
                    {{else}}
                        {{#if selectedChatId}} 
                            {{{chatContent}}}
                        {{else}}
                            create chat
                            {{{chatTitle}}}
                            {{{createChatBtn}}}
                            {{error}}                                                  
                        {{/if}}
                    {{/if}}
                        
                </div>`;
export default chat;
