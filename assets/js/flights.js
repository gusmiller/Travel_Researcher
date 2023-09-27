var flightsApiKey = "bc62d3c507d8b552c56639324618f98b";
var departureCitySelectEl = document.querySelector("#departure-city");
var destinationCitySelectEl = document.querySelector("#destination-city");
var departureDateSelectEl = document.querySelector("#departure-date-input");
var searchFlightButtonEl = document.querySelector("#search-flight-button");
var flightInformationRowsEl = document.querySelector(".flight-information-row");
var selectmenuDepartureEl = document.querySelector("#departure-city");
var selectmenuDestinationEl = document.querySelector("#destination-city");
var flightsTableEl = document.querySelector(".flights-table");
var rowsTableSectionEl = document.querySelector(".rows-table-section");
const openflightModal = document.getElementById('openModal');
const closeflightModal = document.getElementById('closeModal');
const closeModal = document.getElementById('close-popup');
const warning = document.getElementById('warningModal');

var dropdown = document.getElementById("departure-city");

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

var storeSearchedFlights = function () {
    localStorage.setItem("savedFlights", JSON.stringify(searchedFlightsList));
}

var displayWarningModal = function (title, message) {
    $("#errorTitle").text(title);
    $("#errorMessage").text(message);
    warning.classList.remove('hidden');

    closeflightModal.addEventListener('click', () => {
        warning.classList.add('hidden');
    });
}

// function that runs when the page opens
var init = function () {
    loadSavedFlights();
    renderSelectmenuOptions();
}

// makes sure local storage doesn't clear after reloading the page
var loadSavedFlights = function () {
    var storedFlights = JSON.parse(localStorage.getItem("savedFlights"));
    if (storedFlights != null) {
        searchedFlightsList = storedFlights;
    }
}

// function to get key using value
var getDepartureIataCodeByCityName = function (object, city) {
    var departureCode = Object.keys(object).find(key => object[key] === city);
    return departureCode;
}

// function to get key using value
var getDestinationIataCodeByCityName = function (object, city) {
    var destinationCode = Object.keys(object).find(key => object[key] === city);
    return destinationCode;
}

// dinamicaly makes departure city and destination city options in selectmenu
// using cityCodes object
var renderSelectmenuOptions = function () {
    for (code in cityCodes) {
        var selectmenuDeparturesOptionEl = document.createElement("option");
        selectmenuDeparturesOptionEl.textContent = cityCodes[code];
        selectmenuDepartureEl.appendChild(selectmenuDeparturesOptionEl);
        var selectmenuDestinationsOptionEl = document.createElement("option");
        selectmenuDestinationsOptionEl.textContent = cityCodes[code];
        selectmenuDestinationEl.appendChild(selectmenuDestinationsOptionEl);
    }

}

// returns parameters from user inputs
var searchParameters = function () {
    var departureCitySelect = departureCitySelectEl.value;
    var destinationCitySelect = destinationCitySelectEl.value;
    var departureDateSelect = departureDateSelectEl.value;
    return [departureCitySelect, destinationCitySelect, departureDateSelect];
}

// function that runs on Search Flights button click
var searchFlights = function (event) {
    event.preventDefault();
    let [departureCitySelect, destinationCitySelect, departureDateSelect] = searchParameters();
    // if one or more input fields are empty show warning modal
    if (!departureCitySelect || !destinationCitySelect || !departureDateSelect) {
        displayWarningModal("Missing Input", "One or more fields are empty.")
        return;
    }

    var departureCode = getDepartureIataCodeByCityName(cityCodes, departureCitySelect);
    var destinationCode = getDestinationIataCodeByCityName(cityCodes, destinationCitySelect);
    cleanupFlightsTable();
    getFlightData(departureDateSelect, departureCode, destinationCode);
}

// clear table data rows before rendering rows from new search
var cleanupFlightsTable = function () {
    $(flightsTableEl).find('tr').not('.table-header-row').remove();
}

