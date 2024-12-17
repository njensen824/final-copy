const form = document.getElementById('form');
const user_input = document.getElementById('user-input');
const pass_input = document.getElementById('pass-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(user_input.value !== 'user') {
        error_message.innerText = 'Username is incorrect.'
        user_input.parentElement.classList.add('incorrect');
        console.log('user error');
    } else if(pass_input.value !== 'password') {
        error_message.innerText = 'Password is incorrect.'
        pass_input.parentElement.classList.add('incorrect');
        console.log('pass error');
    } else {
        console.log('success');
        window.location.replace("admin.html");
    }
})

const inputs = [user_input, pass_input]
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
            console.log('error removed');
        }
    })
})