let posts = getArray('posts'); // sets Array from local storage
if (posts == '') {  // if localStorage is empty use:
posts = [{
    'author': 'Feley',
    'icon': 'img/feli.jpg',
    'location': 'Opel Zoo Kronberg',
    'image': 'img/zebra.jpg',
    'description': 'Ein Zebra im Opel-Zoo.',
    'comments': [],
    'commentPerson': [],
}, {
    'author': 'Marry',
    'icon': 'img/feli.jpg',
    'location': 'Berlin',
    'image': 'img/snowman.jpg',
    'description': 'Der kleinste Schneemann der Welt!',
    'comments': [],
    'commentPerson': [],
}, {
    'author': 'Lotte',
    'icon': 'img/feli.jpg',
    'location': 'Hamburg',
    'image': 'img/pferd.jpg',
    'description': 'Servus!',
    'comments': [],
    'commentPerson': [],
}, {
    'author': 'Luca',
    'icon': 'img/feli.jpg',
    'location': 'Tuttlingen',
    'image': 'img/karpfen.jpg',
    'description': 'Der hohe Karpfen in Seitigen-Oberflacht.',
    'comments': [],
    'commentPerson': [],
},
{
    'author': 'Lars',
    'icon': 'img/feli.jpg',
    'location': 'Karlsruhe',
    'image': 'img/berries.jpg',
    'description': '',
    'comments': [],
    'commentPerson': [],
}
];
}

function loadPosts() {
    document.getElementById('postContainer').innerHTML = '';

    for (let i = 0; i < posts.length; i++) {

        let post = posts[i];

        document.getElementById('postContainer').innerHTML += `
        <div class="post-container">
            <div class="p-icon-author-loca-wrapper">
                <img class="post-icon" src="${post['icon']}">
                <div class="p-author-loca-wrapper">
                    <div class="post-author bold">${post['author']}</div>
                    <div>${post['location']}</div>
                </div>
            </div>   
            <img class="post-image" src="${post['image']}">
            <img class="post-like" onclick="likePost(${i})" id="likePost${i}" src="img/icons/favorite-4-32.png">
            <img class="post-like d-none" onclick="dislikePost(${i})" id="dislikePost${i}" src="img/icons/favorite-2-32.png">
            <div class="post-description">
                <span class="bold">${post['author']}</span>
                ${post['description']}
            </div>
             <div class="comments-container" id="showComments${i}">
             <div class="posted-comments">
             ${combineHTML(post['commentPerson'], post['comments'])}
            
        
              </div> 
            </div>
             
        </div>   
        <div class="comment-section">
            <input type="text" id="name${i}" class="name-input" placeholder="Dein Name">
            <textarea id="comment${i}" onkeyup="checkInputComment(${i})" class="comment-input" type="text" placeholder="Kommentar hinzufügen..."></textarea>
            <button onClick="addComment(${i})" id="commentBtn${i}" class="comment-btn disabled" disabled >Posten</button>      
        </div>
        `;
    }
}

/*
 <div class="posted-comments">
                <span class="bold">Unbekannt&nbsp;</span>
                <span>${post['comments']}</span>
                </div>

                 ${generateCommentsNameHTML(post['commentPerson'])}
             ${generateCommentsHTML(post['comments'])}
  */

//add Name and Comment
function addComment(i) {
    let comment = document.getElementById(`comment${i}`);
    let commentName = document.getElementById(`name${i}`);
    // places comment in comment section
    document.getElementById(`showComments${i}`).innerHTML += `
       
        <span class="bold">${commentName.value}&nbsp;</span>
        <span>${comment.value}</span>
        </div>
        `;

     //let nameCom = `${commentName.value}:${comment.value}`; //would put name and comment in same object
    posts[i]['comments'].push(comment.value); // pushes comment in array
    posts[i]['commentPerson'].push(commentName.value); // would set array wir name and comment in comment object
    setArray('posts', posts); // sets array in local storage
    comment.value = ''; // empties fields
    commentName.value = ''; //empties field
    //loadPosts();

}

