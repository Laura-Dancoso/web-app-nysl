var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
var lastUser;
var user = firebase.auth().currentUser;
var keyPost;

function goToForum() {
  if (lastUser) {
    $('#exampleModal').modal('hide');
    document.getElementById('forum').style.display = "block";
    document.getElementById('games').style.display = "none";
    document.getElementById('teams').style.display = "none";
    document.getElementById('inicio').style.display = "none";
    document.getElementById('contact').style.display = "none";
    document.getElementById('welcome').innerHTML = '<h2>Welcome  ' + lastUser.displayName + '</h2>';
  } else {
    $('#signModal').modal('show');
    $('#exampleModal').modal('hide');
  }
  document.getElementById('imgLand').style.display = "inline";
}

function signIn() {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    lastUser = user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  }).then(function(){
    document.getElementById('welcome').innerHTML = '<h2>Welcome  ' + lastUser.displayName + '</h2>';
    //apenas corre la función se cierra el modal, tendría que ser dsp del console log...preguntar..
    $('#signModal').modal('hide');
    document.getElementById('forum').style.display = "block";
    document.getElementById('games').style.display = "none";
    document.getElementById('teams').style.display = "none";
    document.getElementById('inicio').style.display = "none";
    document.getElementById('contact').style.display = "none";

  })
}
function signOut() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    console.log("logout");
  }).then(volver()).catch(function (error) {
    // An error happened.
  });
}
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
    // User is signed in.
    lastUser = user;
  } else {
    console.log("no user")
    lastUser = null;
    // No user is signed in.
  }
});
function writeNewPost(uid, username, picture, title, body) {
  // Get a key for a new Post.
  //donde dice game1 luego lo podré cambiar con una variable para separar los juegos, esa variable la obtendré con el data-algo de los modals....
  var newPostKey = firebase.database().ref().child('posts').push().key;
    // A post entry.
    var postData = {
      author: username,
      uid: uid,
      body: body,
      title: title,
      authorPic: picture,
      postKey: newPostKey
    };
  firebase.database().ref('/'+ "game1" + '/posts/' + newPostKey).set(postData);
  firebase.database().ref('/'+ "game1" + '/user-posts/' + uid + '/' + newPostKey).set(postData);
  document.getElementById("postSection").innerHTML='';
  showPost();
}
document.getElementById("form").addEventListener("submit", (e)=>{
  var title = document.getElementById("title-name").value;
  var content = document.getElementById("content-text").value;
  e.preventDefault();
  writeNewPost(lastUser.uid, lastUser.displayName, lastUser.photoURL, title, content);
  form.reset();
  $('#newPost').modal('hide');
});
function showPost(){
var post = firebase.database().ref('/'+ "game1" + '/posts/').on("child_added", function(data){
  var postValue=data.val();
  document.getElementById("postSection").innerHTML+=`
    <div class="card mt-2 text-left border container">
    <div class="card-header row">
    <h5 class="vertical-align p-0 m-0 col-10">${postValue.author}</h5>
    <a style="display:none;" id="id${postValue.postKey}" onclick="deletePost('${postValue.postKey}', '${postValue.uid}')" class="col-2 p-0 m-0 text-right">
    <img src="styles/img/baseline_delete_black_18dp.png" alt=""></a>
    </div>
    <div class="card-body row">
      <h4 class="col-12 card-title">${postValue.title}</h4>
      <p class="col-12 card-text">${postValue.body}</p>
    </div>
  </div>`;
  var user = firebase.auth().currentUser;
  if (user) {
    if(user.displayName===postValue.author){
    document.getElementById('id'+ postValue.postKey).style.display="block";
    }
  // User is signed in.
  } else {
  // No user is signed in. 
  }
});
};
function deletePost(postKey, uid){
  firebase.database().ref('/'+ "game1" + '/posts/' + postKey ).remove();
  firebase.database().ref('/'+ "game1" + '/user-posts/' +uid+ '/'+ postKey).remove();
  form.reset();
  document.getElementById("postSection").innerHTML="";
  showPost();
}