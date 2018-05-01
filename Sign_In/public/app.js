document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('signin-button').addEventListener('click', function(event) {

    var BLOCKSTACK_HOST = 'https://browser.blockstack.org/auth'
    var DEFAULT_SCOPE = ['store_write','publish_data']
    var redirectURI = `${window.location.origin}/`
    var manifestURI = `${window.location.origin}/manifest.json`
    var scopes = DEFAULT_SCOPE
    var authRequest = blockstack.makeAuthRequest(blockstack.generateAndStoreTransitKey(), redirectURI, manifestURI, scopes)
    blockstack.redirectToSignInWithAuthRequest(authRequest, BLOCKSTACK_HOST)

    event.preventDefault()

  })
  document.getElementById('signout-button').addEventListener('click', function(event) {
    event.preventDefault()
    blockstack.signUserOut(window.location.href)
  })
//var this.state;
var block_btn = document.getElementById('signin-button');
  function showProfile(profile) {
    var person = new blockstack.Person(profile)
    document.getElementById('heading-name').innerHTML = person.name() ? person.name() : "Nameless Person"
    if(person.avatarUrl()) {
    var image_src = person.avatarUrl();
    }
  }

  if (blockstack.isUserSignedIn()) {
    var profile = blockstack.loadUserData().profile
      showProfile(profile)
      block_btn.style.display === 'hidden';
      window.location.href = 'portal.html';

  } else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn().then(function(userData) {
      window.location = window.location.origin
    })
  }
})

function signOut(){
    event.preventDefault()
    blockstack.signUserOut(window.location.href)
    window.location.href = 'index.html';
}


///// ---------  PORTAL JS ------------- //////
var statuses = new Array(); //posts aka statuses
const userData = blockstack.loadUserData(); //call returns blockstack credentials
const user_Name = userData.profile.name; //User Blockstack name
const user_Title = userData.profile.description;
const user_ID = userData.username;
var counter = localStorage.getItem("logged");



function retreiveUserProfile(){ //Retreive user Blockstack profile data


  fetchData(); //fetching data for refresh

    document.getElementById('name-display').innerHTML = user_Name; //Display profile user name
    document.getElementById('avatar-image').src = userData.profile.image[0].contentUrl; //Display user profile image holder/avatar
    document.getElementById('home-desc').innerHTML = '<i id="home-hub" class="fa fa-info-circle fa-fw w3-margin-right w3-text-theme"></i>' + userData.profile.description; //Display user description

    console.log(userData);
    console.log("User Name\n " + user_Name + " " + userData.profile.account);
    console.log("user_ID: "+user_ID);

    var home = "Compton";
    var person = "M";
    var birth = "1921-06-21 00:00:00";

    counter++;
    localStorage.setItem("logged", counter);





    var data = {
      "blockstack_id" : user_ID, //user id
      "name" : user_Name, //users name
      "gender" : person,
      "birthday" : birth,
      "hometown" : home,
      "title" : user_Title
    };

console.log(data);


if (counter === 1) {

$.ajax({
        url: '/api/v1/usercontact',
        type: 'POST',
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        cache: true,
        success: function(result) {
            console.log("sent user data");
            console.log(result);
        },
        error: function(e) {
          console.log(e);
          console.log(data);
        }
    });

} else {
  console.log("already added user");
}

}


var status_data = localStorage.getItem('posts') || "";
var statuses = [status_data],
    data;



function fetchData(){

  var posts;

  $.ajax({
    type: "GET",
    url:"/api/v1/allposts",
    headers: {
      "Content-Type": "application/json"
    },
    cache: true,
    success: function(data) {
      console.log("received data");
      addToFeed(data);
    },
    error: function(e) {
      console.log(e);
      console.log(data);
    }
  });

/* ----- GIA HUB ---
  let options = {decrypt: true} //decrypt json file contents


  blockstack.getFile("s.json",options)
  .then((fileContents) => {

    //alert(JSON.parse(fileContents)|| "");
   var status_content = JSON.parse(fileContents);

    for (var i = 0; i < status_content.length; i++) {
      console.log(status_content);
    }
  });
*/
}


