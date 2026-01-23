var alldata = [];
var xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true);

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    alldata = JSON.parse(xhr.responseText);
  }
};
xhr.send();

function filterData() {
  var location = document.getElementById("location-filter").value;
  var searchLocation = []
  for (var i = 0; i < alldata.length; i++) {
    if(alldata[i].city.toLowerCase()==location.toLowerCase()){
        searchLocation.push(alldata[i])
    }
}
if(searchLocation[0]!=null){

  console.log(searchLocation);
}else{
  console.log("Not Found")
}
}

//  sign up log in

// Apartment Page