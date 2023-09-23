var HotelApiKey = "297373a073msh7b0598ca6341179p15ab78jsn93aac3e1c65e"
var checkIn = document.querySelector("#checkin-date-input")
var checkOut = document.querySelector("#checkout-date-input")
var city = document.querySelector("#city")
var searchButton = document.querySelector("#searchbtn")

var checkInValue = checkIn.value
var checkOutValue = checkOut.value
var cityValue = city.value



searchButton.addEventListener("click", (event) => {

    event.preventDefault();

    fetchHotels(cityValue);
})


var fetchHotels = function (cityValue) {


    var hotelLocationApiUrl = "https://booking-com.p.rapidapi.com/v1/hotels/locations?name=" + cityValue + "&locale=en-us";

    fetch(hotelLocationApiUrl, {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': '297373a073msh7b0598ca6341179p15ab78jsn93aac3e1c65e',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);

        
    })
}




