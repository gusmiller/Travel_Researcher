var bookmarkedFlightsTableEl = document.querySelector(".bookmarked-flights-table")
const openflightModal = document.getElementById('openModal');
const closeflightModal = document.getElementById('closeModal');
const closeModal = document.getElementById('close-popup');
const warning = document.getElementById('warningModal');

var savedFlightDestinationList = []

var displayWarningModal = function(title, message) {
    $("#errorTitle").text(title);
    $("#errorMessage").text(message);
    warning.classList.remove('hidden');

    closeflightModal.addEventListener('click', () => {
        warning.classList.add('hidden');
        window.location.href = "./index.html"
    });
}

var init = function() {
    var storedFlights = loadSavedFlights();
    renderTableRows(storedFlights);
    // loadSavedDestinations();
    closeModal.addEventListener("click", function () {
        const modal = document.getElementById('popup');
        modal.classList.add('hidden')
    });
}

var loadSavedFlights = function() {
    var storedFlights = JSON.parse(localStorage.getItem("savedFlights"));
    if (storedFlights == null) {
        console.log(storedFlights)
        displayWarningModal("No Bookmarked Flights", "There are currently no bookmarked flights");
        return; 
    }

    console.log(storedFlights)
    return storedFlights
}

var loadSavedDestinations = function() {
    var savedDestinations = JSON.parse(localStorage.getItem("savedDestinations"));
    if (savedDestinations != null) {
        savedFlightDestinationList = savedDestinations;
    }
}

var renderTableRows = function(storedFlights) {
    for (var i =0; i < storedFlights.length; i++) {
        var tableRowEl = document.createElement("tr");
        tableRowEl.setAttribute("class", "saved-flight-information-row");
        var flightNumberEl = document.createElement("td");
        flightNumberEl.setAttribute("class", "p-2 border border-slate-300 ...")
        flightNumberEl.textContent = storedFlights[i]["flightNumber"];
        tableRowEl.appendChild(flightNumberEl);
        var departureCityEl = document.createElement("td");
        departureCityEl.setAttribute("class", "p-2 border border-slate-300 ...")
        departureCityEl.textContent = storedFlights[i]["departureCity"];
        tableRowEl.appendChild(departureCityEl);
        var departureDateEl = document.createElement("td");
        departureDateEl.setAttribute("class", "p-2 border border-slate-300 ...")
        departureDateEl.textContent = storedFlights[i]["departureDate"];
        tableRowEl.appendChild(departureDateEl);
        var departureTimeEl = document.createElement("td");
        departureTimeEl.setAttribute("class", "p-2 border border-slate-300 ...")
        departureTimeEl.textContent = storedFlights[i]["departureTime"];
        tableRowEl.appendChild(departureTimeEl);
        var destinationCityEl = document.createElement("td");
        destinationCityEl.setAttribute("class", "p-2 border border-slate-300 ...")
        destinationCityEl.textContent = storedFlights[i]["destinationCity"];
        tableRowEl.appendChild(destinationCityEl);
        var arrivalTimeEl = document.createElement("td");
        arrivalTimeEl.setAttribute("class", "p-2 border border-slate-300 ...")
        arrivalTimeEl.textContent = storedFlights[i]["arrivalTime"];
        tableRowEl.appendChild(arrivalTimeEl);
        var flightDurationEl = document.createElement("td");
        flightDurationEl.setAttribute("class", "p-2 border border-slate-300 ...")
        flightDurationEl.textContent = storedFlights[i]["flightDuration"];
        tableRowEl.appendChild(flightDurationEl);
        var flightPriceEl = document.createElement("td");
        flightPriceEl.setAttribute("class", "p-2 border border-slate-300 ...")
        flightPriceEl.textContent = storedFlights[i]["flightPrice"];
        tableRowEl.appendChild(flightPriceEl);
        var bookFlightButtonEl = document.createElement("button");
        bookFlightButtonEl.setAttribute("id", "book-flight-button");
        bookFlightButtonEl.setAttribute("data-departure-city", departureCityEl.textContent)
        bookFlightButtonEl.setAttribute("data-destination-city", destinationCityEl.textContent)
        bookFlightButtonEl.setAttribute("data-departure-date", departureDateEl.textContent);
        bookFlightButtonEl.setAttribute("data-departure-time", departureTimeEl.textContent);
        bookFlightButtonEl.setAttribute("data-arrival-time", arrivalTimeEl.textContent);
        bookFlightButtonEl.setAttribute("data-flight-duration", flightDurationEl.textContent);
        bookFlightButtonEl.setAttribute("data-flight-number", flightNumberEl.textContent);
        bookFlightButtonEl.setAttribute("data-flight-price", flightPriceEl.textContent);
        bookFlightButtonEl.setAttribute("class", "text-white px-3 py-2 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...")
        bookFlightButtonEl.textContent = "Book Flight"
        tableRowEl.appendChild(bookFlightButtonEl)
        bookmarkedFlightsTableEl.appendChild(tableRowEl);

        bookFlightButtonEl.addEventListener("click", saveDestination);
    }
}

var saveDestination = function(event) {
    event.preventDefault();
    var savedFlightDestination = {}
    let destinationCity = bookedFlightDestination(event.target);
    savedFlightDestination["destinationCity"] = destinationCity;

    // savedFlightDestinationList.push(savedFlightDestination);
    storeSavedDestinations(savedFlightDestination);
    var flight = event.target.dataset;
    displayBookedFlightPopup(flight);
}

var displayBookedFlightPopup = function(flight) {
    console.log(flight);
    $("#flightNumber").val(flight.flightNumber);
    $("#departureCity").val(flight.departureCity);
    $("#departureDate").val(flight.departureDate);
    $("#departureTime").val(flight.departureTime);
    $("#destinationCity").val(flight.destinationCity);
    $("#arrivalTime").val(flight.arrivalTime);
    $("#flightDuration").val(flight.flightDuration);
    $("#price").val(flight.flightPrice);
    
    $("#popup").removeClass("hidden");
}

var bookedFlightDestination = function(button) {
    return button.dataset.destinationCity;
}

var storeSavedDestinations = function(savedFlightDestination) {
    localStorage.setItem("savedDestinations", JSON.stringify(savedFlightDestination))
}

init();