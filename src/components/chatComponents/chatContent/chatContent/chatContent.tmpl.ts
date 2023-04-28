const selectedChat = `
                <div class="chat-content__user">
                        <div>{{{chatInfo}}}</div>                                      
                        {{{optionsContainer}}}                    
                </div>
                <div>                
                {{#switch state}}
                        {{#case 0}} 
                                {{{createChat}}} 
                        {{/case}}                        
                        {{#case 1}} 
                                {{{chatMessages}}}
                        {{/case}}
                {{/switch}}
                </div>`;
export default selectedChat;
