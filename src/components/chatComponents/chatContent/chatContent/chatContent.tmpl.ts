const selectedChat = `
                {{#if isLoading}}                
                        Loading...
                        {{{spinner}}}
                {{else}}
                <div class="chat-content__user">
                        <div>{{{chatInfo}}}</div>                                      
                        {{{optionsButton}}}                    
                </div>
                <div>
                
                {{#switch state}}
                        {{#case 0}} 
                                {{{createChat}}} 
                        {{/case}}
                        {{#case 1}} 
                                {{addUserToChatMessage}} 
                        {{/case}}
                        {{#case 2}} 
                                {{{chatMessages}}}
                        {{/case}}
                {{/switch}}                                      
                
                {{error}}

                </div>                          
                 
                {{/if}}`;
export default selectedChat;
