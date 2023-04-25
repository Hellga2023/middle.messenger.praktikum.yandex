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
                
                {{#switch contentState}}
                        {{#case 0}} 
                                {{{createChat}}} 
                        {{/case}}
                        {{#case 1}} 
                                {{message}} 
                        {{/case}}
                        {{#case 2}} 
                                {{{messageList}}} 
                                {{{messageInput}}}
                        {{/case}}
                {{/switch}}                                      
                
                {{error}}

                </div>                          
                 
                {{/if}}`;
export default selectedChat;
