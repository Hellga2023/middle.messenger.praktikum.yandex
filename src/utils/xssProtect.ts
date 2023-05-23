import sanitizeHtml from 'sanitize-html';

export class XssProtect {

    public static sanitizeHtml(html:string):string{

        return sanitizeHtml(html, {
            // allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
            disallowedTagsMode: 'recursiveEscape',
        });

    }

}
