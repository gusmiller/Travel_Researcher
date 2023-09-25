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



function showError(title, message){
    const errModal = document.getElementById('warningModal');
    $("#errorTitle").text(title);
    $("#errorMessage").text(message);
    errModal.classList.remove('hidden');

    
    }

  closeflightModal.addEventListener('click', () => {
  warning.classList.add('hidden');
  })




var savedHotels = []



var storeHotels = function() {
    localStorage.setItem("storedHotels", JSON.stringify(savedHotels));
}


window.onload = function() {
    var storedHotels = JSON.parse(localStorage.getItem("storedHotels"));
    if (storedHotels != null) {
        savedHotels = storedHotels;
    }
}


searchButton.addEventListener("click", (event) => {

    event.preventDefault();
    if (!checkIn.value || !checkOut.value || !city) {
        showError("Missing Input", "One or more fields are empty/Invalid data")
        return;
    }

    fetchHotels(city.value);
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
                displayWarningModal("missing Input", "One or more fields are empty")
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
                    console.log(data);
                    cleanUpHotels()
                    renderAllRows(allHotelData);
                    
                })
            console.log(locationData);
            
        })
}


var cleanUpHotels = function() {
    $(hotelsTable).find("tr").not(".table-header-row").remove();
}



var readHotelData = function (newData) {

    var allHotelData = []


    for (var i = 0; i < newData.length; i++) {
        var cityName = newData[i].city;
        var hotelName = newData[i].hotel_name;
        var hotelAddress = newData[i].address
        var checkin = checkIn.value
        var checkout = checkOut.value
        var totalPrice = newData[i].price_breakdown.gross_price
        allHotelData.push({
            "cityName": cityName,
            "hotelName": hotelName,
            "hotelAddress": hotelAddress,
            "checkIn": checkin,
            "checkOut": checkout,
            "totalPrice": totalPrice
        })
        
    }
    console.log(allHotelData)
return allHotelData
    
}


var createRow = function (allHotelData) {

    var hotelRowEl = document.createElement("tr");
    hotelRowEl.setAttribute("class", "hotel-information-row");
    var cityName1 = document.createElement("td")
    cityName1.textContent = allHotelData.cityName
    hotelRowEl.appendChild(cityName1)
    var hotelName1 = document.createElement("td")
    hotelName1.textContent = allHotelData.hotelName
    hotelRowEl.appendChild(hotelName1)
    var hotelAddress1 = document.createElement("td")
    hotelAddress1.textContent = allHotelData.hotelAddress
    hotelRowEl.appendChild(hotelAddress1)
    var checkIn1 = document.createElement("td")
    checkIn1.textContent = allHotelData.checkIn
    hotelRowEl.appendChild(checkIn1)
    var checkOut1 = document.createElement("td")
    checkOut1.textContent = allHotelData.checkOut
    hotelRowEl.appendChild(checkOut1)
    var totalPrice1 = document.createElement("td")
    totalPrice1.textContent = allHotelData.totalPrice
    hotelRowEl.appendChild(totalPrice1)
    var saveHotelButtonEl = document.createElement("button");
    saveHotelButtonEl.setAttribute("data-city-name", allHotelData.cityName);
    saveHotelButtonEl.setAttribute("data-hotel-name", allHotelData.hotelName);
    saveHotelButtonEl.setAttribute("data-hotel-address", allHotelData.hotelAddress);
    saveHotelButtonEl.setAttribute("data-checkin-date", allHotelData.checkIn);
    saveHotelButtonEl.setAttribute("data-checkout-date", allHotelData.checkOut);
    saveHotelButtonEl.setAttribute("data-total-price", allHotelData.totalPrice);
    saveHotelButtonEl.setAttribute("style", "margin: 0 7px;")
    saveHotelButtonEl.textContent = "Save Hotel";
    hotelRowEl.appendChild(saveHotelButtonEl);
    saveHotelButtonEl.addEventListener("click", saveChosenHotel);
    var bookHotelButton = document.createElement("button")
    bookHotelButton.textContent = "Book Hotel"
    bookHotelButton.setAttribute("style", "margin: 0 7px;")
    hotelRowEl.appendChild(bookHotelButton)
    return hotelRowEl;
}


var renderAllRows = function(allHotelData) {
    for (var i = 0; i < allHotelData.length; i++){
        hotelsTable.appendChild(createRow(allHotelData[i]));
    }
    if (allHotelData.length === 0) {
       
    }
}


var saveChosenHotel = function(event) {

    console.log(event)
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


}


var chosenHotelInfo = function(button) {
    return [button.dataset.cityName, button.dataset.hotelName, button.dataset.hotelAddress, button.dataset.checkinDate, button.dataset.checkoutDate, button.dataset.totalPrice];
}


