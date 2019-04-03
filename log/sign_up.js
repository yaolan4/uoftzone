const signUp = document.querySelector('#signupContent');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const email = document.querySelector('email');

//* Event listeners for button submit and button click */
signUp.addEventListener('click', allClickEvents);

// Functions that don't edit DOM themselves, but can call DOM functions
function allClickEvents(e) {
    // e.preventDefault();

    if (e.target.id === 'submitButton' || e.target.id === 'submitLink') {
        //match the user and pswd through server
        console.log('username is ' + username.value + 'password is ' + password.value);
 
        if (username.value === 'user' && password.value === 'user')  {
            const a = document.querySelector('#submitLink');
            a.setAttribute("href", "../main_sections/logged_q.html");

            console.log('user signed up and logged in')
        }  else{
            //prompt user username and password does not match or username does not exist
            //manipulate dom to let users know that log in not successful
            console.log('log in not successful');
             
             if (!signUp.lastElementChild.classList.contains('red')) {
                    signupNotSuccessful();
            }
                
        }
    }
}






// DOM functions

// This function adds the post to the postBox on the page that the user wants to post.
function signupNotSuccessful() {
    const signupNotSucceed = document.createElement('div');
    signupNotSucceed.className = 'red';
    signupNotSucceed.appendChild(document.createTextNode('Username or password not valid'));
    signUp.appendChild(signupNotSucceed);
}