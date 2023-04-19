const selectedChat = `  
                {{#if isLoading}}                
                        Loading...
                        {{{spinner}}}
                {{else}}
                <div class="chat-content__user">
                        <div>
                        {{{shortUserInfo}}}
                        </div>                                      
                        {{{addUserButton}}}                       
                </div>
                <div>

                        {{{chatTitle}}}
                        {{{createChatBtn}}}
                        {{error}}

                        {{message}}
                        {{{userSearch}}}
                        {{{messageList}}}
                </div>                
                <div class="chat-content__new-message-block">
                        {{{messageInput}}}             
                </div>   
                {{/if}}
                `;
export default selectedChat;
