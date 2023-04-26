const dialog =` 
<div class="chat-options__nav-row">{{{backButton}}} {{{closeButton}}}</div>
<div class="chat-options__content">
{{#if isLoading}}
    {{{spinner}}}
{{else}}
    {{#switch state}}
    {{#case 0}} 
        <div class="chat-options__button-row">{{{createChatButton}}} Create new chat</div>
        <div class="chat-options__button-row">{{{addUserButton}}} Add user to chat</div>
        <div class="chat-options__button-row">{{{deleteUserButton}}} Delete user from chat</div>
        <div class="chat-options__button-row">{{{setChatAvatar}}} Set chat avatar</div>
        <div class="chat-options__button-row">{{{deleteChatButton}}} Delete chat</div>
    {{/case}}
    {{#case 1}} 
        {{{addUser}}}
    {{/case}}
    {{#case 2}} 
        {{{deleteUser}}}
    {{/case}}
    {{#case 3}}
        {{{setAvatar}}}
    {{/case}}
    {{#case 4}}
        {{{createChat}}}
    {{/case}} 
    {{/switch}}
{{/if}}
</div>
`;

export default dialog;
