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
    alert(person.avatarUrl());
    alert("COMPLETE");

    }

  //  document.getElementById('section-1').style.display = 'none'
  //  document.getElementById('section-2').style.display = 'block'
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


var statuses = [];


  this.state = {
      person: {
        name() {
          return 'Anon';
        },
      },
      username: "",
      newStatus: "",
      statuses: [],
      statusIndex: 0,
      isLoading: false
    };

function signOut(){
    event.preventDefault()
    blockstack.signUserOut(window.location.href)
    window.location.href = 'index.html';
}


/// PORTAL JS //////
const user_name_disp = document.getElementById('name-display');
function retreiveUserProfile(){

  fetchData();
  const userData = blockstack.loadUserData();

  console.log(userData);
  const user_Name = userData.profile.name;
  const user_blockID = userData.appPrivateKey;

    document.getElementById('name-display').innerHTML = user_Name;
    document.getElementById('avatar-image').src = userData.profile.image[0].contentUrl;
    document.getElementById('home-hub').innerHTML = "" + userData.profile.description;

    console.log("User Name\n " + user_Name +
    " Block ID: " + user_blockID + " " + userData.profile.account);
  //  alert("User is Not Signed in");
}

function fetchData(){

  let options = {
     decrypt: true
   }


  blockstack.getFile("statuses.json",options)
  .then((fileContents) => {
   //get the contents of the file /hello.txt
  var status_content = JSON.parse(fileContents);
  statuses.unshift(status_content.text);

  console.log(statuses.unshift(status_content.text));

   document.getElementById('theStat').innerHTML =
   '<div className="status" key={status.id} class="w3-container w3-card w3-white w3-round w3-margin"><br> <span class="w3-right w3-opacity"></span> <span class="w3-right w3-opacity">1 min</span> <h4>John Doe</h4><br><hr class="w3-clear"><p>' + status_content.text + '</p><br> <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Like</button> <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> Comment</button></div>'


  });
}

function handlenewStatusChange( ){
  alert("YU");
  this.setState({newStatus: event.target.value});
}

function handlenewStatusSubmit( ){
  alert("REACHED");
console.log("YOO");
//  this.setState({  newStatus: "" });
}


function saveNewStatus() {

  var the_post = document.getElementById('post_content');



  let options = {
     encrypt: true
   }

  let status = {
    text: the_post.innerHTML,
    created_at: Date.now()
  }

  let statuses = status;

  //statuses.unshift(status);

blockstack.putFile("statuses.json",JSON.stringify(status),options)
  .then(() => { //POST STATUSES
  //  alert("REACHED");
    //statuses.push(status);
    fetchData();
  })
}

function componentWillMount(){
  this.setState({
    person: new Person(loadUserData().profile),
    username: loadUserData.username
  });
}
