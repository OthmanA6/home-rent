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
      if (item.available_from > Sdate || item.available_to < Edate) continue;
    }

    results.push(item);
  }
  if (results.length > 0) {
    console.log("Final Results:", results);
  } else {
    console.log("No matching results found");
  }
  localStorage.setItem("searchResults", JSON.stringify(results));
  // renderCards(JSON.parse(localStorage.getItem("searchResults")));
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

  localStorage.setItem("searchResults", JSON.stringify(cityresults));
  // renderCards(JSON.parse(localStorage.getItem("searchcity")));
  window.location.href = "listings.html";
}

// function renderCards(FilterdData) {
//   var parent = document.getElementById("parent");
//   FilterdData.forEach((apt) => {
//     var card = document.createElement("div");
//     card.classList.add("apartment-card");

//     card.onclick = function () {
//       localStorage.setItem("apt_id", apt.apartment_id);
//       window.location.href = `apartment.html`;
//     };
//     var imageSection = document.createElement("div");
//     imageSection.classList.add("image-section");

//     var img = document.createElement("img");
//     img.src = apt.images[0];
//     imageSection.appendChild(img);

//     var infoSection = document.createElement("div");
//     infoSection.classList.add("info-section");

//     var title = document.createElement("h2");
//     title.classList.add("title");
//     title.innerHTML = apt.title;

//     var location = document.createElement("div");
//     location.classList.add("location");
//     location.innerHTML = apt.address + ", " + apt.city;

//     var details = document.createElement("div");
//     details.classList.add("features");
//     details.innerHTML =
//       apt.max_guests +
//       " guests · " +
//       apt.bedrooms +
//       " bedrooms · " +
//       apt.bathrooms +
//       " bathrooms";
//     //    var btn = document.createElement('button');
//     //     btn.classList.add("view-btn");
//     //     btn.innerHTML = "View Details";
//     //     btn.onclick = function() {
//     //         window.location.href = `listing.html?id=${apt.id}`;
//     //     };
//     infoSection.append(title, location, details);
//     card.append(imageSection, infoSection);
//     parent.appendChild(card);
//   });
// }
