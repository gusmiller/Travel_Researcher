var hotelTable = document.querySelector(".bookmark-table")
const openflightModal = document.getElementById('openModal');
const closeflightModal = document.getElementById('closeModal');
const closeModal = document.getElementById('close-popup');
const warning = document.getElementById('warningModal');


var loadData = window.addEventListener("load", () => {
    
    var getHotels = JSON.parse(localStorage.getItem("storedHotels"));
    createRows(getHotels)
})


var transformData = function(){
    allHotelData = []
    
    var retrieveHotels = JSON.parse(localStorage.getItem("storedHotels"));
    var unpackedData = retrieveHotels.reduce((acc, [key, value]) => {
        acc[key] = value
    })

    var getCity = JSON.parse(localStorage.getItem("savedDestinations"));

    unpackedData.destinationCity = getCity.destinationCity
    
    console.log(unpackedData)
   
    return unpackedData
}

transformData()

var setData = transformData()


var displayBookedHotelPopup = function(event) {
    
    
    console.log("click")
     
    
    var setData = event.target.dataset
    
    console.log(setData);
    $("#City").val(setData.destinationCity);
    $("#Hotel").val(setData.hotelName);
    $("#Address").val(setData.hotelAddress);
    $("#Price").val(setData.totalPrice);
    $("#popup").removeClass("hidden");
    closeModal.addEventListener("click", () =>
    $("#popup").addClass("hidden")
        )
}


function createRows (getHotels) {

var hotelRowEl = document.createElement("tr");
    hotelRowEl.setAttribute("class", "hotel-information-row");
    var hotelName1 = document.createElement("td")
    hotelName1.textContent = getHotels.hotelName
    hotelRowEl.appendChild(hotelName1)
    var hotelAddress1 = document.createElement("td")
    hotelAddress1.textContent = getHotels.hotelAddress
    hotelRowEl.appendChild(hotelAddress1)
    var totalPrice1 = document.createElement("td")
    totalPrice1.textContent = getHotels.totalPrice
    hotelRowEl.appendChild(totalPrice1)
    renderAllRows(getHotels)
    var bookmarkHotels = document.createElement("button")
    bookmarkHotels.textContent = "Book Hotel"
    bookmarkHotels.setAttribute("class", "transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...")
    bookmarkHotels.setAttribute("data-destination-city", getHotels.destinationCity);
    bookmarkHotels.setAttribute("data-hotel-name", getHotels.hotelName);
    bookmarkHotels.setAttribute("data-hotel-address", getHotels.hotelAddress);
    bookmarkHotels.setAttribute("data-total-price", getHotels.totalPrice);
    
    hotelRowEl.appendChild(bookmarkHotels)
    
    bookmarkHotels.addEventListener("click", displayBookedHotelPopup)

    return hotelRowEl
}


function renderAllRows(getHotels) {

    

    for (var i = 0; i < getHotels.length; i++){
        hotelTable.appendChild(createRows(getHotels[i]));
    }
    

}

