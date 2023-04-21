const addUserToChat = ` 
<div>
{{{userSearchInput}}}
{{#if usersFound}}
        {{#each userItems}}
            {{{this}}}
        {{/each}} 
    {{/if}}
    
</div>`;
export default addUserToChat;
