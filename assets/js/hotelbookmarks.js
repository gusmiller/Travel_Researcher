var hotelTable = document.querySelector(".bookmark-table")

window.onload = function () {
    
    var getHotels = JSONparse(localStorage.getItem("storedHotels"))
    
    for (var i = 0; i < getHotels.length; i++) {
        
    var hotelRowEl = document.createElement("tr");
    hotelRowEl.setAttribute("class", "hotel-information-row");
    hotelTable.appendChild(hotelRowEl)
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
    }
}