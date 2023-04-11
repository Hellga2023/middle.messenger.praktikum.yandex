const selectedChat = `  
                {{#if isLoading}}
                        Loading...
                {{else}}
                <div class="chat-content__user">

                        <img alt="user avatar" src="{{avatarUrl}}"/>
                        <p>{{username}}</p>
                                                                     
                        {{{addUserButton}}}                       
                </div>
                <div class="chat-content__messages">

                        {{message}}

                        {{{userSearch}}}
                        
                        {{messageEr}}

                </div>                
                <div class="chat-content__new-message-block">
                        
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
