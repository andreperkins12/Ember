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

var block_btn = document.getElementById('signin-button');
  function showProfile(profile) {
    var person = new blockstack.Person(profile)
    document.getElementById('heading-name').innerHTML = person.name() ? person.name() : "Nameless Person"
    if(person.avatarUrl()) {
      var image_src = person.avatarUrl().src;
      var avatar = document.getElementById('avatar-image');
      alert(image_src);
      alert(person.avatarUrl());
      avatar = person.avatarUrl();
      console.log(person.avatarUrl());
      alert(person.avatarUrl());
      alert(avatar);
      alert("AVATAR");
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


function signOut(){
    event.preventDefault()
    blockstack.signUserOut(window.location.href)
    window.location.href = 'index.html';
}


/// PORTAL JS //////


function saveNewStatus() {

  var the_post = document.getElementById('post_content');
  var statusIndex = 0;

  const options = { encrypt: true }

  let status = {
  text: the_post,
  created_at: Date.now()
}


blockstack.putFile('statuses.json', JSON.stringify(status), options)
  .then(() => {
    alert("REACHED");
    getPost();
  })
}

function getPost(){

  let options = {
  decrypt: true
  }

  blockstack.getFile("statuses.json",options)
  .then((fileContents) => {

   //get the contents of the file /hello.txt
   alert("FILE CONTENTS\n" + fileContents);
  //assert(fileContents === fileContents);
});

}
