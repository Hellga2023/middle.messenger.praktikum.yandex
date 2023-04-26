const chatList = `
               {{#if isLoading}}
               Loading...
               {{{spinner}}}
               {{else}}
                  <div class="chat-list">
                    {{#each chatItems}}
                       {{{this}}}
                     {{/each}} 
                  </div>
               {{/if}}`;
export default chatList;
