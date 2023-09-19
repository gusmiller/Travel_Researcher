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
      // Use this key to retrieve data from API. This key belongs to OntarioTECK but we 
      // can use it for the course. It will be deleted once we complete the assignment
      const aviationAPI = "bc62d3c507d8b552c56639324618f98b";

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

});