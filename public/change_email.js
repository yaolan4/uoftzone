const content = document.querySelector('#content');
const password = document.querySelector('#newEmail');
const email = document.querySelector('#repeatEmail');

//* Event listeners for button submit and button click */
window.onload=function(){
  document.getElementById("submitButton").addEventListener("click", sub);
}


// Functions that don't edit DOM themselves, but can call DOM functions
function sub(e) {
    e.preventDefault();
    console.log("Yo");
    var x = document.getElementById("oldEmail");
    var username = x.value;
    console.log(username);
    var url = '/change_email/' + username;
    fetch(url, {
        method: 'updateEmail'
    })

    .then((res) => {
        if (res.status === 200) {
           return res.json()
       } else {
            alert('Could not find email')
       }
    })
    .then((json) => {
            console.log(json)


    }).catch((error) => {
        console.log(error)
    })
}
