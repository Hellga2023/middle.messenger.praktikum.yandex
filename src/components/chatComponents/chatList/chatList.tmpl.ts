const chatList = `
               {{#if isLoading}}
               Loading...
               {{else}}
                    {{#each chatItems}}
                       {{{this}}}
                  {{/each}} 
               {{/if}}`;
export default chatList;
