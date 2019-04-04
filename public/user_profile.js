/* admin js for team 54 project */


const removePosts = [] //Array of posts to remove
var posts //var to keep posts
var user

//Get DOM from html 
const tableEntries = document.querySelector('#postTable')
const removeEntries = document.querySelector('#posts')
const logOut = document.querySelector('#logout')
const logOutButton = document.querySelector('#logOutButton')

//Entries wait for events
tableEntries.addEventListener('click', changeRemoveStatus)
removeEntries.addEventListener('click', remove)
logOut.addEventListener('click', userLogOut)
logOutButton.addEventListener('click', userLogOut)

/**Local use functions */
/**The following functions does not need external severs data
 and can be used just using local data
*/
function changeRemoveStatus(e) {
    e.preventDefault();
    if (e.target.classList.contains('check') ) {
        changeRemoveButton(e.target)
    }
}

function remove(e) {
    e.preventDefault();
    if (e.target.classList.contains('remove') ) {
        removeall()
        deleteInDB()

    }

}

/**External data functions */
/**The following functions  need obtain external severs data first
 and can not be functional just using local data
*/

function userLogOut() {
    const url = '/users/logout';

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'get',
        credentials: 'include', //include in actual log out method so that cookies can be erased
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    console.log('making a request to log out')
    fetch(request)
        .then((res) => {
            // Handle response we get from the API
            // Usually check the error codes to see what happened
            if (res.status === 200) {
                console.log(res)
                window.location.href = res.url;
            } else {
                console.log('status not 200')
                alert('log out not successful')

            }
            console.log(res)
        }).catch((error) => {
        alert('log out not successful')
        // loginNotSuccessful()
        console.log(error)
    })
}

function addPost(){
    // Get a new post information from server
    // code below requires server call
    //We use mock user for phase 1 instead
    post = new Post('user3', 'Find a new nice place');
    posttitles.push(post.title);
    posts.push(post);

    //call DOM function 

    addNewPost(post) 
    

}



/**External data functions */
/**The following functions  need obtain external severs data first
*/
function deleteInDB(){
    
    for (i = 1; i < tableEntries.children[0].childElementCount ; i++) {
            id = tableEntries.children[0].children[i].children[0].innerText
            //users = getUsersOrPosts()
            //console.log(users)
            same = posts.filter(post => post._id == id)
            //console.log(same)
            if (removePosts.includes(id) && same.length > 0){
                post = same[0]
                log(post)
                deletePosts(post._id)

            }
        }
    

}


function getPosts(id) {
    var url = '/users' + id;



    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get user')
       }                
    })
    .then((json) => {
        if (document.title == "CSC309 team54 project admin profile:users"){
            user = json
            json.posts.map(() => addNewPost(u) )
            posts =  json.posts
            console.log(post)
        
        }


        
    }).catch((error) => {
        console.log(error)
    })
}


function deleterPosts(id) {
    var url = '/posts/' + id;
    


    fetch(url, {
        method: 'delete'
    })
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get id')
       }                
    })
    .then((json) => {
        
            console.log(json)
         

        
    }).catch((error) => {
        console.log(error)
    })
}













/**DOM functions */
/**The following functions are used to change DOM elements*/
function changeRemoveButton(button){

    if (button.name == "white"){
        button.name =  "black"
        button.style.backgroundColor = "black";
        checkpoint = button.parentElement.parentElement.parentElement.
        children[0].children[1];
        toremove = button.parentElement.parentElement.children[0].innerText
        removePosts.push(toremove);

    
        
 
    }else if (button.name == "black"){
        button.name =  "white"
        button.style.backgroundColor = "white";
        checkpoint = button.parentElement.parentElement.parentElement.
        children[0].children[1];
        toremove = button.parentElement.parentElement.children[0].innerText
        index =removePosts.indexOf(toremove);
        removePosts.splice(index,1);
        
    

    }
}


function removeall(){
    for (i = 1; i < tableEntries.children[0].childElementCount ; i++) {
        posttitle = tableEntries.children[0].children[i].children[0].innerText
        if (removePosts.includes(posttitle)){
            toremove = tableEntries.children[0].children[i]
            tableEntries.children[0].removeChild(toremove)
            index =removePosts.indexOf(posttitle);
            removePosts.splice(index,1);
            index = posttitles.indexOf(posttitle)
            posttitles.splice(index,1)
            posts.splice(index,1)
            numberOfPosts--;
            i--;

        }
    }

}






function addNewPost(post){
    const likes = post.likes;
    const title = post.postContent;
    const replyNum = post.replies.length;

    const tableRow = document.createElement('tr')

    const nameLabel = document.createElement('td')
	const nameText = document.createTextNode(title)

	nameLabel.appendChild(nameText)
	tableRow.appendChild(nameLabel)

	const postLabel = document.createElement('td')
	const postText = document.createTextNode(likes)
	
	postLabel.appendChild(postText)
	tableRow.appendChild(postLabel)

    const replyNumLabel = document.createElement('td')
	const replyNumText = document.createTextNode(replyNum)
	
	replyNumLabel.appendChild(replyNumText)
    tableRow.appendChild(replyNumLabel)
    
    const checkLabel = document.createElement('td')
    button = document.createElement('button')
    button.className = "check"
    button.name = "white"
    
	checkLabel.appendChild(button) 
	tableRow.appendChild(checkLabel)
  
	tableEntries.children[0].append(tableRow)

}





