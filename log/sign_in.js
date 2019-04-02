const signIn = document.querySelector('#signinContent');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const signinForm = document.querySelector('#signinForm');

//* Event listeners for button submit and button click */
signIn.addEventListener('click', allClickEvents);

// Functions that don't edit DOM themselves, but can call DOM functions
function signIn() {
    const url = '/login';
    // The data we are going to send in our request
    let data = {
        username: username,
        password: password
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API
            // Usually check the error codes to see what happened
            // const message = document.querySelector('#message')
            // if (res.status === 200) {
            //     console.log('Added student')
            //     message.innerText = 'Success: Added a student.'
            //     message.setAttribute("style", "color: green")
            //
            // } else {
            //     message.innerText = 'Could not add student'
            //     message.setAttribute("style", "color: red")
            //
            // }
            console.log(res)

        }).catch((error) => {
        loginNotSuccessful()
        console.log(error)
    })
}


// function allClickEvents(e) {
//     //e.preventDefault();
//     if (e.target.id === 'submitButton' || e.target.id === 'submitLink') {
//         //match the user and pswd through server
//         console.log('username is ' + username.value + 'password is ' + password.value);
//
//
//         if (username.value === 'user' && password.value === 'user')  {
//             const a = document.querySelector('#submitLink');
//             a.setAttribute("href", "../main_sections/logged_q.html");
//
//             console.log('user logged in')
//         } else if (username.value === 'admin' && password.value === 'admin'){
//             const a = document.querySelector('#submitLink');
//             a.setAttribute("href", "../main_sections/admin_q.html");
//
//             console.log('admin logged in')
//
//         } else{
//             //prompt user username and password does not match or username does not exist
//             //manipulate dom to let users know that log in not successful
//             console.log('log in not successful');
//
//              if (!signIn.lastElementChild.classList.contains('red')) {
//                     loginNotSuccessful();
//             }
//
//         }
//     }
// }

// DOM functions

// This function adds the post to the postBox on the page that the user wants to post.
function loginNotSuccessful() {
    const loginNotSucceed = document.createElement('div');
    loginNotSucceed.className = 'red';
    loginNotSucceed.appendChild(document.createTextNode('Username and password does not match or username does not exist'));
    signIn.appendChild(loginNotSucceed);
}