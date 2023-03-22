const profile = `
{{{sectionLeft}}}  
<main>
<{{tag}} class="profile-container">
  {{{avatar}}}
  <h1 class="header">{{name}}</h1>
  <div class="profile-container__info">
    {{#each infos}}
      {{{this}}}
    {{/each}}
  </div>
  <div class="{{class_}}">
    {{#if isInEditMode}} 
      {{{btn}}} 
    {{else}}
      {{#each links}}
        {{{this}}}
      {{/each}}
    {{/if}}
  </div>
</{{tag}}>
</main>
`; 

export default profile;
