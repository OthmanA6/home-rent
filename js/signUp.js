function saveUser() {
    var usersList = JSON.parse(localStorage.getItem("usersList"))||[]
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var newUser = {userEmail:email,userPassword:password}
  usersList.push(newUser);
  if(firstName!=null&&lastName!=null&&email.includes("@")&&password!=null){
      localStorage.setItem("usersList",JSON.stringify(usersList))
      window.location.href="signin.html"
  }
}
