let form;
let createAccountForm;
let username;

document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector(".login-form");
    const createAccountForm = document.getElementById ("create-account-form");
    const username = document.getElementById ('username');
    const email = document.getElementById ('email');
    const password = document.getElementById ('password');
    const passwordTwo = document.getElementById ('passwordTwo');
    const errorElement = document.getElementById ('error-message');
    const successMessage = document.getElementById ('success-message');
    const rememberMeCheckbox = document.getElementById ('rememberMe');
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');

    console.log('DOMContentLoaded event listener executed');
    
    //--------------------- Check if there is a remembered email-----------------------------------

    console.log('Remember Me Checkbox:', rememberMeCheckbox); // Add this line
    console.log('Remembered Email:', rememberedEmail); // Log the remembered email for debugging

    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
        console.log('Email input and checkbox updated:', emailInput.value, rememberMeCheckbox.checked);
    }

    console.log('loginForm:', loginForm);
    console.log('emailInput:', emailInput);
    console.log('rememberMeCheckbox:', rememberMeCheckbox);

    loginForm.addEventListener('submit', function (e) {

        // If the "Remember me" checkbox is checked, store the email in localStorage

        if (rememberMeCheckbox.checked) {
            localStorage.setItem('rememberedEmail', emailInput.value);
            console.log('Email stored in localStorage:', emailInput.value);

        } else {

            // If not checked, remove the stored email
            localStorage.removeItem('rememberedEmail');
            console.log('Remembered email removed from localStorage');
        }

     });



class Login {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}
/*
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
    }*/

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
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
    
                // Check if email and password match desired values for login
                if (email === 'admin@gmail.com' && password === 'admin1234') {
                    
                    // Set authentication status
                    localStorage.setItem("auth", 1);
                    
                     // Show alert for successful login
                     alert("Login Successful");

                    // Redirect to the dashboard or desired location after a short delay
                    setTimeout(() => {
                        window.location.href = "/dashboard.html";
                    }, 2000);

                } else {
                    // Show alert for invalid email or password
                    alert("Invalid email or password");
                }
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

            if (form) {
                const fields= ["email", "password"];
                const validator = new Login(form, fields);
            };

//----------------------------Create Account Section---------------------------------------------------

    createAccountForm.addEventListener ('submit', (e) => {
        let messages = []
        
        if(username.value === '' || username.value == null) {
            messages.push('Username is required')
        } 

        if(password.value.length <= 8) {
            messages.push('Password must be at least 8 characters')
        }

        if(password.value.length >=20) {
            messages.push('Password must be less than 20 characters')
        }

        if(password.value === 'password') {
            messages.push('Password cannot be password')
        }

        if(!/\d/.test(password.value)) {
            messages.push('Password must contain at least one number')
        }

        if(password.value !=passwordTwo.value) {
            messages.push('Passwords do not match')
        }

        if(messages.length > 0) {
            e.preventDefault()
            errorElement.innerText = messages.join('; ')
        }

        if (messages.length === 0) {
            // Clear error message
            errorElement.innerText = '';

        // Display success message
        successMessage.innerText = 'Account created successfully!';
        successMessage.style.color = 'green'; // You can customize the style

    // Redirect after a short delay (e.g., 2 seconds)
        setTimeout(() => {
            window.location.href = '/login.html'; // Replace with your desired URL
        }, 3000);

        } else {
            // Display error messages
            errorElement.innerText = messages.join('; ');
        }      

});

//------------------------------------Password re-set-----------------------------------
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('forgotPasswordForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;

        // Simulate the response from the server
        const simulateResponse = {
            ok: true, // Set to false to simulate an error response
            message: 'Password reset email sent successfully', // Optional message
        };

        if (simulateResponse.ok) {
            // Provide feedback to the user
            console.log(simulateResponse.message);
        } else {
            // Handle errors, show appropriate messages to the user
            console.error('Failed to initiate password reset:', simulateResponse.message);
        }
    });
});
});
