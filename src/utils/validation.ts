const Validation = {

    ERROR_CLASS : "error",

    validateLogin(value:string):boolean{
        const regex = /(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}/;
        return regex.test(value);
    },

    validateName(value:string):boolean{
        const regex = /^[A-Z]{1}[A-za-z-]*$/;
        return regex.test(value);
    },

    validatePassword(value:string):boolean{
        const regex = /^(?=.*\d)(?=.*[A-Z]).{8,40}$/;
        return regex.test(value);
    },

    validateEmail(value:string):boolean{
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value);
    },
    validatePhone(value:string):boolean{
        const regex = /^((\+[0-9])|([0-9])){10,15}$/;
        return regex.test(value);
    },
    validateMessage(value:string):boolean{
        return value.length !== 0;
    },
    validateForm(form:HTMLFormElement):boolean{
        console.log("validation started");
        let formData = new FormData(form);
        let validateFn:Function, 
        isValid:boolean = true, 
        isFormValid:boolean = true,
        data:any = {};

        for (const [key, value] of formData) {

            validateFn = this.chooseMethod(key);
            data[key] = value;

            if(!validateFn){
                continue;
                //throw new Error("no validation function found"); todo
            }
            isValid = validateFn(value);
            if(!isValid){
                isFormValid = false;
            }
            form.elements[key].classList[isValid?"remove":"add"](this.ERROR_CLASS); 

        }   
        console.log(data);   
        return isFormValid;
    },
    chooseMethod(name:string):Function{
        let validateFn:(value:string)=>boolean;
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
        
        return validateFn;
    }
} 

export default Validation;
