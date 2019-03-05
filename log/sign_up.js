const signUp = document.querySelector('#signupContent');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const email = document.querySelector('email');

//* Event listeners for button submit and button click */
signUp.addEventListener('click', allClickEvents);

// Functions that don't edit DOM themselves, but can call DOM functions
function allClickEvents(e) {
    // e.preventDefault();

    if(e.target.id === 'submit') {
        console.log('sugn up submit');
        //check if username and email is in current users list from server
        users.push(username, email, password);
    }
}