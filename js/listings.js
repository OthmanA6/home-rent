var alldata = [];
var xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    alldata = JSON.parse(xhr.responseText);
    console.log("Data loaded successfully");
    renderCards(alldata);
  }
};
xhr.send();

function renderCards(data) {
<<<<<<< HEAD
    var parent = document.getElementById('parent');
    alldata.forEach(apt => {
        var card = document.createElement('div');
        card.classList.add("apartment-card");

        card.onclick = function () {
            localStorage.setItem("apt_id", apt.apartment_id)
            window.location.href = `apartment.html`;
        };
        var imageSection = document.createElement('div');
        imageSection.classList.add("image-section");

        var img = document.createElement('img');
        img.src = apt.images[0];
        imageSection.appendChild(img);

        var infoSection = document.createElement('div');
        infoSection.classList.add("info-section");

        var title = document.createElement('h2');
        title.classList.add("title");
        title.innerHTML = apt.title;


        var location = document.createElement('div');
        location.classList.add("location");
        location.innerHTML = apt.address + ", " + apt.city;

        var details = document.createElement('div');
        details.classList.add("features");
        details.innerHTML = apt.max_guests + " guests · " + apt.bedrooms + " bedrooms · " + apt.bathrooms + " bathrooms";

        //    var btn = document.createElement('button');
        //     btn.classList.add("view-btn");
        //     btn.innerHTML = "View Details";
        //     btn.onclick = function() {
        //         window.location.href = `listing.html?id=${apt.id}`;
        //     };
=======
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
  var parent = document.getElementById("parent");
  alldata.forEach((apt) => {
    var card = document.createElement("div");
    card.classList.add("apartment-card");

    card.onclick = function () {
      localStorage.setItem("apt_id", apt.apartment_id);
      window.location.href = `apartment.html`;
    };
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

    //    var btn = document.createElement('button');
    //     btn.classList.add("view-btn");
    //     btn.innerHTML = "View Details";
    //     btn.onclick = function() {
    //         window.location.href = `listing.html?id=${apt.id}`;
    //     };
>>>>>>> 1fc517d06aadb74ecd10a51e34ffd2cc15c438fa

        infoSection.append(title, location, details);
        card.append(imageSection, infoSection);

<<<<<<< HEAD
        parent.appendChild(card);
    });

=======
    parent.appendChild(card);
  });
>>>>>>> 1fc517d06aadb74ecd10a51e34ffd2cc15c438fa
}
