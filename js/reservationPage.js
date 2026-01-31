var alldata = [];
var xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    alldata = JSON.parse(xhr.responseText);
    console.log("Data loaded successfully");
    renderCards();
  }
};
xhr.send();

function renderCards() {
  reservedApartments =
    JSON.parse(localStorage.getItem("reservedApartment")) || [];
  if (reservedApartments.length == 0) {
    var errorContainer = document.getElementById("not-found-container");
    var error = document.createElement("h1");
    error.innerHTML = "There is no reservations!";
    error.style.fontSize = "48px";
    error.style.textAlign = "center";
    error.style.order = "1";
    errorContainer.appendChild(error);
  }
  alldata.forEach((apt) => {
    if (reservedApartments.includes(apt.apartment_id)) {
      render(apt);
    }
  });
  var reservedApartments =
    JSON.parse(localStorage.getItem("reservedApartment")) || [];
  var nav = document.getElementById("nav");
  var reservations = document.createElement("reservations");
  reservations.addEventListener("click", () => {
    window.location.href = "reservationPage.html";
  });
  reservations.setAttribute("class", "reservations");
  if (reservedApartments.length == 0)
    reservations.innerHTML = `<i class="fa-solid fa-hotel"></i><p>0</p>`;
  else
    reservations.innerHTML = `<i class="fa-solid fa-hotel"></i><p>${reservedApartments.length}</p>`;
  nav.append(reservations);
}

function render(apt) {
  var parent = document.getElementById("parent");
  var card = document.createElement("div");
  card.addEventListener("click", () => {
    localStorage.setItem("apt_id", apt.apartment_id);
    window.location.href = `apartment.html`;
  });
  card.classList.add("apartment-card");
  var imageSection = document.createElement("div");
  imageSection.classList.add("image-section");
  var img = document.createElement("img");
  img.src = apt.images[0];
  imageSection.appendChild(img);
  var infoSection = document.createElement("div");
  infoSection.classList.add("info-section");
  var title = document.createElement("h2");
  title.classList.add("title");
  title.innerHTML = apt.title;
  var location = document.createElement("div");
  location.classList.add("location");
  location.innerHTML = apt.address + ", " + apt.city;
  var details = document.createElement("div");
  details.classList.add("features");
  details.innerHTML =
    apt.max_guests +
    " guests · " +
    apt.bedrooms +
    " bedrooms · " +
    apt.bathrooms +
    " bathrooms";
  infoSection.append(title, location, details);
  card.append(imageSection, infoSection);

  parent.appendChild(card);
}

//    var btn = document.createElement('button');
//     btn.classList.add("view-btn");
//     btn.innerHTML = "View Details";
//     btn.onclick = function() {
//         window.location.href = `listing.html?id=${apt.id}`;
//     };

// });

// }
