const content = document.querySelector('#content');
const username = document.querySelector('#oldPassword');
const password = document.querySelector('#newPassword');
const email = document.querySelector('#repeatPassword');

//* Event listeners for button submit and button click */
content.addEventListener('click', allClickEvents);

// Functions that don't edit DOM themselves, but can call DOM functions
function allClickEvents(e) {
    e.preventDefault();

    if(e.target.id === 'submit') {
        //check if pld password matches with the user's password in database
        //if above is true and repeat password is the same as the old one
        //change user's password to the new one
    }
}