
const removeUsers = []  //Array of Users to remove
const removePosts = [] //Array of posts to remove

log = console.log


//Get DOM from html 
const tableEntries = document.querySelector('#usersTable')
const removeEntries = document.querySelector('#usersAndposts')

var posts
var users

//Entries wait for events
tableEntries.addEventListener('click', changeRemoveStatus)
removeEntries.addEventListener('click', remove)

/**call get function at beginning to get all data */
getUsersOrPosts()


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
        deleteInDB()
        removeall()

    }
}

/**External data functions */
/**The following functions  need obtain external severs data first
*/

function deleteInDB(){
    if (document.title == "CSC309 team54 project admin profile:users"){
        for (i = 1; i < tableEntries.children[0].childElementCount ; i++) {
            username = tableEntries.children[0].children[i].children[0].innerText
            //users = getUsersOrPosts()
            //console.log(users)
            same = users.filter(user => user.name == username)
            //console.log(same)
            if (removeUsers.includes(username) && same.length > 0){
                user = same[0]
                log(user)
                deleteUsersOrPosts(user._id)

            }
        }
    }else if (document.title == "CSC309 team54 project admin profile:posts"){
        for (i = 1; i < tableEntries.children[0].childElementCount ; i++) {
            id = tableEntries.children[0].children[i].children[0].innerText
            //users = getUsersOrPosts()
            //console.log(users)
            same = posts.filter(post => post._id == id)
            //console.log(same)
            if (removePosts.includes(id) && same.length > 0){
                post = same[0]
                log(post)
                deleteUsersOrPosts(post._id)

            }
        }
    }

}


function getUsersOrPosts() {
    var url
    if (document.title == "CSC309 team54 project admin profile:users"){
        url = '/users';
    }else if (document.title == "CSC309 team54 project admin profile:posts"){
        url = '/posts';
    }


    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get students')
       }                
    })
    .then((json) => {
        if (document.title == "CSC309 team54 project admin profile:users"){
            json.users.map((u) => addNewUser(u) )
            users =  json.users
            console.log(users)
        }else if (document.title == "CSC309 team54 project admin profile:posts"){
            json.posts.map((u) =>addNewPost(u) )
            posts = json.posts
            console.log(posts)
        }


        
    }).catch((error) => {
        console.log(error)
    })
}


function deleteUsersOrPosts(id) {
    var url
    if (document.title == "CSC309 team54 project admin profile:users"){
        url = '/users/' + id;
    }else if (document.title == "CSC309 team54 project admin profile:posts"){
        url = '/posts/' + id;
    }


    fetch(url, {
        method: 'delete'
    })
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get students')
       }                
    })
    .then((json) => {
        if (document.title == "CSC309 team54 project admin profile:users"){
            console.log(json)
          
        }else if (document.title == "CSC309 team54 project admin profile:posts"){
            console.log(json)
         
        }

        
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
        if (checkpoint.innerText ==  "# of Posts" ){
            toremove = button.parentElement.parentElement.children[0].innerText
            removeUsers.push(toremove);

    
        } else{
            toremove = button.parentElement.parentElement.children[0].innerText
            removePosts.push(toremove);

    
        }
 
    }else if (button.name == "black"){
        button.name =  "white"
        button.style.backgroundColor = "white";
        checkpoint = button.parentElement.parentElement.parentElement.
        children[0].children[1];

    
    
        if (checkpoint.innerText ==  "# of Posts" ){
            toremove = button.parentElement.parentElement.children[0].innerText
            index = removeUsers.indexOf(toremove)
            removeUsers.splice(index,1);

    
        } else{
            toremove = button.parentElement.parentElement.children[1].innerText
            index =removePosts.indexOf(toremove);
            removePosts.splice(index,1);
        }
    }

}


function removeall(){
    checkpoint = tableEntries.children[0].children[0].children[1];

    if (checkpoint.innerText ==  "# of Posts" ){
        for (i = 1; i < tableEntries.children[0].childElementCount ; i++) {
            username = tableEntries.children[0].children[i].children[0].innerText
            if (removeUsers.includes(username)){
                toremove = tableEntries.children[0].children[i]
                tableEntries.children[0].removeChild(toremove)
                index =removeUsers.indexOf(username);
                removeUsers.splice(index,1);
                i--;
                
            }
        }
    }else{
        for (i = 1; i < tableEntries.children[0].childElementCount ; i++) {
           postid = tableEntries.children[0].children[i].children[0].innerText
            if (removePosts.includes(postid)){
                toremove = tableEntries.children[0].children[i]
                tableEntries.children[0].removeChild(toremove)
                index =removePosts.indexOf(postid);
                removePosts.splice(index,1);
                i--;

            }
        }

    }

}


function addNewUser(user){
    const name = user.name;
    const postNum = user.posts.length;
    const reportNum = user.reported;

    const tableRow = document.createElement('tr')

    const nameLabel = document.createElement('td')
	const nameText = document.createTextNode(name)

	nameLabel.appendChild(nameText)
	tableRow.appendChild(nameLabel)

	const postNumLabel = document.createElement('td')
	const postNumText = document.createTextNode(postNum)
	
	postNumLabel.appendChild(postNumText)
	tableRow.appendChild(postNumLabel)

    const reportNumLabel = document.createElement('td')
	const reportNumText = document.createTextNode(reportNum)
	
	reportNumLabel.appendChild(reportNumText)
    tableRow.appendChild(reportNumLabel)
    
    const checkLabel = document.createElement('td')
    button = document.createElement('button')
    button.className = "check"
    button.name = "white"
    
	checkLabel.appendChild(button) 
	tableRow.appendChild(checkLabel)
  
	tableEntries.children[0].append(tableRow)
}




function addNewPost(post){
    //const name = post.poster;
    const content = post.postContent;
    const reportNum = post.reported
    const id = post._id

    const tableRow = document.createElement('tr')

    
    const idLabel = document.createElement('td')
	const idText = document.createTextNode(id)
	
	idLabel.appendChild(idText)
	tableRow.appendChild(idLabel)

	const postLabel = document.createElement('td')
	const postText = document.createTextNode(content)
	
	postLabel.appendChild(postText)
    tableRow.appendChild(postLabel)
    

    const reportNumLabel = document.createElement('td')
	const reportNumText = document.createTextNode(reportNum)
	
	reportNumLabel.appendChild(reportNumText)
    tableRow.appendChild(reportNumLabel)
    
    const checkLabel = document.createElement('td')
    button = document.createElement('button')
    button.className = "check"
    button.name = "white"
    
	checkLabel.appendChild(button) 
	tableRow.appendChild(checkLabel)
  
	tableEntries.children[0].append(tableRow)

}





