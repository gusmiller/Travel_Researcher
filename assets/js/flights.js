var flightsApiKey = "bc62d3c507d8b552c56639324618f98b";
var departureCitySelectEl = document.querySelector("#departure-city");
var destinationCitySelectEl = document.querySelector("#destination-city");
var departureDateSelectEl = document.querySelector("#departure-date-input");
var searchFlightButtonEl = document.querySelector("#search-flight-button");
var flightInformationRowsEl = document.querySelector(".flight-information-row");
var selectmenuDepartureEl = document.querySelector("#departure-city");
var selectmenuDestinationEl = document.querySelector("#destination-city");
var flightsTableEl = document.querySelector(".flights-table");
var rowsTableSectionEl =  document.querySelector(".rows-table-section");

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
var searchedFlightsList = [];

var searchedFlights = {};

var storeSearchedFlights = function() {
    localStorage.setItem("savedFlights", JSON.stringify(searchedFlightsList));
}

var init = function() {
    loadSavedFlights();
    renderSelectmenuOptions();
}

var loadSavedFlights = function() {
    var storedFlights = JSON.parse(localStorage.getItem("savedFlights"));
    if (storedFlights != null) {
        searchedFlightsList = storedFlights;
    }
}

var getDepartureIataCodeByCityName = function(object, city) {
    var departureCode = Object.keys(object).find(key => object[key] === city);
    return departureCode;
}

