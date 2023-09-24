// var HotelApiKey = "297373a073msh7b0598ca6341179p15ab78jsn93aac3e1c65e"
// var checkIn = document.querySelector("#checkin-date-input")
// var checkOut = document.querySelector("#checkout-date-input")
// var city = document.querySelector("#city")
// var searchButton = document.querySelector("#searchbtn")


// searchButton.addEventListener("click", (event) => {

//     event.preventDefault();

//     fetchHotels(city.value);
// })


// var fetchHotels = function (city) {

//     var hotelLocationApiUrl = "https://booking-com.p.rapidapi.com/v1/hotels/locations?name=" + city + "&locale=en-us";

//     fetch(hotelLocationApiUrl, {
//         method: "GET",
//         headers: {
//             'X-RapidAPI-Key': '297373a073msh7b0598ca6341179p15ab78jsn93aac3e1c65e',
//             'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
//         }
//     })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (locationData) {

//             var cityId = locationData[0].dest_id

//             var searchHotel = "https://booking-com.p.rapidapi.com/v1/hotels/search?checkin_date=" + checkIn.value + "&dest_type=city&units=metric&checkout_date=" + checkOut.value + "&adults_number=2&order_by=price&dest_id=" + cityId + "&filter_by_currency=CAD&locale=en-us&room_number=1&%2C0&page_number=0&include_adjacency=true"

//             fetch(searchHotel, {
//                 method: "GET",
//                 headers: {
//                     'X-RapidAPI-Key': '297373a073msh7b0598ca6341179p15ab78jsn93aac3e1c65e',
//                     'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
//                 }
//             })
//                 .then(function (response) {
//                     return response.json();
//                 })
//                 .then(function (data) {
//                     console.log(data)
//                     var slicedData = data.result.slice(0, 10)
//                     console.log(slicedData)
//                     readHotelData(slicedData);
//                 })
//             // console.log(locationData);

//         })
// }

// var readHotelData = function (slicedData) {

//     var allHotelData = []

//     for (var i = 0; i < slicedData.length; i++) {
//         var cityName = slicedData[i].city;
//         var hotelName = slicedData[i].hotel_name;
//         var hotelAddress = slicedData[i].address
//         var checkin = checkIn.value
//         var checkout = checkOut.value
//         var totalPrice = slicedData[i].price_breakdown.gross_price
//         allHotelData.push({
//             "cityname": cityName,
//             "hotelname": hotelName,
//             "hoteladdress": hotelAddress,
//             "checkin": checkin,
//             "checkout": checkout,
//             "totalprice": totalPrice
//         })
//         // console.log(allHotelData)
//     }
//     console.log(allHotelData)
// return allHotelData
    
// }


var hotelTable = document.querySelector(".bookmark-table")

window.onload = function () {
    
    var getHotels = JSON.parse(localStorage.getItem("storedHotels")) || [];
    console.log(getHotels)
    createRows(getHotels)
    return getHotels
    
    
}

function createRows (getHotels) {

var hotelRowEl = document.createElement("tr");
    hotelRowEl.setAttribute("class", "hotel-information-row");
    var cityName1 = document.createElement("td")
    cityName1.textContent = getHotels.cityName
    hotelRowEl.appendChild(cityName1)
    var hotelName1 = document.createElement("td")
    hotelName1.textContent = getHotels.hotelName
    hotelRowEl.appendChild(hotelName1)
    var hotelAddress1 = document.createElement("td")
    hotelAddress1.textContent = getHotels.hotelAddress
    hotelRowEl.appendChild(hotelAddress1)
    var checkIn1 = document.createElement("td")
    checkIn1.textContent = getHotels.checkinDate
    hotelRowEl.appendChild(checkIn1)
    var checkOut1 = document.createElement("td")
    checkOut1.textContent = getHotels.checkoutDate
    hotelRowEl.appendChild(checkOut1)
    var totalPrice1 = document.createElement("td")
    totalPrice1.textContent = getHotels.totalPrice
    hotelRowEl.appendChild(totalPrice1)
    // renderAllRows(getHotels)

    return hotelRowEl
}

function renderAllRows(hotels) {

    // var hotels = window.onload

    for (var i = 0; i < hotels.length; i++){
        hotelTable.appendChild(createRows(hotels[i]));
    }
    

}