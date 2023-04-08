const auth = `
    
        <h1 class="header">Welcome</h1>
        {{#if isLoading}} Loading... {{else}}  
        <div class="auth-form__inputs">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            {{#if validationError}} 
            <p class="error">
            {{validationError}} 
            </p>
            {{/if}}
        </div>
    <div class="auth-form__buttons">
        {{{btn}}}
        {{{btn1}}}
        {{{link}}}
    </div>
    {{/if}}
    `;


export default auth;
