export default class InputValidator {
    constructor() {
      this.validators = {
        nom: this.validateName,
        email: this.validateEmail,
        filiere: this.validateFiliere,
        date: this.validateDate,
        tel: this.validateTel
      };
    }
  
    validate (inputValue,inputType) {
        const validator = this.validators[inputType];
  
        if(!validator) {
          throw new Error(`Cannot Validate the provided input type : ${inputType}`);
        }
  
        return validator(inputValue);
    }
  
    validateName(input) {
      const regex = /^[a-zA-Z]{2,}$/;
      return regex.test(input);
    }
    validateEmail(input) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(input);
    }
    validateDate(input) {
      const now = new Date();
      console.log(input);
      const valide = now.getFullYear() - input.getFullYear();
      return valide >= 18 ? true : false;
    }
    validateTel(input) {
      const regex = /^06\d{8}$/;
      return regex.test(input);
    }
    validateFiliere(input) {
      const regex = /^[\w\s]{3,}$/;
      return regex.test(input);
    }
  
  }