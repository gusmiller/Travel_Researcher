// 

var hotelTable = document.querySelector(".bookmark-table")
const openflightModal = document.getElementById('openModal');
const closeflightModal = document.getElementById('closeModal');
const closeModal = document.getElementById('close-popup');
const warning = document.getElementById('warningModal');

var loadData = window.addEventListener("load", () => {
    var getHotels = JSON.parse(localStorage.getItem("storedHotels"));

    if (getHotels == null) {
        $("#pagemain").addClass("hidden");
        var errordisplay = "There are currently no bookmarked hotels! Hotels are booked after the flight has been selected. Currently you have not selected a flights"
        displayWarningModal("No Bookmarked Hotels", errordisplay);
        return;
    }

    createRows(getHotels)
})

var displayWarningModal = function (title, message) {
    $("#errorTitle").text(title);
    $("#errorMessage").text(message);
    warning.classList.remove('hidden');

    closeflightModal.addEventListener('click', () => {
        warning.classList.add('hidden');
        window.location.href = "./index.html"
    });
}

var transformData = function () {
}

transformData()

var displayBookedHotelPopup = function (event) {
    console.log("click")
    var getHotels = event.target.dataset;
    console.log(getHotels);
    $("#city").val(getHotels.city);
    $("#hotel").val(getHotels.hotelName);
    $("#address").val(getHotels.hotelAddress);
    $("#price").val(getHotels.totalPrice);
    $("#popup").removeClass("hidden");
    closeModal.addEventListener("click", () => {
        $("#popup").addClass("hidden")
        window.location.href = "./index.html"
    })
    return getHotels
}
function createRows(getHotels) {
    var hotelRowEl = document.createElement("tr");
    hotelRowEl.setAttribute("class", "hotel-information-row flex flex-col mb-4 sm:table-row");
    var hotelName1 = document.createElement("td")
    hotelName1.textContent = getHotels.hotelName
    hotelName1.setAttribute("class", "p-2 border border-slate-300 ...")
    hotelRowEl.appendChild(hotelName1)
    var hotelAddress1 = document.createElement("td")
    hotelAddress1.textContent = getHotels.hotelAddress
    hotelAddress1.setAttribute("class", "p-2 border border-slate-300 ...")
    hotelRowEl.appendChild(hotelAddress1)
    var totalPrice1 = document.createElement("td")
    totalPrice1.textContent = getHotels.totalPrice
    totalPrice1.setAttribute("class", "p-2 border border-slate-300 ...")
    hotelRowEl.appendChild(totalPrice1)
    renderAllRows(getHotels)
    var bookmarkHotels = document.createElement("button")
    bookmarkHotels.textContent = "Book Hotel"
    bookmarkHotels.setAttribute("class", "transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...")
    bookmarkHotels.setAttribute("data-hotel-name", getHotels.hotelName);
    bookmarkHotels.setAttribute("data-hotel-address", getHotels.hotelAddress);
    bookmarkHotels.setAttribute("data-total-price", getHotels.totalPrice);
    bookmarkHotels.setAttribute("data-city", getHotels.city);
    hotelRowEl.appendChild(bookmarkHotels)
    bookmarkHotels.addEventListener("click", displayBookedHotelPopup)
    return hotelRowEl
}
function renderAllRows(getHotels) {
    for (var i = 0; i < getHotels.length; i++) {
        hotelTable.appendChild(createRows(getHotels[i]));
    }
}