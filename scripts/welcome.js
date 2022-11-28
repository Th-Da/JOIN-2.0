/**
 * initial load function
 */
async function initLogin() {
    await downloadFromServer();
    loadFromBackend();
}


/**
 * signs up a new user if do not already exists
 */
async function signUp() {
    let userNameInput = document.getElementById('user-name').value.toLowerCase();
    let passwordInput = document.getElementById('user-password').value;
    if (!userExists(userNameInput)) {
        pushNewUserInArray(userNameInput, passwordInput);;
        await saveUserToBackend();
        window.location.replace('index.html')
    } else {
        document.getElementById('wrong-login-data-container').classList.remove('opacity-zero')

    }
}


/**
 * searches for existing users
 */
function userExists(userNameInput) {
    return userData.find(({ username }) =>
        username == userNameInput)
}


/**
 * pushs the user in userData array
 */
function pushNewUserInArray(userNameInUserData, passwordInUserData) {
    if (userData.find(({ username }) =>
        username == userNameInUserData)) {
        document.getElementById('wrong-login-data-container').classList.remove('opacity-zero')
    } else {
        userData.push({
            'isLoggedIn': true,
            'username': userNameInUserData,
            'password': passwordInUserData
        });
    }
}


/**
 * searches for insert login data in userData array
 */
function login() {
    let userNameInput = document.getElementById('user-name').value.toLowerCase();
    let passwordInput = document.getElementById('user-password').value;
    checkIfLoginDataValid(userNameInput, passwordInput)
}

/**
 * checks if login data is valid
 * 
 * @param {boolean} userNameInUserdata - a true/false boolean if have found element
 * @param {boolean} passwordInUserData - a true/false boolean if have found element
 */
async function checkIfLoginDataValid(userNameInput, passwordInput) {
    let loggedInUser = backend.getUser('userData');
    userData = JSON.parse(loggedInUser);
    if (userData.find(({ username, password, isLoggedIn }) =>
        username == userNameInput && password == passwordInput)) {
        userData.forEach(user => {
            user['isLoggedIn'] = true;
        });
        await saveUserToBackend();
        window.location.replace('./index.html');
    } else {
        document.getElementById('wrong-login-data-container').classList.remove('opacity-zero')
    }
}

/**
 * runs login function on keypress enter
 */
function enter() {
    let input = document.getElementById('user-password');
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            login()
        }
    });
} 