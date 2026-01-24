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

    if (Sdate && item.available_from > Sdate) {
      continue;
    }

    if (Edate && item.available_to < Edate) {
      continue;
    }

    results.push(item);
  }

  if (results.length > 0) {
    console.log("Final Results:", results);
  } else {
    console.log("No matching results found");
  }
}

function toAswan() {
   var searchLocation = []
   for (var i = 0; i < alldata.length; i++) {
     if(alldata[i].city.includes("Aswan")){
         searchLocation.push(alldata[i])
     }
 }
  console.log(searchLocation);
  
}
function toAlexandria() {
   var searchLocation = []
   for (var i = 0; i < alldata.length; i++) {
     if(alldata[i].city.includes("Alexandria")){
         searchLocation.push(alldata[i])
     }
 }
  console.log(searchLocation);

}
function toCairo() {
   var searchLocation = []
   for (var i = 0; i < alldata.length; i++) {
     if(alldata[i].city.includes("Cairo")){
         searchLocation.push(alldata[i])
     }
 }
  console.log(searchLocation);

}
function toDahab() {
   var searchLocation = []
   for (var i = 0; i < alldata.length; i++) {
     if(alldata[i].city.includes("Dahab")){
         searchLocation.push(alldata[i])
     }
 }
  console.log(searchLocation);
  
}
function toElGouna() {
   var searchLocation = []
   for (var i = 0; i < alldata.length; i++) {
     if(alldata[i].city.includes("El Gouna")){
         searchLocation.push(alldata[i])
     }
 }
  console.log(searchLocation);
  
}