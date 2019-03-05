/* admin js for team 54 project */
let numberOfUsers = 0;
let numberOfPosts = 0;
// global arrays
const users = [] // Array of users
const posts = [] // Array of posts
const removeUsers = []  //Array of Users to remove
const removePosts = [] //Array of posts to remove
const usernames = [] //Array of Usersnames
const posttitles = [] // Array of post titles


//The user class
class User {
	constructor(name,password,email) {
		this.name = name
		this.password = password
		this.email = email

		// set user's posts and times of reported to 0
        this.numOfPosts = 0;
        this.numOfReported = 0;
		numberOfUsers++;
	}


}

//The post class
class Post {
	constructor(username,title) {
		this.username = username
		this.title = title

		// set times of being reported to 0
        this.numOfReported = 0;
		numberOfPosts++;
	}
}

//Get DOM from html 
const tableEntries = document.querySelector('#usersTable')
const removeEntries = document.querySelector('#usersAndposts')

//Entries wait for events
tableEntries.addEventListener('click', changeRemoveStatus)
removeEntries.addEventListener('click', remove)


/** Add data to global array
 user3 is added by calling addUser
 post3 is added by calling addPost
 */
user1 = new User('user', 'user', '')
user1.numOfPosts = 2
user1.numOfReported = 1
users.push(user1);
users.push(new User('user2', 'user2', ''));
usernames.push("user")
usernames.push("user2")

post1 = new Post('user','U of T is a great place!')
post1.numOfReported  = 1
posts.push(post1)
posts.push(new Post('user','Free food at BA, come and pick up guys it is free!'))
posttitles.push('U of T is a great place!')
posttitles.push('Free food at BA, come and pick up guys it is free!')

addUser() 
addPost() 

/**call other external data functions to test their functionality */
getReported()
updateName()

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

    }

}

/**External data functions */
/**The following functions  need obtain external severs data first
 and can not be functional just using local data
*/
function addUser(){
     // Get a new user information from server
     // code below requires server call
     //We use mock user for phase 1 instead
     user = new User('user3', 'user3', 'user3');
     usernames.push(user.name);
     users.push(user);

     //call DOM function 
     if (document.title == "CSC309 team54 project admin profile:users"){
        addNewUser(user);
     }

}

function addPost(){
    // Get a new post information from server
    // code below requires server call
    //We use mock user for phase 1 instead
    post = new Post('user3', 'Find a new nice place');
    posttitles.push(post.title);
    posts.push(post);
    index = usernames.indexOf(post.username)

    //call DOM function 
    if (document.title == "CSC309 team54 project admin profile:users"){
        users[index].numOfPosts++
        addPostNum(users[index]) 
    }else if (document.title == "CSC309 team54 project admin profile:posts"){
        addNewPost(post) 
    }

}

function getReported(){
    // Get the post being reported from server
    // code below requires server call
    //We use mock user for phase 1 instead
    //Assume post2 is get reported by some user
    post = posts[1]

    index = usernames.indexOf(post.username)
    post.numOfReported++
    users[index].numOfReported++

    //call DOM function 
    if (document.title == "CSC309 team54 project admin profile:users"){
        addUserReportNum(users[index]) 
    }else if (document.title == "CSC309 team54 project admin profile:posts"){
        addPostReportNum(post) 
    }


}

function updateName(){
    // Get the user whose user name is updated from server
    // code below requires server call
    //We use mock user for phase 1 instead
    //Assume user3 change its name to user4
    user = users[2]
    newName = "user4"

    //call DOM function 
    if (document.title == "CSC309 team54 project admin profile:users"){
        updateNameUser(user,newName) 
    }else if (document.title == "CSC309 team54 project admin profile:posts"){
         updateNamePost(user,newName) 
    }

    user.name = newName

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
            toremove = button.parentElement.parentElement.children[1].innerText
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
                index = removeUsers.indexOf(username);
                removeUsers.splice(index,1);
                index = usernames.indexOf(username)
                usernames.splice(index,1)
                users.splice(index,1);
                numberOfUsers--;
                i--;
                
            }
        }
    }else{
        for (i = 1; i < tableEntries.children[0].childElementCount ; i++) {
           posttitle = tableEntries.children[0].children[i].children[1].innerText
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

}


function addNewUser(user){
    const name = user.name;
    const postNum = user.numOfPosts;
    const reportNum = user.numOfReported;

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

function addPostNum(user){
    name = user.name
    numPost = user.numOfPosts
    index = users.indexOf(user)
    userRow = tableEntries.children[0].children[index+1]
    userRow.children[1].innerText = numPost

}

function addNewPost(post){
    const name = post.username;
    const title = post.title;
    const reportNum = post.numOfReported;

    const tableRow = document.createElement('tr')

    const nameLabel = document.createElement('td')
	const nameText = document.createTextNode(name)

	nameLabel.appendChild(nameText)
	tableRow.appendChild(nameLabel)

	const postLabel = document.createElement('td')
	const postText = document.createTextNode(title)
	
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

function addUserReportNum(user){
    name = user.name
    numReport = user.numOfReported
    index = users.indexOf(user)
    userRow = tableEntries.children[0].children[index+1]
    userRow.children[2].innerText = numReport


}
function addPostReportNum(post) {
    name = post.username
    numReport = post.numOfReported
    index = posts.indexOf(post)
    postRow = tableEntries.children[0].children[index+1]
    postRow.children[2].innerText = numReport

}


function updateNameUser(user,newName) {
    index = users.indexOf(user)
    userRow = tableEntries.children[0].children[index+1]
    userRow.children[0].innerText = newName

}
    
function updateNamePost(user,newName) {
    name = user.name
    for (i = 1; i < tableEntries.children[0].childElementCount ; i++) {
        username = tableEntries.children[0].children[i].children[0].innerText
        if (username == name){
            tableEntries.children[0].children[i].children[0].innerText = newName

        }
    }

}