///// fucnction to generate HTML of comments
function generateCommentsHTML(comment) { // function to generate comment HTML
    let commentsHTML = '';
    for (let i = 0; i < comment.length; i++) {
        let c = comment[i];
        commentsHTML += `
        <div class="posted-comments">
        <span>${c}</span>
        </div>
        `;
    }
    return commentsHTML;
}
// function to generate HTML of comment Person
function generateCommentsNameHTML(commentName){
    let commentsNameHTML = '';
    for (let i = 0; i < commentName.length; i++) {
        let cn = commentName[i];
        commentsNameHTML += `
        <span class="bold">${cn}&nbsp;</span>   
        `;
    }
    return commentsNameHTML;
}
// function to combine name and comment
function combineHTML(commentName, comment){
    return generateCommentsNameHTML(commentName) + generateCommentsHTML(comment);
}
//// PROBLEM: bei mehreren kommentaren werden zuerst die namen aneinander gereiht (name name comment comment) und dann die kommentare anstatt: name comment, name comment etc.

// check if comment field is filled
function checkInputComment(i) {
    let commentfield = document.getElementById(`comment${i}`).value;// defines varibale of input field
    if (commentfield.length > 0) { // if in commentfield is something written
        document.getElementById(`commentBtn${i}`).removeAttribute('disabled'); // remove attribute disable from button
        document.getElementById(`commentBtn${i}`).classList.remove('disabled');
    } else { 
        document.getElementById(`commentBtn${i}`).setAttribute('disabled', true); // else attribute disable to button
        document.getElementById(`commentBtn${i}`).classList.add('disabled');
    }
}
 
// add comment with enter
function init() {
    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            let completeid = document.activeElement.id;
            let id = completeid.replace(/^\D+/g, '');
            console.log(completeid);
            addComment(id);
        }
    });
}

// search in posts

function searchPosts() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase(); // converts all entered letters into lower cases
    console.log(search);

    let postContainer = document.getElementById('postContainer'); // defines variable postContainer
    postContainer.innerHTML = ''; // empties postContainer

    for (let i = 0; i < posts.length; i++) {

        let post = posts[i];
        let author = posts[i]['author']; // defines variable of author in array
        let description = posts[i]['description']; //defines variable of description

        if (author.toLowerCase().includes(search) || description.toLowerCase().includes(search)) { // if element in array of authors incluces entered letters from search or (||) of description
            // show: post
            postContainer.innerHTML += `
        <div class="post-container">
            <div class="p-icon-author-loca-wrapper">
                <img class="post-icon" src="${post['icon']}">
                <div class="p-author-loca-wrapper">
                    <div class="post-author bold">${post['author']}</div>
                    <div>${post['location']}</div>
                </div>
            </div>   
            <img class="post-image" src="${post['image']}">
            <img class="post-like" onclick="likePost(${i})" id="likePost${i}"src="img/icons/favorite-4-32.png">
            <div class="post-description">
                <span class="bold">${post['author']}</span>
                ${post['description']}
            </div>
             <div class="comments-container" id="showComments${i}">

            </div>
             
        </div>   
        <div class="comment-section">
            <input type="text" id="name${i}" class="name-input" placeholder="Dein Name">
            <textarea onClick="checkInputComment(${i})" id="comment${i}"class="comment-input" type="text" placeholder="Kommentar hinzufügen..."></textarea>
            <div onClick="addComment(${i})" id="commentBtn${i}" class="comment-btn disabled " >Posten</div>      
        </div>
        `;
        }
    }
}


//like post
function likePost(i) {
    document.getElementById(`likePost${i}`).classList.add('d-none');
    document.getElementById(`dislikePost${i}`).classList.remove('d-none');
}

//dislike post

function dislikePost(i){
    document.getElementById(`likePost${i}`).classList.remove('d-none');
    document.getElementById(`dislikePost${i}`).classList.add('d-none');
}

// local storage

function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
// gibt mir das was im local storage steht, ODER (||) gibt mir nichts ([])




