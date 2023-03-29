/*const auth_input = `
<div class="input-container">
    <label class="input-container__label" for="{{name}}">{{label}}</label>   
    <input class="input-container__input" type="{{type}}" name="{{name}}"/> 
    {{#if errorMessage}} <label class="input-container__errorlabel">{{errorMessage}}</label> {{/if}}
</div>`;

export default auth_input;*/

const auth_input = `
<div class="input-container">
    <label class="input-container__label" for="{{name}}">{{label}}</label>   
    {{{input}}}
    {{{errorLabel}}}
</div>`;

export default auth_input;/**/

