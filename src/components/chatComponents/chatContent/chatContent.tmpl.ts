const selectedChat = `  
                {{#if isLoading}}                
                        Loading...
                        {{{spinner}}}
                {{else}}
                <div class="chat-content__user">
                        <div>
                        {{{shortUserInfo}}}
                        </div>                                      
                        {{{showOptions}}}  
                        {{{chatOptions}}}
                    
                </div>
                <div>

                        {{{chatTitle}}}
                        {{{createChatBtn}}}
                        {{error}}

                        {{message}}
                        
                        {{{messageList}}}
                </div>                
                {{{messageInput}}}             
                 
                {{/if}}
                `;
export default selectedChat;
