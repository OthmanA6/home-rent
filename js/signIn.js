var usersList = JSON.parse(localStorage.getItem("usersList")) || [];
var wrong = document.getElementById("wrong")
var userData = [];
function CheckUser() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var userFounder = usersList.find((user)=>user.userEmail == email && user.userPassword == password )
  if(userFounder){      
      var currentUserData = [];
      currentUserData.push(userFounder)
      localStorage.setItem("currentUserData",JSON.stringify(currentUserData))
      wrong.innerHTML="";
      window.location.href="listings.html"
  }
  else{
    wrong.style.color="red"
    wrong.innerHTML="Wrong E-mail or Password"
  }
}
