const auth = `
    <form class="auth-form">
        <h1 class="header">{{#if isLogin}} Welcome {{else}} Create an account {{/if}}</h1>
        <div class="auth-form__inputs">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
        </div>
    <div class="auth-form__buttons">
        {{{btn}}}
        {{{link}}}
    </div>
    </form>`;


export default auth;
