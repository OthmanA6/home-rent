var alldata = [];
var xhr = new XMLHttpRequest();

xhr.open("GET", "data.json", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    alldata = JSON.parse(xhr.responseText);
    console.log("Data loaded successfully");
  }
};
xhr.send();

function Results(event) {
  event.preventDefault();
  var location = document.getElementById("location").value.trim().toLowerCase();
  var guests = Number(document.getElementById("guests").value);
  var Sdate = document.getElementById("start-dates").value;
  var Edate = document.getElementById("end-dates").value;

  var results = [];

  for (var i = 0; i < alldata.length; i++) {
    var item = alldata[i];

    if (location && !item.city.toLowerCase().includes(location)) {
      continue;
    }

    if (guests && item.max_guests < guests) {
      continue;
    }

    if (Sdate && Edate) {
      if (new Date(item.available_from) > new Date(Sdate) || new Date(item.available_to) < new Date(Edate))
        continue;
    }

    results.push(item);
  }
  if (results.length > 0) {
    console.log("Final Results:", results);
  } else {
    console.log("No matching results found");
  }
  console.log("Checking item:", item.city);
  console.log("Checking item:", item.max_guests);
  console.log("Checking item:", item.available_from, item.available_to);

  localStorage.setItem("searchResults", JSON.stringify(results));
  window.location.href = "listings.html";

}

if(JSON.parse(localStorage.getItem("currentUserData"))!=null){
  document.getElementById("icon-bind").innerHTML=`<i class="fa-solid fa-user" onclick="OpenReservations()"></i>`
}else{
  document.getElementById("icon-bind").innerHTML=`<h1 onclick="OpenSignInPage()">Sign in</h1>`
}

function OpenSignInPage(){
window.location.href="signin.html"
}

function OpenReservations(){
  window.location.href="reservationPage.html"
}

function goToCity(cityName) {
  var cityresults = [];

  for (var i = 0; i < alldata.length; i++) {
    if (alldata[i].city.toLowerCase().includes(cityName.toLowerCase())) {
      cityresults.push(alldata[i]);
    }
  }

  if (cityresults.length === 0) {
    alert("No listings found");
    return;
  }

  localStorage.setItem("searchResults", JSON.stringify(cityresults));
  window.location.href = "listings.html";
}