const content = document.querySelector('#content');
const username = document.querySelector('#oldEmail');
const password = document.querySelector('#newEmail');
const email = document.querySelector('#repeatEmail');

//* Event listeners for button submit and button click */
content.addEventListener('click', allClickEvents);

// Functions that don't edit DOM themselves, but can call DOM functions
function allClickEvents(e) {
    e.preventDefault();

    if(e.target.id === 'submitLink' || e.target.id === 'submitButton') {
        //check if old email matches with the user's email database
        //if above is true and repeat email is the same as the old one
        //change user's email to the new one
    }
}