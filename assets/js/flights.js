var flightsApiKey = "bc62d3c507d8b552c56639324618f98b";
var departureCityInputEl = document.querySelector("#departure-city-input");
var destinationCityInputEl = document.querySelector("#destination-city-input");
var departureDateInputEl = document.querySelector("#departure-date-input");




var searchedFlights = {};

var storeSearchedFlights = function() {
    localStorage.setItem("storeSearchedFlights", JSON.stringify(searchedFlights));
}

var startingWithCapital = function(str) {
    return str.replace(/\b\w/g, x => x.toUpperCase());
}

var searchParameters = function() {
    var departureCityInput = departureCityInputEl.value.trim();
    var departureCityCapital = startingWithCapital(departureCityInput);
    var destinationCityInput = destinationCityInputEl.value.trim();
    var destinationCityCapital = startingWithCapital(destinationCityInput);
    var departureDateInput = departureDateInputEl.value.trim();
    return [departureCityCapital, destinationCityCapital, departureDateInput]
}

var searchFlights = function(event) {
    event.preventDefault();

}

