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
var baseData = JSON.parse(localStorage.getItem("searchResults")) || alldata;
var parent = document.getElementById("parent");

renderCards(baseData);

function renderCards(data) {
    parent.innerHTML = "";

    if (data.length === 0) {
        parent.innerHTML = "<h3>No results found</h3>";
        return;
    }

    data.forEach(function (apt) {
        var card = document.createElement("div");
        card.className = "apartment-card";

        card.onclick = function () {
            localStorage.setItem("apt_id", apt.apartment_id);
            window.location.href = "apartment.html";
        };

        card.innerHTML = `
            <div class="image-section">
                <img src="${apt.images[0]}" alt="">
            </div>
            <div class="info-section">
                <div class="title">${apt.title}</div>
                <div class="location">${apt.address}, ${apt.city}</div>
                <div class="features">
                    ${apt.max_guests} guests · 
                    ${apt.bedrooms} bedrooms · 
                    ${apt.bathrooms} bathrooms
                </div>
            </div>
        `;

        parent.appendChild(card);
    });
}

function applyAllFilters() {
    var cityValue = document.getElementById("filter-city").value.toLowerCase();
    var guestsValue = Number(document.getElementById("filter-guests").value);
    var sortValue = document.getElementById("filter-price").value;
    var filtered = alldata.filter(function (apt) {
        var matchesCity = !cityValue || apt.city.toLowerCase() === cityValue;
        var matchesGuests = !guestsValue || apt.max_guests >= guestsValue;
        
        return matchesCity && matchesGuests;
    });
    if (sortValue === "low") {
        filtered.sort((a, b) => a.price_per_night - b.price_per_night);
    } else if (sortValue === "high") {
        filtered.sort((a, b) => b.price_per_night - a.price_per_night);
    }
    renderCards(filtered);
}


function filterByCategory() {
    applyAllFilters();
}

function sortByPrice() {
    applyAllFilters();
}

function filterByGuests() {
    applyAllFilters();
}



