/* admin js for team 54 project */

let numberOfPosts = 0;
// global arrays

const posts = [] // Array of posts
const removePosts = [] //Array of posts to remove
const posttitles = [] // Array of post titles



class User {
	constructor(name,password,email) {
		this.name = name
		this.password = password
		this.email = email

		// set user's posts and times of reported to 0
        this.numOfPosts = 0;
        this.numOfReported = 0;
	}


}


//The post class
class Post {
	constructor(username,title) {
		this.username = username
		this.title = title

		// set times of being reported to 0
        this.numOfReported = 0;
        this.numOfLikes = 0;
        this.numOfReplies = 0;
        numberOfPosts++;
        
	}
}

//Get DOM from html 
const tableEntries = document.querySelector('#postTable')
const removeEntries = document.querySelector('#posts')

//Entries wait for events
tableEntries.addEventListener('click', changeRemoveStatus)
removeEntries.addEventListener('click', remove)


/** Add data to global array
 * call server call to get the user's information then create  a user for this user.
 */
user = new User('user', 'user', '')
/** 
 post3 is added by calling addPost
 */


post1 = new Post('user','U of T is a great place!')
post1.numOfReported  = 1
posts.push(post1)
posts.push(new Post('user','Free food at BA, come and pick up guys it is free!'))
posttitles.push('U of T is a great place!')
posttitles.push('Free food at BA, come and pick up guys it is free!')

addPost() 

/**call other external data functions to test their functionality */
getLiked()
getReplied()


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

function getLiked(){
    // Get the post being reported from server
    // code below requires server call
    //We use mock user for phase 1 instead
    //Assume post2 is get reported by some user
    post = posts[1]
    post.numOfLikes++


    //call DOM function 
    addPostLikesNum(post) 
  

}


function getReplied(){
    // Get the post being reported from server
    // code below requires server call
    //We use mock user for phase 1 instead
    //Assume post3 is get reported by some user
    post = posts[2]
    post.numOfReplies++


    //call DOM function 
    addPostReplyNum(post) 
  

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



function addPostNum(user){
    name = user.name
    numPost = user.numOfPosts
    index = users.indexOf(user)
    userRow = tableEntries.children[0].children[index+1]
    userRow.children[1].innerText = numPost

}

function addNewPost(post){
    const likes = post.numOfLikes;
    const title = post.title;
    const replyNum = post.numOfReplies;

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

function addPostLikesNum(post) {

    index = posts.indexOf(post)
    postRow = tableEntries.children[0].children[index+1]
    postRow.children[1].innerText = post.numOfLikes

}

function addPostReplyNum(post) {
    numReport = post.numOfReported
    index = posts.indexOf(post)
    postRow = tableEntries.children[0].children[index+1]
    postRow.children[2].innerText = post.numOfReplies

}



