const signIn = document.querySelector('#signinContent');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const signinForm = document.querySelector('#signinForm');

//* Event listeners for button submit and button click */
signIn.addEventListener('click', allClickEvents);

// Functions that don't edit DOM themselves, but can call DOM functions
function allClickEvents(e) {
    //e.preventDefault();
    if (e.target.id === 'submitButton' || e.target.id === 'submitLink') {
        //match the user and pswd through server
        console.log('username is ' + username.value + 'password is ' + password.value);
 
        if (username.value === 'user' && password.value === 'user')  {
            const a = document.querySelector('#submitLink');
            a.setAttribute("href", "../main_sections/logged_q.html");

            console.log('user logged in')
        } else if (username.value === 'admin' && password.value === 'admin'){
            const a = document.querySelector('#submitLink');
            a.setAttribute("href", "../main_sections/admin_q.html");

            console.log('admin logged in')

        } else{
            //prompt user username and password does not match or username does not exist
            //manipulate dom to let users know that log in not successful
            console.log('log in not successful');
             
             if (!signIn.lastElementChild.classList.contains('red')) {
                    loginNotSuccessful();
            }
                
        }
    }
}

// DOM functions

// This function adds the post to the postBox on the page that the user wants to post.
function loginNotSuccessful() {
    const loginNotSucceed = document.createElement('div');
    loginNotSucceed.className = 'red';
    loginNotSucceed.appendChild(document.createTextNode('Username and password does not match or username does not exist'));
    signIn.appendChild(loginNotSucceed);
}