var getDestinationIataCodeByCityName = function(object, city) {
    var destinationCode = Object.keys(object).find(key => object[key] === city);
    return destinationCode;
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

var searchParameters = function() {
    var departureCitySelect = departureCitySelectEl.value;
    var destinationCitySelect = destinationCitySelectEl.value;
    var departureDateSelect = departureDateSelectEl.value;
    return [departureCitySelect, destinationCitySelect, departureDateSelect];
}

var searchFlights = function(event) {
    event.preventDefault();
    let [departureCitySelect, destinationCitySelect, departureDateSelect] = searchParameters();
    if (!departureCitySelect || !destinationCitySelect || !departureDateSelect) {
        return; 
        // pop up message will show
    }

    var departureCode = getDepartureIataCodeByCityName(cityCodes, departureCitySelect);
    var destinationCode = getDestinationIataCodeByCityName(cityCodes, destinationCitySelect);
    cleanupFlightsTable();
    getFlightData(departureDateSelect, departureCode, destinationCode);
}

var cleanupFlightsTable = function() {
    $(flightsTableEl).find('tr').not('.table-header-row').remove();
}

var getFlightData = function(departureDateSelect, departureCode, destinationCode) {
    var flightApiUrl = "https://api.tequila.kiwi.com/v2/search?" + "fly_from=" + departureCode + "&fly_to=" + destinationCode + "&date_from=" + departureDateSelect + "&date_to=" + departureDateSelect + "&limit=10" + "&curr=CAD";
    fetch(flightApiUrl, {
        headers: {
            "apikey": "28KlXgTIJqrzQn9w0jUTkn75Yvb2HwDH",
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);

        var allFlightData = readFlightData(data);
        renderAllRows(allFlightData);
    })
}

var readFlightData = function(data) {
    var allFlightData = []
    for (var i = 0; i < data["data"].length; i++) {
        var departureTimeData = data["data"][i]["local_departure"];
        var departureTime = departureTimeData.split("T");
        var arrivalTimeData = data["data"][i]["local_arrival"];
        var arrivalTime = arrivalTimeData.split("T");
        var flightDurationData = data["data"][i]["duration"]["total"];
        var flightDurationHours = Math.trunc((flightDurationData/60)/60);
        var flightDurationMinutes = (flightDurationData/60) % 60;
        var flightDuration = flightDurationHours.toString() + ":" + flightDurationMinutes.toString();
        var flightPrice = data["data"][i]["price"];
        var flightNumber = data["data"][i]["route"][0]["flight_no"];
        var departureCity = data["data"][i]["cityFrom"];
        var destinationCity = data["data"][i]["cityTo"];
        var departureDateRaw = data["data"][i]["local_departure"];
        allFlightData.push({
            "departureCity": departureCity,
            "destinationCity": destinationCity,
            "departureDate": departureDateRaw,
            "departureTime": departureTime,
            "arrivalTime": arrivalTime,
            "flightDuration": flightDuration,
            "flightNumber": flightNumber,
            "flightPrice": flightPrice,
        })
    }
    return allFlightData;
}

var renderOneFlightRow = function(flightData) {
    var tableRowEl = document.createElement("tr");
    tableRowEl.setAttribute("class", "flight-information-row");
    var departureDate = flightData["departureDate"][0].slice(0, 11);
    var departureTimeEl = document.createElement("td");
    departureTimeEl.textContent = flightData["departureTime"][1].slice(0, 5);
    tableRowEl.appendChild(departureTimeEl);
    var arrivalTimeEl = document.createElement("td");
    arrivalTimeEl.textContent = flightData["arrivalTime"][1].slice(0, 5);
    tableRowEl.appendChild(arrivalTimeEl);
    var flightDurationEl = document.createElement("td");
    flightDurationEl.textContent = flightData["flightDuration"];
    tableRowEl.appendChild(flightDurationEl);
    var flightNumber = document.createElement("td");
    flightNumber.textContent = flightData["flightNumber"].toString();
    tableRowEl.appendChild(flightNumber);
    var flightPriceEl = document.createElement("td");
    flightPriceEl.textContent = flightData["flightPrice"].toString();
    tableRowEl.appendChild(flightPriceEl);
    var saveFlightButtonEl = document.createElement("button");
    saveFlightButtonEl.setAttribute("data-departure-city", flightData["departureCity"]);
    saveFlightButtonEl.setAttribute("data-destination-city", flightData["destinationCity"]);
    saveFlightButtonEl.setAttribute("departureDate", departureDate);
    saveFlightButtonEl.setAttribute("data-departure-time", departureTimeEl.textContent);
    saveFlightButtonEl.setAttribute("data-arrival-time", arrivalTimeEl.textContent);
    saveFlightButtonEl.setAttribute("data-flight-duration", flightDurationEl.textContent);
    saveFlightButtonEl.setAttribute("data-flight-number", flightNumber.textContent);
    saveFlightButtonEl.setAttribute("data-flight-price", flightPriceEl.textContent);
    saveFlightButtonEl.textContent = "Save Flight";
    tableRowEl.appendChild(saveFlightButtonEl);
    saveFlightButtonEl.addEventListener("click", saveChosenFlight);
    return tableRowEl;
}

var renderAllRows = function(allFlightData) {
    for (var i = 0; i < allFlightData.length; i++){
        flightsTableEl.appendChild(renderOneFlightRow(allFlightData[i]));
    }
}

var saveChosenFlight = function(event) {
    event.preventDefault();
    let [departureTime, arrivalTime, flightDuration, flightPrice, flightNumber, departureCity, destinationCity, departureDate] = chosenFlightInfo(event.target);
    searchedFlights["departureCity"] = departureCity;
    searchedFlights["destinationCity"] = destinationCity;
    searchedFlights["departureDate"] = departureDate;
    searchedFlights["departureTime"] = departureTime;
    searchedFlights["arrivalTime"] = arrivalTime;
    searchedFlights["flightDuration"] = flightDuration;
    searchedFlights["flightNumber"] = flightNumber;
    searchedFlights["flightPrice"] = flightPrice;
    searchedFlightsList.push(searchedFlights);
    storeSearchedFlights();
}

var chosenFlightInfo = function(button) {
    return [button.dataset.departureTime, button.dataset.arrivalTime, button.dataset.flightDuration, button.dataset.flightPrice, button.dataset.flightNumber, button.dataset.departureCity, button.dataset.destinationCity, button.dataset.departureDate];
}

searchFlightButtonEl.addEventListener("click", searchFlights);
init();

