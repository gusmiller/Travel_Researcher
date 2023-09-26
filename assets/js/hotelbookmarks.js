var hotelTable = document.querySelector(".bookmark-table")
const openflightModal = document.getElementById('openModal');
const closeflightModal = document.getElementById('closeModal');
const closeModal = document.getElementById('close-popup');
const warning = document.getElementById('warningModal');

var arr = []


// var loadData = window.addEventListener("load", () => {
    
//     var getHotels = JSON.parse(localStorage.getItem("storedHotels"));
//     createRows(getHotels)
// })


var transformData = window.addEventListener("load", () => {
    
    var retrieveHotels = JSON.parse(localStorage.getItem("storedHotels"));
    var unpackedData = retrieveHotels.reduce((acc, [key, value]) => {
        acc[key] = value
    })

    var getCity = JSON.parse(localStorage.getItem("savedDestinations"));

    unpackedData.destinationCity = getCity.destinationCity

    arr.push(unpackedData)
    
    console.log(arr)

    createRows(arr)
   
    return unpackedData
})






var displayBookedHotelPopup = function(event) {
    
    
    console.log("click")
     
    
    var setData = event.target.dataset
    
    console.log(setData);
    $("#city").val(setData.destinationCity);
    $("#hotel").val(setData.hotelName);
    $("#address").val(setData.hotelAddress);
    $("#price").val(setData.totalPrice);
    $("#popup").removeClass("hidden");
    closeModal.addEventListener("click", () =>
    $("#popup").addClass("hidden")
        )
}


function createRows (arr) {

var hotelRowEl = document.createElement("tr");
    hotelRowEl.setAttribute("class", "hotel-information-row");
    var hotelName1 = document.createElement("td")
    hotelName1.textContent = arr.hotelName
    hotelRowEl.appendChild(hotelName1)
    var hotelAddress1 = document.createElement("td")
    hotelAddress1.textContent = arr.hotelAddress
    hotelRowEl.appendChild(hotelAddress1)
    var totalPrice1 = document.createElement("td")
    totalPrice1.textContent = arr.totalPrice
    hotelRowEl.appendChild(totalPrice1)
    renderAllRows(arr)
    var bookmarkHotels = document.createElement("button")
    bookmarkHotels.textContent = "Book Hotel"
    bookmarkHotels.setAttribute("class", "transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...")
    bookmarkHotels.setAttribute("data-destination-city", arr.destinationCity);
    bookmarkHotels.setAttribute("data-hotel-name", arr.hotelName);
    bookmarkHotels.setAttribute("data-hotel-address", arr.hotelAddress);
    bookmarkHotels.setAttribute("data-total-price", arr.totalPrice);
    
    hotelRowEl.appendChild(bookmarkHotels)
    
    bookmarkHotels.addEventListener("click", displayBookedHotelPopup)

    return hotelRowEl
}


function renderAllRows(arr) {

    

    for (var i = 0; i < arr.length; i++){
        hotelTable.appendChild(createRows(arr[i]));
    }
    

}

