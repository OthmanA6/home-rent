var alldata = [];
var xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    alldata = JSON.parse(xhr.responseText);
    console.log("Data loaded successfully");
    getApartmentData();
  }
};
xhr.send();
var apartment;
function getApartmentData() {
  alldata.forEach((apt) => {
    if (apt.apartment_id == localStorage.getItem("apt_id")) {
      //   console.log(apt);
      apartment = apt;
    }
  });
  allocateData();
}

function allocateData() {
  setImages();
  setContent();
}

function setImages() {
  var imageContainer = document.getElementById("images-container");
  var secImgs = document.getElementById("sec-imgs");
  var heroImg = document.createElement("div");
  heroImg.setAttribute("class", "hero-img");
  heroImg.style.backgroundImage = `url(${apartment.images[0]})`;
  var idNum = 2;
  var secImgsIndex = 1;
  for (var i = 0; i < 3; i++) {
    var secImg = document.createElement("div");
    secImg.setAttribute("id", `img-${idNum}`);
    secImg.style.backgroundImage = `url(${apartment.images[secImgsIndex]})`;
    secImgs.appendChild(secImg);
    idNum++;
    secImgsIndex++;
  }
  imageContainer.append(heroImg, secImgs);
}

function setContent(){
    var contentContainer = document.getElementById("content-container")
    var apartmentInfo = document.getElementById("apartment-info")
    var typeAndCity = document.getElementById("type-city")

    var city = document.createElement("div")
}
