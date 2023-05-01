const selectedChat = `
                <div class="chat-content__user">
                        <div>{{{chatInfo}}}</div>                                      
                        {{{optionsButton}}}                    
                </div>
                <div>                
                {{#switch state}}
                        {{#case 0}} 
                                <p>Please select existing or create new chat</p>
                        {{/case}}                        
                        {{#case 1}} 
                                {{{chatMessages}}}
                        {{/case}}
                {{/switch}}
                </div>`;
export default selectedChat;
