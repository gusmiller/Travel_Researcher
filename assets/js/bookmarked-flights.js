var savedFlightNumberEl = document.querySelector("#saved-flight-number")
var savedDepartureCityEl = document.querySelector("#saved-departure-city")
var savedDepartureDateEl = document.querySelector("#saved-departure-date")
var savedDepartureTimeEl - document.querySelector("#saved-departure-time")
var 







var loadSavedFlights = function() {
    var storedFlights = JSON.parse(localStorage.getItem("savedFlights"));
    if (storedFlights = null) {
        return; 
        // pop up shows
    }
    console.log(storedFlights)
    return storedFlights
}

var storedFlights = loadSavedFlights()

var renderOneTableRow = function(storedFlights) {
    var tableRowEl = document.createElement("tr");
    tableRowEl.setAttribute("class", "saved-flight-information-row");
    for (var i =0; i < storedFlights.length; i++) {
        var flightNumberEl = document.createElement("td");
        flightNumberEl.textContent = storedFlights[i]["flightNumber"];
        var departureCityEl = document.createElement("td");
        departureCityEl.textContent = storedFlights[i]["departureCity"];
        var departureDateEl = document.createElement("td");
        departureDateEl.textContent = storedFlights[i]["departureDate"]
        var departureTimeEl = document.createElement("td");
    }
}