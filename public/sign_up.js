const signUp = document.querySelector('#signupContent');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const home = document.querySelector('#loginBox');

//* Event listeners for button submit and button click */
signUp.addEventListener('click', allClickEvents);
home.addEventListener('click', allClickEvents);


function userSignUp() {
    const url = '/users';
    // The data we are going to send in our request
    let data = {
        name: username.value,
        password: password.value,
        email: email.value,
        posts: [],
        reported: 0
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    fetch(request)
        .then((res) => {
            // Handle response we get from the API
            // Usually check the error codes to see what happened
            if (res.status === 200) {
                console.log('Added user')
                if (!signUp.lastElementChild.classList.contains('green')) {
                    const signupSucceed = document.createElement('div');
                    signupSucceed.className = 'green';
                    signupSucceed.appendChild(document.createTextNode('Sign up successful'));
                    signUp.appendChild(signupSucceed);
                    window.location.href = res.url;
                }
            } else {
                alert('sign up not successful')
                // window.location.href = "/main_sections/public/index.html"
                // window.location.replace('/main_sections/public/index.html') how to navigate after sign up?
            }
            console.log(res)

        }).catch((error) => {
        alert('sign up not successful')
        console.log(error)
    })
}

function backToHome() {
    const url = '/users/logout';
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then((res) => {
            // Handle response we get from the API
            // Usually check the error codes to see what happened
            if (res.status === 200) {
                console.log('user cancel')
                window.location.href = res.url
            } else {
                alert('cancel not successful')
            }
            console.log(res)

        }).catch((error) => {
        alert('cancel not successful')
        console.log(error)
    })

}

// Functions that don't edit DOM themselves, but can call DOM functions
function allClickEvents(e) {
    // e.preventDefault();

    if (e.target.id === 'submitButton' || e.target.id === 'submitLink') {
        //match the user and pswd through server
        console.log('username is ' + username.value + 'password is ' + password.value);
        userSignUp();
        //
        // if (username.value === 'user' && password.value === 'user')  {
        //     const a = document.querySelector('#submitLink');
        //     a.setAttribute("href", "../main_sections/logged_q.html");
        //
        //     console.log('user signed up and logged in')
        // }  else{
        //     //prompt user username and password does not match or username does not exist
        //     //manipulate dom to let users know that log in not successful
        //     console.log('log in not successful');
        //
        //      if (!signUp.lastElementChild.classList.contains('red')) {
        //             signupNotSuccessful();
        //     }
        //
        // }
    } else if (e.target.id === 'cancelButton' || e.target.id === 'cancelLink' || e.target.id === 'loginBox' || e.target.id === 'title') {
        backToHome(); //back to home page
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