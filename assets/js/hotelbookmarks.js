var hotelTable = document.querySelector(".bookmark-table")

window.onload = function () {
    
    var getHotels = JSON.parse(localStorage.getItem("storedHotels"));
    console.log(getHotels)
    createRows(getHotels)
   
    
    
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
    hotelRowEl.appendChild(bookmarkHotels)
    return hotelRowEl
}

function renderAllRows(getHotels) {

    

    for (var i = 0; i < getHotels.length; i++){
        hotelTable.appendChild(createRows(getHotels[i]));
    }
    

}