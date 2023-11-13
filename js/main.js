

class Login {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	validateonSubmit() {
        let self = this;
    
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            var error = 0;
            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                if (self.validateFields(input) === false) {
                    error++;
                }
            });
            if (error === 0) {
                //do login api here
				localStorage.setItem("auth", 1);
                this.form.submit(); // This should trigger the form submission.
            }
        });
    }
    
        validateFields(field) {
            if (field.value.trim() === "") {
                this.setStatus(
                    field,
                    `${field.previousElementSibling.innerText} cannot be blank`,
                    "error"
                );
                return false;
            } else {
                if (field.type == "password") {
                    if (field.value.length < 8) {
                        this.setStatus(
                            field,
                            `${field.previousElementSibling.innerText} must be at least 8 characters`,
                            "error"
                        );
                        return false;
                    } else {
                        this.setStatus(field, null, "success");
                        return true;
                    }
                } else {
                    this.setStatus(field, null, "success");
                    return true;
                }
            }
        }
    
        setStatus(field, message, status) {
            const errorMessage = field.parentElement.querySelector(".error-message");
    
            if (status == "success") {
                if (errorMessage) {
                    errorMessage.innerText = "";
                }
                field.classList.remove("input-error");
            }
    
            if (status == "error") {
                errorMessage.innerText = message;
                field.classList.add("input-error");
            }
        }
    }

const form = document.querySelector(".login-form");
if (form) {
    const fields= ["email", "password"];
    const validator = new Login(form, fields);
}

//Signup Form
/*class Signup {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	validateonSubmit() {
        let self = this;
    
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            var error = 0;
            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                if (self.validateFields(input) === false) {
                    error++;
                }
            });
            if (error === 0) {
                //do login api here
				localStorage.setItem("auth", 1);
                this.form.submit(); // This should trigger the form submission.
            }
        });
    }
    
        validateFields(field) {
            if (field.value.trim() === "") {
                this.setStatus(
                    field,
                    `${field.previousElementSibling.innerText} cannot be blank`,
                    "error"
                );
                return false;
            } else {
                if (field.type == "password") {
                    if (field.value.length < 8) {
                        this.setStatus(
                            field,
                            `${field.previousElementSibling.innerText} must be at least 8 characters`,
                            "error"
                        );
                        return false;
                    } else {
                        this.setStatus(field, null, "success");
                        return true;
                    }
                } else {
                    this.setStatus(field, null, "success");
                    return true;
                }
            }
        }
    
        setStatus(field, message, status) {
            console.log("setStatus function is called")
            const errorMessage = field.parentElement.querySelector(".error-message");
    
            if (status == "success") {
                if (errorMessage) {
                    errorMessage.innerText = "";
                }
                field.classList.remove("input-error");
            }
    
            if (status == "error") {
                errorMessage.innerText = message;
                field.classList.add("input-error");
            }
        }
    }

const createAccountForm = document.querySelector(".create-account-form");
if (createAccountForm) {
    const fields= ["email", "password", "fname", "surname"];
    const validator = new Signup(form, fields);
}*/

const createAccountForm = document.getElementById ("create-account-form");
const username = document.getElementById ('username');
const email = document.getElementById ('email');
const password = document.getElementById ('password');
const passwordTwo = document.getElementById ('passwordTwo');
const errorElement = document.getElementById ('error-message');

    createAccountForm.addEventListener ('submit', (e) => {
              
        let messages = []
        if(username.value === '' || username.value == null) {
        messages.push('Username is required')
    } 

    if(password.value.length <= 8) {
        messages.push('Password must be at least 8 characters')
    }

    if(messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join('; ')
    }
    })
