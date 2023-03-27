const profile = `
{{{sectionLeft}}}  
<main>
{{{profileForm}}}
</main>
`; 

export default profile;

/**<{{tag}} class="profile-container">
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
</{{tag}}> */
