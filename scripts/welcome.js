let userData = [
    {
        'username': 'admin',
        'password': 'admin'
    }
]

function login() {
    let userNameInUserdata = false;
    let passwordInUserData = false;
    let userNameInput = document.getElementById('user-name').value.toLowerCase() ;
    let passwordInput = document.getElementById('user-password').value;
    for (let i = 0; i < userData.length; i++) {
        const user = userData[i];
        if (user['username'] === userNameInput) {
            userNameInUserdata = true;
        }
        if (user['password'] === passwordInput) {
            passwordInUserData = true;
        }
    }
    checkIfLoginDataValid(userNameInUserdata, passwordInUserData)
}

function checkIfLoginDataValid(userNameInUserdata, passwordInUserData) {
    if (userNameInUserdata && passwordInUserData === true) {
        window.location.replace('../index.html')
    } else {
        document.getElementById('wrong-login-data-container').classList.remove('d-none')
    }
}