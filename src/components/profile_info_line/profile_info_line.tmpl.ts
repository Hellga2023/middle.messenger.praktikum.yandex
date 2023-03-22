const info_line = `<div class="info-line {{class_}}">
                <label class="info-line__label">{{label}}</label>
                <input type="text" name="{{name}}" class="info-line__input" {{#if hasValue }} value="{{ value }}"{{/if}} {{#if isDisabled }} disabled="true"{{/if}}/>
            </div>`; 
export default info_line;
