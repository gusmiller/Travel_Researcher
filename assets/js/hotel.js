var HotelApiKey = "297373a073msh7b0598ca6341179p15ab78jsn93aac3e1c65e"
var checkIn = document.querySelector("#checkin-date-input")
var checkOut = document.querySelector("#checkout-date-input")
var city = document.querySelector("#city")
var searchButton = document.querySelector("#searchbtn")
var hotelsTable = document.querySelector(".hotel-table")
const openflightModal = document.getElementById('openModal');
const closeflightModal = document.getElementById('closeModal');
const closeModal = document.getElementById('close-popup');
const warning = document.getElementById('warningModal');

var pullFlightCity = function () {
    var cityName = JSON.parse(localStorage.getItem("savedDestinations"))
    var destination = cityName.destinationCity

    return destination
}

pullFlightCity()

let destinationCity = pullFlightCity()

function showError(title, message) {
    const errModal = document.getElementById('warningModal');
    $("#errorTitle").text(title);
    $("#errorMessage").text(message);
    errModal.classList.remove('hidden');
}

closeflightModal.addEventListener('click', () => {
    warning.classList.add('hidden');
})

var savedHotels = []

var storeHotels = function () {
    localStorage.setItem("storedHotels", JSON.stringify(savedHotels));
}

window.onload = function () {
    var storedHotels = JSON.parse(localStorage.getItem("storedHotels"));
    if (storedHotels != null) {
        savedHotels = storedHotels;
    }
}

searchButton.addEventListener("click", (event) => {

    event.preventDefault();
    if (!checkIn.value || !checkOut.value) {
        showError("Missing Input", "One or more fields are empty/Invalid data")
        return;
    }

    fetchHotels(destinationCity);
})

var fetchHotels = function (city) {

    var hotelLocationApiUrl = "https://booking-com.p.rapidapi.com/v1/hotels/locations?name=" + city + "&locale=en-us";

    fetch(hotelLocationApiUrl, {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': '297373a073msh7b0598ca6341179p15ab78jsn93aac3e1c65e',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (locationData) {

            var cityId = locationData[0].dest_id

            if (checkIn.value === null || checkOut.value === null || cityId === null) {
                showError("missing Input", "One or more fields are empty")
                return;
            }

            var searchHotel = "https://booking-com.p.rapidapi.com/v1/hotels/search?checkin_date=" + checkIn.value + "&dest_type=city&units=metric&checkout_date=" + checkOut.value + "&adults_number=2&order_by=price&dest_id=" + cityId + "&filter_by_currency=CAD&locale=en-us&room_number=1&%2C0&page_number=0&include_adjacency=true"

            fetch(searchHotel, {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': '297373a073msh7b0598ca6341179p15ab78jsn93aac3e1c65e',
                    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    var newData = data.result.slice(0, 10)
                    var allHotelData = readHotelData(newData);

                    $("#hotelsarea").removeClass("hidden");

                    cleanUpHotels()
                    renderAllRows(allHotelData);
                })                
        })
}

var cleanUpHotels = function () {
    $(hotelsTable).find("tr").not(".table-header-row").remove();
}

var readHotelData = function (newData) {

    var allHotelData = []

    for (var i = 0; i < newData.length; i++) {
        var hotelName = newData[i].hotel_name;
        var hotelAddress = newData[i].address
        var totalPrice = newData[i].price_breakdown.gross_price
        allHotelData.push({

            "hotelName": hotelName,
            "hotelAddress": hotelAddress,
            "totalPrice": totalPrice
        })
    }
    return allHotelData
}

var createRow = function (allHotelData) {

    var hotelRowEl = document.createElement("tr");
    hotelRowEl.setAttribute("class", "hotel-information-row flex flex-col mb-4 sm:table-row");
    var hotelName1 = document.createElement("td")
    hotelName1.textContent = allHotelData.hotelName
    hotelName1.setAttribute("class", "p-2 border border-slate-300 ...")
    hotelRowEl.appendChild(hotelName1)
    var hotelAddress1 = document.createElement("td")
    hotelAddress1.textContent = allHotelData.hotelAddress
    hotelAddress1.setAttribute("class", "p-2 border border-slate-300 ...")
    hotelRowEl.appendChild(hotelAddress1)
    var totalPrice1 = document.createElement("td")
    totalPrice1.textContent = allHotelData.totalPrice
    totalPrice1.setAttribute("class", "p-2 border border-slate-300 ...")
    hotelRowEl.appendChild(totalPrice1)

    var saveHotelButtonEl = document.createElement("button");
    saveHotelButtonEl.setAttribute("data-hotel-name", allHotelData.hotelName);
    saveHotelButtonEl.setAttribute("data-hotel-address", allHotelData.hotelAddress);
    saveHotelButtonEl.setAttribute("data-total-price", allHotelData.totalPrice);
    saveHotelButtonEl.setAttribute("style", "margin: 0 7px; ")
    saveHotelButtonEl.setAttribute("class", "transition p-3 text-white ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ... p-2 border border-slate-300 ...")
    saveHotelButtonEl.textContent = "Save Hotel";
    hotelRowEl.appendChild(saveHotelButtonEl);

    saveHotelButtonEl.addEventListener("click", saveChosenHotel);
    return hotelRowEl;
}

var renderAllRows = function (allHotelData) {
    for (var i = 0; i < allHotelData.length; i++) {
        hotelsTable.appendChild(createRow(allHotelData[i]));
    }
    if (allHotelData.length === 0) {
        showError("No Information found!", "Hotels API returned no match!")
    }
}

var saveChosenHotel = function (event) {
    let [cityName, hotelName, hotelAddress, checkinDate, checkoutDate, totalPrice] = chosenHotelInfo(event.target)
    var hotel = {}
    hotel.cityName = cityName;
    hotel.hotelName = hotelName;
    hotel.hotelAddress = hotelAddress;
    hotel.checkinDate = checkinDate;
    hotel.checkoutDate = checkoutDate;
    hotel.totalPrice = totalPrice;
    savedHotels.push(hotel)

    storeHotels();

    window.location.href = "./hotelbookmarks.html"
}

var chosenHotelInfo = function (button) {
    return [button.dataset.cityName, button.dataset.hotelName, button.dataset.hotelAddress, button.dataset.checkinDate, button.dataset.checkoutDate, button.dataset.totalPrice];
}