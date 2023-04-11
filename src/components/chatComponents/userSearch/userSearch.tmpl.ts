const addUserToChat = ` 
<div>
user search
{{{userSearchInput}}}
{{#if usersFound}}
        {{#each userItems}}
            {{{this}}}
        {{/each}} 
    {{/if}}
    
</div>`;
export default addUserToChat;
