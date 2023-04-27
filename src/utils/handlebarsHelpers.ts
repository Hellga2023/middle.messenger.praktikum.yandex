import Handlebars from "handlebars";

Handlebars.registerHelper("switch", function(value, options) {
    /*console.log("in switch");
    console.log(value);
    console.log(options);*/
    this._switch_value_ = value;
    var html = options.fn(this); // Process the body of the switch block
    delete this._switch_value_;
    return html;
});

Handlebars.registerHelper("case", function(value, options) {
    /*console.log("in case");
    console.log(value);
    console.log(options);*/

    var args = Array.prototype.slice.call(arguments);
        var options    = args.pop();
        var caseValues = args;

    if (this._switch_break_ || caseValues.indexOf(this._switch_value_) === -1) {
        return '';
    } else {
        if (options.hash.break === true) {
            this._switch_break_ = true;
        }
        return options.fn(this);
    }
});

export default Handlebars;
