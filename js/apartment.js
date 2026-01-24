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

function setContent() {
  reservedApartments =
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
  var contentContainer = document.getElementById("content-container");
  var apartmentInfo = document.getElementById("apartment-info");
  var typeAndCity = document.getElementById("type-city");
  var defaultImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  var defaultPhoneNumber = "+201121195198";
  var hr1 = document.createElement("hr");
  var hr2 = document.createElement("hr");
  var hr3 = document.createElement("hr");
  var hr4 = document.createElement("hr");
  var hr5 = document.createElement("hr");
  var city = document.createElement("div");
  city.setAttribute("class", "badge");
  city.innerHTML = `<span><i class="fa-solid fa-location-crosshairs"></i></span>
<h2>${apartment.city}</h2>`;
  var type = document.createElement("div");
  type.setAttribute("class", "badge");
  type.innerHTML = `<span><i class="fa-solid fa-building"></i></span><h2>${apartment.apartment_type}</h2>`;
  typeAndCity.append(city, type); //🟢

  var title = document.createElement("div");
  title.setAttribute("class", "title");
  title.innerHTML = apartment.title; //🟢

  var rooms = document.getElementById("rooms"); //🟢
  rooms.setAttribute("class", "rooms");

  var max_guests = document.createElement("h3");
  max_guests.innerHTML = `${apartment.max_guests} Guests`;

  var bedrooms = document.createElement("h3");
  bedrooms.innerHTML = `${apartment.bedrooms} Bedrooms`;

  var beds = document.createElement("h3");
  beds.innerHTML = `${apartment.beds} Beds`;

  var bathrooms = document.createElement("h3");
  bathrooms.innerHTML = `${apartment.bathrooms} Bathrooms`;

  rooms.append(max_guests, bedrooms, beds, bathrooms);

  var address = document.createElement("div"); //🟢
  address.setAttribute("class", "address");
  address.innerHTML = `<span><i class="fa-solid fa-location-dot"></i></span><p>${apartment.address}</p>`;
  var describtion = document.createElement("div"); //🟢
  describtion.setAttribute("class", "description");
  describtion.innerHTML = apartment.description;

  var apartmentOwnerCard = document.getElementById("apartment-owner-card");
  var ownerInfo = document.getElementById("owner-info");
  var aboutTheOwner = document.createElement("h2");
  aboutTheOwner.innerHTML = "About the owner";
  var ownerImg = document.createElement("div");
  ownerImg.setAttribute("class", "owner-img");
  if (apartment.host.profile_image == undefined) {
    ownerImg.style.backgroundImage = `url(${defaultImg})`;
  } else {
    ownerImg.style.backgroundImage = `url(${apartment.host.profile_image})`;
  }

  ownerInfo.innerHTML = `<h3>${apartment.host.user_name}</h3><div>${apartment.host.user_email}</div>`;

  var contactButton = document.createElement("button");
  contactButton.setAttribute("class", "badge");
  contactButton.innerHTML = `<span><i class="fa-brands fa-whatsapp"></i></span>Send a message`;
  contactButton.addEventListener("click", () => {
    if (apartment.user_phone == undefined) {
      window.open(`https://wa.me/${defaultPhoneNumber}`, "_blank");
    } else {
      window.open(`https://wa.me/${apartment.user_phone}`, "_blank");
    }
  });

  var map = document.createElement("div");
  map.setAttribute("class", "map");
  map.innerHTML = `<h2>Location</h2><br><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68200.91983500248!2d31.217264840485477!3d30.05948202827755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e1!3m2!1sen!2seg!4v1769212445778!5m2!1sen!2seg" width="100%" height="450" style="border:0;border-radius: 20px; outline: none;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

  apartmentOwnerCard.append(ownerImg, ownerInfo, contactButton);

  apartmentInfo.append(
    typeAndCity,
    title,
    rooms,
    hr1,
    address,
    describtion,
    hr2,
    aboutTheOwner,
    apartmentOwnerCard,
    hr3,
    map,
  );

  var leftCard = document.getElementById("left-card");

  var priceRate = document.createElement("div");
  priceRate.setAttribute("class", "price-rate");

  var pricePerNight = document.createElement("div");
  pricePerNight.setAttribute("class", "price-per-night");
  pricePerNight.innerHTML = `<h1>${apartment.price_per_night} ${apartment.currency}</h1><h3>Per Night</h3>`;

  var rateBadge = document.createElement("div");
  rateBadge.setAttribute("class", "rate badge");
  rateBadge.innerHTML = `<span><i class="fa-solid fa-star"></i></span><h2>${apartment.rating}</h2>`;
  contentContainer.appendChild(leftCard, apartmentInfo);

  priceRate.append(pricePerNight, rateBadge, hr4);

  var aminitiesContainer = document.createElement("div");
  var amenityHeader = document.createElement("h3");
  amenityHeader.innerHTML = "What this place offers";
  var aminities = document.createElement("div");
  aminities.setAttribute("class", "aminities");

  for (
    var apartmentAmenity = 0;
    apartmentAmenity < apartment.amenities.length;
    apartmentAmenity++
  ) {
    var selectedAmenity = apartment.amenities[apartmentAmenity];
    var amenityObject = document.createElement("div");
    amenityObject.setAttribute("class", "amin-obj");
    var ico = amenityIcons[selectedAmenity];
    amenityObject.innerHTML = `<i class="${ico}"></i><h4>${selectedAmenity}</h4>`;
    aminities.appendChild(amenityObject);
  }
  var rules = document.createElement("div");
  rules.setAttribute("class", "rules");
  if (apartment.rules == undefined) {
    rules.style.display = "none";
  } else {
    rules.innerHTML = `<h3>Rules</h3><p>${apartment.rules}`;
  }
  var ReserveButton = document.createElement("button");
  ReserveButton.innerHTML = "Reserve";
  var reservedApartments =
    JSON.parse(localStorage.getItem("reservedApartment")) || [];
  ReserveButton.addEventListener("click", () => {
    if (!reservedApartments.includes(apartment.apartment_id)) {
      reservedApartments.push(apartment.apartment_id);
      alert("Reserved Sucsessfully !")
      localStorage.setItem(
        "reservedApartment",
        JSON.stringify(reservedApartments),
      );
    } else {
      alert("Reserved Before !");
    }
  });
  leftCard.append(priceRate, hr4, aminities, hr5, rules, ReserveButton);
}

const amenityIcons = {
  // --- Basics & Connectivity ---
  WiFi: "fa-solid fa-wifi",
  "No WiFi": "fa-solid fa-ban", // أو fa-slash
  AC: "fa-solid fa-snowflake", // أو fa-fan
  TV: "fa-solid fa-tv",
  Elevator: "fa-solid fa-elevator",
  Heating: "fa-solid fa-temperature-arrow-up",
  Security: "fa-solid fa-shield-halved",
  "Smart Lock": "fa-solid fa-key",

  // --- Kitchen & Dining ---
  Kitchen: "fa-solid fa-kitchen-set",
  Kitchenette: "fa-solid fa-kitchen-set",
  "Shared Kitchen": "fa-solid fa-utensils",
  Breakfast: "fa-solid fa-mug-hot",
  "Espresso Machine": "fa-solid fa-mug-saucer",
  "BBQ Grill": "fa-solid fa-fire-burner",

  // --- Bathroom & Laundry ---
  Washer: "fa-solid fa-shirt", // تعبير عن الغسيل
  Dryer: "fa-solid fa-wind",
  Bathtub: "fa-solid fa-bath",
  "Shared Bathroom": "fa-solid fa-restroom",

  // --- Outdoor & Views ---
  Pool: "fa-solid fa-person-swimming",
  "Pool Access": "fa-solid fa-person-swimming",
  Garden: "fa-solid fa-tree",
  Patio: "fa-solid fa-chair",
  Terrace: "fa-solid fa-cloud-sun",
  Balcony: "fa-solid fa-door-open",
  "Rooftop Access": "fa-solid fa-building",

  // --- Views Specifics ---
  "Sea View": "fa-solid fa-water",
  "Nile View": "fa-solid fa-water",
  "Lagoon View": "fa-solid fa-water",
  "Marina View": "fa-solid fa-anchor",
  Beach: "fa-solid fa-umbrella-beach",
  "Beach Access": "fa-solid fa-umbrella-beach",

  // --- Work & Activities ---
  Workspace: "fa-solid fa-laptop",
  "Work Desk": "fa-solid fa-laptop",
  "Gym Access": "fa-solid fa-dumbbell",
  "Bicycle Rental": "fa-solid fa-bicycle",
  "Pottery Studio": "fa-solid fa-palette", // رمز للفن والحرف
  "Fire Pit": "fa-solid fa-fire",
  Fireplace: "fa-solid fa-fire",
  Campfire: "fa-solid fa-fire",

  // --- Parking ---
  Parking: "fa-solid fa-square-parking",
};
