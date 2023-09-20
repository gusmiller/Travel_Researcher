var flightsApiKey = "bc62d3c507d8b552c56639324618f98b";
var departureCityInputEl = document.querySelector("#departure-city-input");
var destinationCityInputEl = document.querySelector("#destination-city-input");
var departureDateInputEl = document.querySelector("#departure-date-input");
var searchFlightButtonEl = document.querySelector("#search-flight-button");



var cityCodes = {
    "YYC": "Calgary",
    "YEG": "Edmonton",
    "YFC": "Fredericton",
    "YQX": "Gander",
    "YHZ": "Halifax",
    "YQM": "Moncton",
    "YUL": "Montreal",
    "YOW": "Ottawa",
    "YQB": "Quebec City",
    "YYT": "St. John's",
    "YYZ": "Toronto",
    "YVR": "Vancouver",
    "YWG": "Winnipeg",
}

var searchedFlights = {};

var storeSearchedFlights = function() {
    localStorage.setItem("Store-searched-flights", JSON.stringify(searchedFlights));
}

var startingWithCapital = function(str) {
    return str.replace(/\b\w/g, x => x.toUpperCase());
}

// YYYY-MM-DD departure date format
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
    let [departureCityCapital, destinationCityCapital, departureDateInput] = searchParameters();
    if (!departureCityCapital || !destinationCityCapital || !departureDateInput) {
        return; 
        // pop up message will show
    }
    saveSearchedFlights(departureCityCapital, destinationCityCapital, departureDateInput)
}

var saveSearchedFlights = function(departureCityCapital, destinationCityCapital, departureDateInput) {
    searchedFlights["departure-city"] = departureCityCapital;
    searchedFlights["destination-city"] = destinationCityCapital;
    searchedFlights["departure-date"] = departureDateInput;
    storeSearchedFlights();
}

var getFlightData = function() {
    var flightApiUrl = "https://api.aviationstack.com/v1/flights?access_key=" + flightsApiKey + "flight_date" + departureDateInput +;

    fetch(flightApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}


searchFlightButtonEl.addEventListener("click", searchFlights);