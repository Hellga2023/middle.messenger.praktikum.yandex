const selectedChat = `  
                {{#if isLoading}}
                        Loading...
                {{else}}
                <div class="chat-content__user">

                        {{{shortUserInfo}}}
                                                                     
                        {{{addUserButton}}}                       
                </div>
                <div class="chat-content__messages">
                        {{message}}
                        {{{userSearch}}}
                        {{#each messages}}
                                {{{this}}}
                        {{/each}}
                </div>                
                <div class="chat-content__new-message-block">
                        {{{messageInput}}}             
                </div>   
                {{/if}}
                `;
export default selectedChat;
/*
<div>{{date}}</div>
                <div>{{#each messages}}
                        {{{this}}}
                     {{/each}} 
                </div>*/
