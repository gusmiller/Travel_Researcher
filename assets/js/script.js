/**
 * Carleton Bootcamp - 2023
 * Authors: Jacob Martin, Sonja Gorin, Anthony Gooneratne and Gustavo Miller
 * Licensed under MIT
 * Project 01 - Travel Researcher
 */

/**
 * Main jQuery entry call. Wrapped after the page load process has been 
 * completed and document can be manipulated safely. It contains all functions available. 
 * API keys are NOT public and are used only for educational purposes. 
 * API aviationstack belongs to OntarioTECK VBA Developers
 */

$(document).ready(function () {


      function hotelApi() {

            var options = {
                  method: 'GET',
                  headers: {
                        'X-RapidAPI-Key': 'your api key here',
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                  }
            };
      
            fetch("https://booking-com.p.rapidapi.com/v1/static/hotels?page=0", options).then(function (response) {
                  if (response.ok) {
                        return response.json().then(function (data) {
                              console.log(data.result.slice(0, 100))
                        })
                  }
            }).catch(function (error) {
                  console.log(error)
            })
      }


      function testingAPI() {
            // We are using template literals to build strings (backtick + ${variable}
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
            const geocodingEndpoint = `https://api.aviationstack.com/v1/flights?access_key=${aviationAPI}`;

            // Make an HTTP GET fetch request to the API
            // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            fetch(geocodingEndpoint)
                  .then(response => response.json())
                  .then((data) => {
                        console.log(data);
                  })
                  .catch((error) => {

                        displayErrorMessage(error, "Aviation Stack"); // Display error message
                        return false;
                  });
      }

});const aviationAPI = "bc62d3c507d8b552c56639324618f98b";