/**
 * Carleton Bootcamp - 2023
 * Authors: Jacob Martin, Sonja Gorin, Anthony Gooneratne and Gustavo Miller
 * Licensed under MIT
 * Project 01 - Travel Researcher
 */

$(document).ready(function () {

      // Select warning modal screen
      const warning = document.getElementById('warningModal');

      /**
       * This function will show the Future Feature option. Options that we have decided not to 
       * implement in this version.
       */
      function shownFuture(Title, Message, modeError) {
            $("#errorTitle").text(Title);
            $("#errorMessage").text(Message);
            warning.classList.remove("hidden");

            // Validate for simple message
            if (modeError == 1) {
                  $("#errorMessage").removeClass("text-red-500");
                  $("#closeModal").addClass("bg-blue-500");
                  $("#closeModal").removeClass("bg-red-500");
            }
      }

      // Javascript: Close modal event listener, will close the modal form
      closeModal.addEventListener('click', () => {
            warning.classList.add('hidden');
      });

<<<<<<< HEAD
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
=======
      //JQuery: trigger the Future Feature options
      $(".futureFeatures").on("click", () => { shownFuture("Future Implementation","This options is not current being implemented in this version! Stay tuned") });
})
>>>>>>> 81a7bad8f6856b83b4b701f165bff84b94d7fd3f