function addToFeed(data){

  for (var i = 0; i < data.posts.length; i++) {
    console.log(data);
    var post_area = document.createElement('div');
    post_area.innerHTML =
    '<div className="status" key={status.id} class="w3-container w3-card w3-white w3-round w3-margin"><br> <span class="w3-right w3-opacity"></span> <span class="w3-right w3-opacity"> min</span> <h4>' + data.posts[i].Name + '</h4><br><hr class="w3-clear"><p>' + data.posts[i].Content + '</p><br> <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Like</button> <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> Comment</button></div>'
    document.getElementById('theStat').appendChild(post_area);
  }
}


function secureUserProfile(){ ///USER EMAIL PUSH

  const email = document.getElementById('email');
  const pass = document.getElementById('user_pass').innerHTML;
  const conf_pass = document.getElementById('conf_pass').innerHTML;


  if (pass.value === conf_pass.value) {

  var secure_user = {
    "blockstack_id": user_ID,
    "email":email
  }

  $.ajax({
    type: 'POST',
    url: "/api/v1/useremail",
    data: JSON.stringify(secure_user),
    headers: {
      "Content-Type": "application/json"
    },
    success: function(result) {
        console.log("sent user data");
        console.log(result);
        pass.value,conf_pass.value, email.value = ' ';
    },
    error: function(e) {
      console.log(e);
      console.log(data);
    }
  });
  }else {
  alert("Passowords do not match");
  }
}


function loadProfile(){ //Loading User Profile on Profile.html

  document.getElementById('avatar_profile').src = userData.profile.image[0].contentUrl;
  document.getElementById('profile_name').innerHTML = user_Name;
  document.getElementById('prof_desc').innerHTML = userData.profile.description;

  ///LOAD USER POSTS function call here


}
var user_image;
function onFileSelected(event) {

  var selectedFile = event.target.files[0];
  var reader = new FileReader();
  var imgtag = document.getElementById('imagearea');




  user_image =  event.target.result;;
  var the_image = reader.readAsDataURL(selectedFile);
console.log(user_image);
}


/* ////// SAVE NEW POSTS //////// */
function saveNewStatus(image) {

  const the_post = document.getElementById('post_content');
  const hours = new Date().getHours() - 12;
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  const date = new Date().getDate();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();


  var post = the_post.innerHTML;

  console.log(user_ID);

  var data  = {"blockstack_id":user_ID,"content":post};


  console.log(data);

  $.ajax({
    type: 'POST',
    url: "/api/v1/textpost",
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    cache: true,
    success: function(result) {
        console.log("sent user data");
        console.log(result);
    },
    error: function(e) {
      console.log("ERROR");
      console.log(e);
      console.log(data);
    }
});




  var post_area = document.createElement('div');
  post_area.innerHTML =
  '<div className="status" key={status.id} class="w3-container w3-card w3-white w3-round w3-margin"><br><img id="imagearea" src=" ' + user_image + '" height="50"> <span class="w3-right w3-opacity"></span> <span class="w3-right w3-opacity">' +  hours + ":"+ new Date().getMinutes() + ' PM </span> <h4>' + userData.profile.name + '</h4><br><hr class="w3-clear"><p>' + post + '</p><br><img src = ' + 'id="imagearea" height="25%" width="25%"> <br> <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Like</button> <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> Comment</button></div>'

  the_post.innerHTML = ' '; //CLEAR INPUT FROM POSTS

  document.getElementById('theStat').appendChild(post_area);


/* ------- GIA HUB
  let options = {encrypt: true};

  let posts = JSON.stringify({
    text: the_post.innerHTML,
    user:userData.profile.name,
    created_at: Date.now()
  },['text', 'user', 'created_at'],
  '\t');


 statuses.unshift(posts);
 localStorage.setItem('posts', statuses);

blockstack.putFile("s.json",JSON.stringify(statuses),options)
  .then(() => { //POST STATUSES

    var post_area = document.createElement('div');
    post_area.innerHTML =
    '<div className="status" key={status.id} class="w3-container w3-card w3-white w3-round w3-margin"><br> <span class="w3-right w3-opacity"></span> <span class="w3-right w3-opacity">' + posts.created_at + ' min</span> <h4>' + posts.user + '</h4><br><hr class="w3-clear"><p>' + posts.text + '</p><br> <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Like</button> <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> Comment</button></div>'

    the_post.innerHTML = ' '; //CLEAR INPUT FROM POSTS
    document.getElementById('theStat').appendChild(post_area);
  })
*/

}
