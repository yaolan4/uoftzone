'use strict'
// 
// Connect to the local mongo database
const path = window.location.pathname;
const page = path.split("/").pop();
let currentUser = users[0];
const postBody = document.querySelector('#postBodyBox');
//* Event listeners for button submit and button click */
postBody.addEventListener('click', allClickEvents);

// Functions that don't edit DOM themselves, but can call DOM functions 
function allClickEvents(e) {
    e.preventDefault();

    if (e.target.value == 'Submit') {
        if (e.target.parentElement.children[0].value != '') {
            const post = new Post(currentUser.userID, e.target.parentElement.children[0].value, page);
            posts.push(post);
            console.log(post);
            addPostToPostBox(post);
        }
    }
    else if (e.target.classList.contains('feedbackButton')) {
        if (e.target.innerText == 'Report') {
            e.target.innerText = 'Unreport'
            for (let i = 0; i < posts.length; i++) {
                if ((users[posts[i].posterID].userName ==
                    e.target.parentElement.parentElement.children[1].innerText) &&
                    (posts[i].postContent ==
                        e.target.parentElement.parentElement.children[2].innerText) &&
                    posts[i].category == page) {
                    posts[i].reported++;
                }
            }
        }
        else if (e.target.innerText == 'Unreport') {
            e.target.innerText = 'Report'
            for (let i = 0; i < posts.length; i++) {
                if ((users[posts[i].posterID].userName ==
                    e.target.parentElement.parentElement.children[1].innerText) &&
                    (posts[i].postContent ==
                        e.target.parentElement.parentElement.children[2].innerText) &&
                    posts[i].category == page) {
                    posts[i].reported--;
                }
            }
        }
        else if (e.target.innerText == 'Reply') {
            //DOM function to add feedback
            addFeedbackBox(e.target.parentElement.parentElement);
        }
    }
    else if (e.target.classList.contains('cancel')) {
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    }
    else if (e.target.classList.contains('submitReply')) {
        const post = new Post(currentUser.userID, e.target.parentElement.children[0].value, page)
        posts.push(post)
        console.log(post);
        addReplyPost(e.target.parentElement.parentElement, post);
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    }
    else if (e.target.classList.contains('unlike')) {
        e.target.className = 'like';
        e.target.src = 'like.jpg';
        for (let i = 0; i < posts.length; i++) {
            if ((users[posts[i].posterID].userName ==
                e.target.parentElement.parentElement.parentElement.children[1].innerText) &&
                (posts[i].postContent ==
                    e.target.parentElement.parentElement.parentElement.children[2].innerText) &&
                posts[i].category == page) {
                posts[i].likes++;
                console.log(posts[i]);
            }
        }
    }
    else if (e.target.classList.contains('like')) {
        e.target.className = 'unlike';
        e.target.src = 'unlike.jpg';
        for (let i = 0; i < posts.length; i++) {
            if ((users[posts[i].posterID].userName ==
                e.target.parentElement.parentElement.parentElement.children[1].innerText) &&
                (posts[i].postContent ==
                    e.target.parentElement.parentElement.parentElement.children[2].innerText) &&
                posts[i].category == page) {
                posts[i].likes--;
                console.log(posts[i])
            }
        }
    }

}

// DOM functions

// This function adds the post to the postBox on the page that the user wants to post.
function addPostToPostBox(post) {
    const split = document.createElement('div');
    split.className = 'postSplit';
    const thePost = document.createElement('div');
    thePost.className = 'post';

    const iconBox = document.createElement('div');
    iconBox.className = 'posterIconBox';
    const icon = document.createElement('img');
    icon.className = 'posterIcon';
    icon.src = users[post.posterID].photo;
    iconBox.appendChild(icon);

    const username = document.createElement('div');
    username.className = 'userName';
    const name = document.createTextNode(users[post.posterID].userName);
    username.appendChild(name);

    const content = document.createElement('div');
    content.className = 'postContent';
    const contents = document.createTextNode(post.postContent);
    content.appendChild(contents);

    const feedback = document.createElement('form');
    feedback.className = 'feedback';
     const likelink = document.createElement('a');
    likelink.href = "";
    const likeimage = document.createElement('img');
    likeimage.className = 'unlike';
    likeimage.src = 'unlike.jpg';
    likelink.appendChild(likeimage);
    const reply = document.createElement('button');
    reply.className = 'feedbackButton';
    reply.appendChild(document.createTextNode('Reply'));
    const report = document.createElement('button');
    report.className = 'feedbackButton';
    report.appendChild(document.createTextNode('Report'));
    feedback.appendChild(likelink);
    feedback.appendChild(reply);
    feedback.appendChild(report);

    postBody.appendChild(split);
    thePost.appendChild(iconBox);
    thePost.appendChild(username);
    thePost.appendChild(content);
    thePost.appendChild(feedback);
    postBody.appendChild(thePost);

}

function addFeedbackBox(target) {
    const replyBox = document.createElement('form');
    replyBox.className = 'replyArea';
    const textArea = document.createElement('textarea');
    textArea.rows = '8';
    textArea.cols = '150';
    textArea.placeholder = 'Write Your Post Here';
    const reply = document.createElement('input');
    reply.className = 'submitReply';
    reply.type = 'submit';
    reply.value = 'Submit Reply';
    const cancel = document.createElement('input');
    cancel.className = 'cancel';
    cancel.type = 'submit';
    cancel.value = 'Cancel';
    replyBox.appendChild(textArea);
    replyBox.appendChild(reply);
    replyBox.appendChild(cancel);
    target.appendChild(replyBox);
}

function addReplyPost(target, post) {
    const split = document.createElement('div');
    split.className = 'postSplit';
    const thePost = document.createElement('div');
    thePost.className = 'post';

    const iconBox = document.createElement('div');
    iconBox.className = 'posterIconBox';
    const icon = document.createElement('img');
    icon.className = 'posterIcon';
    icon.src = users[post.posterID].photo;
    iconBox.appendChild(icon);

    const username = document.createElement('div');
    username.className = 'userName';
    const name = document.createTextNode(users[post.posterID].userName);
    username.appendChild(name);

    const content = document.createElement('div');
    content.className = 'postContent';
    const contents = document.createTextNode(post.postContent);
    content.appendChild(contents);

    const feedback = document.createElement('form');
    feedback.className = 'feedback';
    const likelink = document.createElement('a');
    likelink.href = "";
    const likeimage = document.createElement('img');
    likeimage.className = 'unlike';
    likeimage.src = 'unlike.jpg';
    likelink.appendChild(likeimage);
    const reply = document.createElement('button');
    reply.className = 'feedbackButton';
    reply.appendChild(document.createTextNode('Reply'));
    const report = document.createElement('button');
    report.className = 'feedbackButton';
    report.appendChild(document.createTextNode('Report'));
    feedback.appendChild(likelink);
    feedback.appendChild(reply);
    feedback.appendChild(report);

    thePost.appendChild(iconBox);
    thePost.appendChild(username);
    thePost.appendChild(content);
    thePost.appendChild(feedback);
    target.appendChild(split);
    target.appendChild(thePost);

}