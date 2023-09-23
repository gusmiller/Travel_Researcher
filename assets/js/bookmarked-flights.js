var savedFlightNumberEl = document.querySelector("#saved-flight-number")
var savedDepartureCityEl = document.querySelector("#saved-departure-city")
var savedDepartureDateEl = document.querySelector("#saved-departure-date")
var savedDepartureTimeEl = document.querySelector("#saved-departure-time")
var bookmarkedFlightsTableEl = document.querySelector(".bookmarked-flights-table")







var loadSavedFlights = function() {
    var storedFlights = JSON.parse(localStorage.getItem("savedFlights"));
    // if (storedFlights != null) {
    //     return; 
        // pop up shows

    console.log(storedFlights)
    return storedFlights
}


var storedFlights = loadSavedFlights()

var renderTableRows = function(storedFlights) {
    for (var i =0; i < storedFlights.length; i++) {
        var tableRowEl = document.createElement("tr");
        tableRowEl.setAttribute("class", "saved-flight-information-row");
        var flightNumberEl = document.createElement("td");
        flightNumberEl.textContent = storedFlights[i]["flightNumber"];
        tableRowEl.appendChild(flightNumberEl);
        var departureCityEl = document.createElement("td");
        departureCityEl.textContent = storedFlights[i]["departureCity"];
        tableRowEl.appendChild(departureCityEl);
        var departureDateEl = document.createElement("td");
        departureDateEl.textContent = storedFlights[i]["departureDate"];
        tableRowEl.appendChild(departureDateEl);
        var departureTimeEl = document.createElement("td");
        departureTimeEl.textContent = storedFlights[i]["departureTime"];
        tableRowEl.appendChild(departureTimeEl);
        var destinationCityEl = document.createElement("td");
        destinationCityEl.textContent = storedFlights[i]["destinationCity"];
        tableRowEl.appendChild(destinationCityEl);
        var arrivalTimeEl = document.createElement("td");
        arrivalTimeEl.textContent = storedFlights[i]["arrivalTime"];
        tableRowEl.appendChild(arrivalTimeEl);
        var flightDurationEl = document.createElement("td");
        flightDurationEl.textContent = storedFlights[i]["flightDuration"];
        tableRowEl.appendChild(flightDurationEl);
        var flightPriceEl = document.createElement("td");
        flightPriceEl.textContent = storedFlights[i]["flightPrice"];
        tableRowEl.appendChild(flightPriceEl);
        bookmarkedFlightsTableEl.appendChild(tableRowEl)
    }
}

renderTableRows(storedFlights)