var flightsApiKey = "bc62d3c507d8b552c56639324618f98b"




var searchedFlights = {};

var storeSearchedFlights = function() {
    localStorage.setItem("storeSearchedFlights", JSON.stringify(searchedFlights));
}

var startingWithCapital = function(str) {
    return str.replace(/\b\w/g, x => x.toUpperCase());
}