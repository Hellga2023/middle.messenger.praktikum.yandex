export interface IValidationResult {
    errorMessage:string,
    isValid:boolean
}

const Validation = {

    validateLogin(value:string):IValidationResult{
        const regex = /(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}/,
        isValid = regex.test(value);

        return {
            errorMessage: "Login should be 3 to 20 symbols,can contain digits, cannot have spaces or special  characters",
            isValid: isValid
        };
    },

    validateName(value:string):IValidationResult{
        const regex = /^[A-Z]{1}[A-za-z-]*$/,
        isValid = regex.test(value);
        return {
            errorMessage: "First letter should be upper case, no spaces or digits or special characters allowed",
            isValid: regex.test(value)
        };
    },

    validatePassword(value:string):IValidationResult{
        const regex = /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
        isValid = regex.test(value);
        return {
            errorMessage: "Password should be 8 to 40 characters, should have at least one digit or uppercase letter",
            isValid: regex.test(value)
        };
    },

    validateEmail(value:string):IValidationResult{
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            isValid = regex.test(value);

        return {
            errorMessage: "Invalid email",
            isValid: regex.test(value)
        };
    },
    validatePhone(value:string):IValidationResult{
        const regex = /^((\+[0-9])|([0-9])){10,15}$/,
        isValid = regex.test(value);
        return {
            errorMessage: "Phone should have 10 to 15 symbols, should contain only digits or plus at teh beginning",
            isValid: regex.test(value)
        };
    },
    validateMessage(value:string):IValidationResult{
        return {
            errorMessage: "Invalid message",
            isValid: value.length !== 0
        };
    },
    validateInput(name: string, value:string):IValidationResult{
        const validateFn = this.chooseMethod(name);

        if(typeof validateFn == "undefined"){ //todo handle this case
            return {
                isValid: true,
                errorMessage: ""
            };
        }
        const  result = validateFn(value);

        return{
            isValid: result.isValid,
            errorMessage: result.errorMessage
        };
    },

    chooseMethod(name:string):Function{
        let validateFn:(value:string)=>IValidationResult;
        switch(name){
            case "first_name": //todo move to obj
            case "second_name":
            case "display_name":
                validateFn = Validation.validateName;
                break;
            case "login":
                validateFn = Validation.validateLogin;
                break;
            case "password":
                validateFn = Validation.validatePassword;
                break;
            case "email":
                validateFn = Validation.validateEmail;
                break;
            case "phone":
                validateFn = Validation.validatePhone;
                break;
        }

        if(typeof validateFn! == "undefined"){
            //throw new Error("No validation function found for " + name);
            console.log("No validation function found for " + name);
        }
        
        return validateFn;
    }
} 

export default Validation;