// function that uses api and all required parameters fo fetch data
// it also catches errors and displays warning modal
var getFlightData = function (departureDateSelect, departureCode, destinationCode) {
    var flightApiUrl = "https://api.tequila.kiwi.com/v2/search?" + "fly_from=" + departureCode + "&fly_to=" + destinationCode + "&date_from=" + departureDateSelect + "&date_to=" + departureDateSelect + "&limit=10" + "&curr=CAD";
    fetch(flightApiUrl, {
        headers: {
            "apikey": "28KlXgTIJqrzQn9w0jUTkn75Yvb2HwDH",
        }
    })
        .then(function (response) {
            console.log(response)
            if (response.ok) {
                response.json().then(function (data) {
                    var allFlightData = readFlightData(data);
                    renderAllRows(allFlightData);
                })
            } else {
                response.text().then(function (text) {
                    displayWarningModal("Can't Get Flights", text)
                })
            }
        })
        .catch(function (error) {
            displayWarningModal("Can't Get Flights", error)
        })
}

// function that gets all needed data
// and saves it as a value in an object
// returns that object called allFlightData
var readFlightData = function (data) {
    var allFlightData = []
    for (var i = 0; i < data["data"].length; i++) {
        var departureTimeData = data["data"][i]["local_departure"];
        var departureTime = departureTimeData.split("T");
        var arrivalTimeData = data["data"][i]["local_arrival"];
        var arrivalTime = arrivalTimeData.split("T");
        var flightDurationData = data["data"][i]["duration"]["total"];
        var flightDurationHours = Math.trunc((flightDurationData / 60) / 60);
        var flightDurationMinutes = (flightDurationData / 60) % 60;
        var flightDuration = flightDurationHours.toString() + " hr " + flightDurationMinutes.toString() + " min";
        var flightPrice = "CAD " + data["data"][i]["price"];
        var flightNumber = data["data"][i]["route"][0]["flight_no"];
        var departureCity = data["data"][i]["cityFrom"];
        var destinationCity = data["data"][i]["cityTo"];
        var departureDateRaw = data["data"][i]["local_departure"].split("T");
        allFlightData.push({
            "flightNumber": flightNumber,
            "departureCity": departureCity,
            "destinationCity": destinationCity,
            "departureDate": departureDateRaw,
            "departureTime": departureTime,
            "arrivalTime": arrivalTime,
            "flightDuration": flightDuration,
            "flightPrice": flightPrice,
        })
        console.log(allFlightData)
    }
    return allFlightData;
}

