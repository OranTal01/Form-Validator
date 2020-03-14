const formSubmit = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

const checkRequired = (inputs) => {
    for (const input of inputs) {
        if (input.value.trim() === '') {
            showError(input, `${getFiledName(input)} is required`);
        } else {
            showSuccess(input);
        }
    }
};

const checkLength = (input, min, max) => {
    const { value } = input;
    if (value.length < min) {
        showError(input, `${getFiledName(input)} must be at least ${min} characters`);
    } else if (value.length > max) {
        showError(input, `${getFiledName(input)} must be less than ${max} characters`);
    }
};

const checkEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
        showSuccess(email);
    } else {
        showError(email, 'Email is not valid');
    }
};

const checkPasswordsMatch = (password, password2) => {
    const { value: value1 } = password;
    const { value: value2 } = password2;
    if (value1 !== value2) {
        showError(password2, 'Passwords do not match');
    }
};

const getFiledName = input => {
    return input.name;
};

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.setAttribute('class', 'form-control error');
    const small = formControl.querySelector('small');
    small.innerText = message;
};

const showSuccess = input => {
    const formControl = input.parentElement;
    formControl.setAttribute('class', 'form-control success');
};

formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});