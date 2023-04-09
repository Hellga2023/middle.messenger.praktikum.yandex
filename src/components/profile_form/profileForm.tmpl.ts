const profileForm = `  {{#if isLoading}} 
                            Loading...
                        {{else}}
                            {{{avatar}}}
                        <h1 class="header">{{username}}{{first_name}}</h1>
                        <div class="profile-container__info">
                            {{#each userinfos}}
                                {{{this}}}
                            {{/each}}
                            {{userSavingMessage}}
                        </div>
                        <div class="{{footerClass}}">
                            {{#if editMode}} 
                                {{{btn}}} 
                            {{else}}
                                {{#each links}}
                                    {{{this}}}
                                {{/each}}
                            {{/if}}                            
                        </div>
                        
                        {{/if}}`;
export default profileForm;