// uses allFlightData object keys and values
// creates one row with its data
// adds styling to every table row and table data
// creates button Save Flight
var renderOneFlightRow = function (flightData) {
    var tableRowEl = document.createElement("tr");
    tableRowEl.setAttribute("class", "flight-information-row flex flex-col mb-4 sm:table-row");
    var departureDate = dayjs(flightData["departureDate"][0].slice(0, 11)).format("DD/MM/YYYY");
    var flightNumber = document.createElement("td");
    flightNumber.setAttribute("class", "table-data p-2 border border-slate-300 ...")
    flightNumber.textContent = flightData["flightNumber"].toString();
    tableRowEl.appendChild(flightNumber);
    var departureTimeEl = document.createElement("td");
    departureTimeEl.setAttribute("class", "table-data p-2 border border-slate-300 ...")
    departureTimeEl.textContent = flightData["departureTime"][1].slice(0, 5);
    tableRowEl.appendChild(departureTimeEl);
    var arrivalTimeEl = document.createElement("td");
    arrivalTimeEl.setAttribute("class", "table-data p-2 border border-slate-300 ...")
    arrivalTimeEl.textContent = flightData["arrivalTime"][1].slice(0, 5);
    tableRowEl.appendChild(arrivalTimeEl);
    var flightDurationEl = document.createElement("td");
    flightDurationEl.setAttribute("class", "table-data p-2 border border-slate-300 ...")
    flightDurationEl.textContent = flightData["flightDuration"];
    tableRowEl.appendChild(flightDurationEl);
    var flightPriceEl = document.createElement("td");
    flightPriceEl.setAttribute("class", "table-data py-2 px-3 border border-slate-300 ...")
    flightPriceEl.textContent = flightData["flightPrice"].toString();
    tableRowEl.appendChild(flightPriceEl);
    var saveFlightButtonEl = document.createElement("button");
    saveFlightButtonEl.setAttribute("class", "table-button")
    // setting up data attributes to Save Flight button
    saveFlightButtonEl.setAttribute("data-departure-city", flightData["departureCity"]);
    saveFlightButtonEl.setAttribute("data-destination-city", flightData["destinationCity"]);
    saveFlightButtonEl.setAttribute("data-departure-date", departureDate);
    saveFlightButtonEl.setAttribute("data-departure-time", departureTimeEl.textContent);
    saveFlightButtonEl.setAttribute("data-arrival-time", arrivalTimeEl.textContent);
    saveFlightButtonEl.setAttribute("data-flight-duration", flightDurationEl.textContent);
    saveFlightButtonEl.setAttribute("data-flight-number", flightNumber.textContent);
    saveFlightButtonEl.setAttribute("data-flight-price", flightPriceEl.textContent);
    // adding styling to button
    saveFlightButtonEl.setAttribute("class", "text-white py-2 px-3 border border-slate-300 ... table-button transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...")
    saveFlightButtonEl.textContent = "Save Flight";
    console.log(saveFlightButtonEl)
    tableRowEl.appendChild(saveFlightButtonEl);
    // function saveChosenFlight will run when Save Flight button is clicked
    saveFlightButtonEl.addEventListener("click", saveChosenFlight);
    return tableRowEl;
}

// function that uses for loop and renderOneFlightRow function to create all rows
var renderAllRows = function (allFlightData) {
    for (var i = 0; i < allFlightData.length; i++) {
        flightsTableEl.appendChild(renderOneFlightRow(allFlightData[i]));
    }
    if (allFlightData.length === 0) {
        displayWarningModal("No Flights", "Currently there are no flights that match your search criteria")
    }
}

// function that returns all data attributes that were set in the Save Flight button
// it uses parameter button that is event.target
var chosenFlightInfo = function (button) {
    console.log(button)
    return [button.dataset.departureTime, button.dataset.arrivalTime, button.dataset.flightDuration, button.dataset.flightPrice, button.dataset.flightNumber, button.dataset.departureCity, button.dataset.destinationCity, button.dataset.departureDate];
}

// function that uses data from button/event.target to create an object with all the data about flight
// that object is added to the array so it is not overwritten when new save is made
// stores that array in local storage
var saveChosenFlight = function (event) {
    event.preventDefault();
    console.log(event)
    let [departureTime, arrivalTime, flightDuration, flightPrice, flightNumber, departureCity, destinationCity, departureDate] = chosenFlightInfo(event.target);
    var flight = {}
    flight["departureCity"] = departureCity;
    flight["destinationCity"] = destinationCity;
    flight["departureDate"] = departureDate;
    flight["departureTime"] = departureTime;
    flight["arrivalTime"] = arrivalTime;
    flight["flightDuration"] = flightDuration;
    flight["flightNumber"] = flightNumber;
    flight["flightPrice"] = flightPrice;

    if (flightAlreadySaved(flight)) {
        return;
    }
    searchedFlightsList.push(flight);
    storeSearchedFlights();
    window.location.href = "./flights-bookmarks.html"
}

// if flight is already saved it cannot be saved again
var flightAlreadySaved = function (flight) {
    for (savedFlight of searchedFlightsList) {
        if (savedFlight.flightNumber === flight.flightNumber && savedFlight.departureTime === flight.departureTime) {
            return true;
        }
    }
    return false;
}

searchFlightButtonEl.addEventListener("click", searchFlights);
init();