var flightsApiKey = "bc62d3c507d8b552c56639324618f98b";
var departureCitySelectEl = document.querySelector("#departure-city");
var destinationCitySelectEl = document.querySelector("#destination-city");
var departureDateSelectEl = document.querySelector("#departure-date-input");
var searchFlightButtonEl = document.querySelector("#search-flight-button");
var flightInformationRowsEl = document.querySelector(".flight-information-row");
var selectmenuDepartureEl = document.querySelector("#departure-city");
var selectmenuDestinationEl = document.querySelector("#destination-city");



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
    localStorage.setItem("searchedFlights", JSON.stringify(searchedFlights));
}

// var startingWithCapital = function(str) {
//     return str.replace(/\b\w/g, x => x.toUpperCase());
// }

var init = function() {
    renderSelectmenuOptions();
}

var renderSelectmenuOptions = function() {
    for (code in cityCodes) {
        var selectmenuDeparturesOptionEl = document.createElement("option");
        selectmenuDeparturesOptionEl.textContent = cityCodes[code];
        selectmenuDepartureEl.appendChild(selectmenuDeparturesOptionEl);
        var selectmenuDestinationsOptionEl = document.createElement("option");
        selectmenuDestinationsOptionEl.textContent = cityCodes[code];
        selectmenuDestinationEl.appendChild(selectmenuDestinationsOptionEl);
    }
}


// YYYY-MM-DD departure date format
var searchParameters = function() {
    var departureCitySelect = departureCitySelectEl.value;
    var destinationCitySelect = destinationCitySelectEl.value;
    var departureDateSelect = departureDateSelectEl.value;
    return [departureCitySelect, destinationCitySelect, departureDateSelect]
}

var searchFlights = function(event) {
    event.preventDefault();
    let [departureCitySelect, destinationCitySelect, departureDateSelect] = searchParameters();
    if (!departureCitySelect || !destinationCitySelect || !departureDateSelect) {
        return; 
        // pop up message will show
    }
    saveSearchedFlights(departureCitySelect, destinationCitySelect, departureDateSelect)
}

var saveSearchedFlights = function(departureCitySelect, destinationCitySelect, departureDateSelect) {
    searchedFlights["departure-city"] = departureCitySelect;
    searchedFlights["destination-city"] = destinationCitySelect;
    searchedFlights["departure-date"] = departureDateSelect;
    storeSearchedFlights();
}

// var getFlightData = function() {
//     var flightApiUrl = "https://api.aviationstack.com/v1/flights?access_key=" + flightsApiKey + "flight_date" + departureDateInput +;

//     fetch(flightApiUrl)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//     })
// }


searchFlightButtonEl.addEventListener("click", searchFlights);
init();