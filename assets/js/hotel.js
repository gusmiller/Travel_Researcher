var HotelApiKey = "297373a073msh7b0598ca6341179p15ab78jsn93aac3e1c65e"
var checkIn = document.querySelector("#checkin-date-input")
var checkOut = document.querySelector("#checkout-date-input")
var city = document.querySelector("#city")
var searchButton = document.querySelector("#searchbtn")


searchButton.addEventListener("click", (event) => {

    event.preventDefault();

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
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        
        var cityId = data[0].dest_id

        var searchHotel = "https://booking-com.p.rapidapi.com/v1/hotels/search?checkin_date=" + checkIn.value + "&dest_type=city&units=metric&checkout_date=" + checkOut.value + "&adults_number=2&order_by=popularity&dest_id=" + cityId + "&filter_by_currency=AED&locale=en-gb&room_number=1&children_number=2&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true"

        fetch(searchHotel, {
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
        console.log(data);



        
    })
}

console.log(checkIn.value)



