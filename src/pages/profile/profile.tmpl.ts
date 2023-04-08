const profile = `
{{{sectionLeft}}}  
<main>
{{#if isLoading}} 
    Loading...
{{else}}
<p>{{first_name}}</p>
    {{{profileForm}}}                    
{{/if}}
</main>
`; 

export default profile;
