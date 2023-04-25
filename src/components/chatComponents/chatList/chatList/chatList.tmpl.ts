const chatList = `
               {{#if isLoading}}
               Loading...
               {{{spinner}}}
               {{else}}
                    {{#each chatItems}}
                       {{{this}}}
                  {{/each}} 
               {{/if}}`;
export default chatList;
