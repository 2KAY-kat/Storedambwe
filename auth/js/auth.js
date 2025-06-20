document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    const passwordInputs = document.querySelectorAll('.password-input');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const passwordInput = this.previousElementSibling;

            // Toggling password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });

        toggleButtons.forEach(button => {
            button.style.display = 'none';
        });

        passwordInputs.forEach((input, index) => {
            input.addEventListener('focus', () => {
                toggleButtons[index].style.display = 'block';
            });

            input.addEventListener('blur', () => {
                if (input.value === '') {
                    toggleButtons[index].style.display = 'none';
                }
            });

        });
    });
});

// checking password strength has never been this easy


document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const meter = document.querySelector('.strength-meter');
    const text = document.querySelector('.strength-text');

    const strength = checkPasswordStrength(password);
    meter.className = 'strength-meter ' + strength;
    text.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
});

function checkPasswordStrength(password) {
    if (password.length < 6) return 'weak';
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$~`?%^&*]/.test(password);
    
    const strength = hasUpperCase + hasLowerCase + hasNumbers + hasSpecialChars;
    
    if (strength >= 4) return 'strong';
    if (strength >= 2) return 'medium';
    return 'weak';
}

// checking password matchibility
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const matchIcon = document.querySelector('.password-match-icon');
    const mismatchIcon = document.querySelector('.password-mismatch-icon');

    if (password === '' || confirmPassword === '') {
        matchIcon.style.display = 'none';
        mismatchIcon.style.display = 'none';
        return;
    }

    if (password === confirmPassword) {
        matchIcon.style.display = 'inline-block';
        mismatchIcon.style.display = 'none';
    } else {
        matchIcon.style.display = 'none';
        mismatchIcon.style.display = 'inline-block';
    }
}


document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // You can add your own checks here if you want
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '../dashboard/index.html'; // Adjust path if needed
});
