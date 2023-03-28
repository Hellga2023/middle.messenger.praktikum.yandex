const profileForm = `   {{{avatar}}}
                        <h1 class="header">{{name}}</h1>
                        <div class="profile-container__info">
                            {{#each userinfos}}
                                {{{this}}}
                            {{/each}}
                        </div>
                        <div class="{{class_}}">
                            {{#if editMode}} 
                                {{{btn}}} 
                            {{else}}
                                {{#each links}}
                                    {{{this}}}
                                {{/each}}
                            {{/if}}
                        </div>`;
export default profileForm;
