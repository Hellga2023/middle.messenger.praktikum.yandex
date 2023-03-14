import Handlebars from 'handlebars';
import button from 'bundle-text:./button.hbs';
import './button.css';

export const Button = (data) => {
    let buttonType = data.type || "submit";
    return Handlebars.compile(button)({ text: data.text, type: buttonType})
};

