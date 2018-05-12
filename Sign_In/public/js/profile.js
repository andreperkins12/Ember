
function loadProfile() { //Loading User Profile on Profile.html
  ///LOAD USER POSTS function call here
  loadPosts();
  getUserInfo();
}

function getUserInfo(){
  document.getElementById('avatar_profile').src = userData.profile.image[0].contentUrl;
  document.getElementById('profile_name').innerHTML = user_Name;
  document.getElementById('prof_desc').innerHTML = userData.profile.description;
}

function loadPosts(){

  $.ajax({
    type: "GET",
    url: "/api/v1/allposts",
    headers: {
      "Content-Type": "application/json"
    },
    cache: true,
    success: function(data) {
      console.log("received data");
      addUserFeed(data);
    },timeout: 1000000000,
    error: function(e) {
      console.log(e);
      console.log(data);
    }
  });


}

function addUserFeed(data) {

console.log(data);

for (var i = 0; i < data.posts.length; i++) {
  var count = 0;
  if (data.posts[i].Name === userData.profile.name) {
    console.log(data.posts[i].Name + " " + userData.profile.name);
    console.log(data);
    var post_area = document.createElement('div');
    post_area.innerHTML =
      '<div className="status" key={status.id} class="w3-container w3-card w3-white w3-round w3-margin"><br> <span class="w3-right w3-opacity"></span> <span class="w3-right w3-opacity"> min</span> <h4>' + data.posts[i].Name + '</h4><br><hr class="w3-clear"><p>' + data.posts[i].Content + '</p><br> <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Like</button> <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> Comment</button></div>'
    document.querySelector('.posts').appendChild(post_area);

  }else {
    console.log(data.posts[i].Name);
  }

}
}
