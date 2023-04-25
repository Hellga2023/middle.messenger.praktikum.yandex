const userSearch = `
<div class="chat-options__user-search">
    <p>Please find the user to add</p>        
    {{{userSearchInput}}}
    {{#if usersFound}}        
        {{#each userItems}}
            {{{this}}}
        {{/each}}        
    {{else}}
        <p>No users found, try again</p>
    {{/if}}    
</div>`;
export default userSearch;
