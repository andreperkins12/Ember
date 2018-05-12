document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('signin-button').addEventListener('click', function(event) {

    var BLOCKSTACK_HOST = 'https://browser.blockstack.org/auth'
    var DEFAULT_SCOPE = ['store_write', 'publish_data']
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
    if (person.avatarUrl()) {
      var image_src = person.avatarUrl();
    }
  }

  if (blockstack.isUserSignedIn()) {
    var profile = blockstack.loadUserData().profile
    showProfile(profile)
    block_btn.style.display === 'hidden';
    window.location.href = 'portal.html';
    userLogin();

  } else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn().then(function(userData) {
      window.location = window.location.origin
    })
  }
})

function signOut() {
  event.preventDefault()
  blockstack.signUserOut(window.location.href)
  window.location.href = 'index.html';
}


///// ---------  PORTAL JS ------------- //////
var statuses = new Array(); //posts aka statuses
const userData = blockstack.loadUserData(); //call returns blockstack credentials
const user_Name = userData.profile.name; //User Blockstack name
const user_Title = userData.profile.description;
const user_ID = userData.appPrivateKey;
var counter = localStorage.getItem("logged");



function retreiveUserProfile() { //Retreive user Blockstack profile data

  fetchData(); //fetching data for refresh
  document.getElementById('name-display').innerHTML = user_Name; //Display profile user name
  document.getElementById('avatar-image').src = userData.profile.image[0].contentUrl; //Display user profile image holder/avatar
  document.getElementById('home-desc').innerHTML = '<i id="home-hub" class="fa fa-info-circle fa-fw w3-margin-right w3-text-theme"></i>' + userData.profile.description; //Display user description

  var home = "Compton";
  var person = "M";
  var birth = "1921-06-21 00:00:00";

  counter++;
  localStorage.setItem("logged", counter);

  var data = {
    "blockstack_id": user_ID, //user id
    "name": user_Name, //users name
    "gender": person,
    "birthday": birth,
    "hometown": home,
    "title": user_Title
  };

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
  } else {console.log("REGISTERED USER");}
}


var status_data = localStorage.getItem('posts') || "";
var statuses = [status_data],
  data;

function AddZero(num) {
  return (num >= 0 && num < 10) ? "0" + num : num + "";
}


function userLogin() { /// LOGIN IN TIME

  var now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1);
  if (month.length == 1) {
    month = "0" + month;
  }
  day = "" + now.getDate();
  if (day.length == 1) {
    day = "0" + day;
  }
  hour = "" + now.getHours();
  if (hour.length == 1) {
    hour = "0" + hour;
  }
  minute = "" + now.getMinutes();
  if (minute.length == 1) {
    minute = "0" + minute;
  }
  second = "" + now.getSeconds();
  if (second.length == 1) {
    second = "0" + second;
  }
  var full_date = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

  var login = {
    "blockstack_id": user_ID,
    "login_time": full_date
  }

  $.ajax({
    url: '/api/v1/logintime',
    type: 'POST',
    data: JSON.stringify(login),
    headers: {
      "Content-Type": "application/json"
    },
    success: function(result) {
      console.log("sent user data");
      console.log(result);
    },
    error: function(e) {
      console.log(e);
    }
  });
}


function fetchData() {

  var posts;

  $.ajax({
    type: "GET",
    url: "/api/v1/allposts",
    headers: {
      "Content-Type": "application/json"
    },
    cache: true,
    success: function(data) {
      console.log("received data");
      console.log(data);
      addToFeed(data);
    },timeout: 1000000000,
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


function addToFeed(data) {
  for (var i = data.posts.length - 1; i >= 0; i--) {
    console.log(data);
    var post_area = document.createElement('div');
    post_area.innerHTML =
      '<div className="status" key={status.id} class="w3-container w3-card w3-white w3-round w3-margin"><br> <span class="w3-right w3-opacity"></span> <span class="w3-right w3-opacity"> min</span> <h4>' + data.posts[i].Name + '</h4><br><hr class="w3-clear"><p>' + data.posts[i].Content + '</p><br> <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Like</button> <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> Comment</button></div>'
    document.getElementById('theStat').appendChild(post_area);
  }
}


function secureUserProfile() { ///USER EMAIL PUSH

  const email = document.querySelector('input[name="email"]');
  const pass = document.getElementById('user_pass').innerHTML;
  const conf_pass = document.getElementById('conf_pass').innerHTML;
  const user_email = email.value;

  var data = {
    "blockstack_id": user_ID,
    "email": user_email
  };

  $.ajax({
    url: '/api/v1/useremail',
    type: 'POST',
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    cache: true,
    success: function(result) {
      console.log("sent user data");
      email.value = ' ';
      pass.value = ' ';
      conf_pass.value = ' ';
    },
    error: function(e) {
      console.log(e);
      console.log(data);
    }
  });
}


var user_image;
var image_selected = false;


function onFileSelected(event) {

  var selectedFile = event.target.files[0];
  var reader = new FileReader();
  var imgtag = document.getElementById('imagearea');

  user_image = event.target.result;
  reader.onloadend = function () {
    console.log(reader.result); //this is an ArrayBuffer
  }
  user_image = reader.readAsArrayBuffer(selectedFile);
  image_selected = true;
  image_post(image_selected);

}


function image_post(image_selected) {
  if (image_selected === true) {
    return true;
  } else {
    return false;
  }
}

/* ////// SAVE NEW POSTS //////// */
function saveNewStatus() {

  const the_post = document.getElementById('post_content');
  const hours = new Date().getHours() - 12;
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  const date = new Date().getDate();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();


  var post = the_post.innerHTML;

  console.log(user_ID);

  var data = {
    "blockstack_id": user_ID,
    "content": post
  };


  console.log(data);


    if(image_selected === false){

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
  }else {

    console.log("IMAGE POST");
    var data = {
      "blockstack_id": user_ID,
      "content": post,
      "image_uri": user_image
    }

    console.log(data);

    $.ajax({
        type: 'POST',
        url: "/api/v1/imagepost",
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
        }
    });

  }

  var post_area = document.createElement('div');
  post_area.innerHTML =
    '<div className="status" key={status.id} class="w3-container w3-card w3-white w3-round w3-margin"><br><span class="w3-right w3-opacity"></span> <span class="w3-right w3-opacity">' + hours + ":" + new Date().getMinutes() + ' PM </span> <h4>' + userData.profile.name + '</h4><br><hr class="w3-clear"><p>' + post + '</p><br> <br> <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Like</button> <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> Comment</button></div>'
  the_post.innerHTML = ' '; //CLEAR INPUT FROM POSTS
  document.getElementById('theStat').insertBefore(post_area, document.getElementById('theStat').firstChild);

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
