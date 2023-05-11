import Handlebars from 'handlebars';

Handlebars.registerHelper('switch', function (value:string, options:any):string{

    this._switch_value_ = value;
    const html = options.fn(this); // Process the body of the switch block
    delete this._switch_value_;
    return html;

});

Handlebars.registerHelper('case', function ():string{

    const args = Array.prototype.slice.call(arguments);
    var options = args.pop();
    const caseValues = args;

    if (this._switch_break_ || caseValues.indexOf(this._switch_value_) === -1){

        return '';

    }
    if (options.hash.break === true){

        this._switch_break_ = true;

    }
    return options.fn(this);

});

export default Handlebars;
