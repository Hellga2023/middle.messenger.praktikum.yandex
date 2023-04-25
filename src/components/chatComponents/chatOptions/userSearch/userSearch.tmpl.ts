const userSearch = `
<div class="chat-options__user-search">
    <p>Please find the user to add</p>        
    {{{userSearchInput}}}
    {{#if usersFound}}     
        <div class="chat-options__user-list">   
        {{#each userItems}}
            {{{this}}}
        {{/each}} 
        </div>       
    {{else}}
        <p>No users found, try again</p>
    {{/if}}    
</div>`;
export default userSearch;
