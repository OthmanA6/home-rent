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

function Results() {
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
  if (
    item.available_from > Sdate ||
    item.available_to < Edate
  ) continue;
}

    results.push(item);
  }
  if (results.length > 0) {
    console.log("Final Results:", results);
  } else {
    console.log("No matching results found");
  }
  localStorage.setItem("searchResults", JSON.stringify(results));
  window.location.href = "listings.html";
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

  localStorage.setItem("searchcity", JSON.stringify(cityresults));
  window.location.href = "listings.html";
}

