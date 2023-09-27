/**
 * Carleton Bootcamp - 2023
 * Authors: Jacob Martin, Sonja Gorin, Anthony Gooneratne and Gustavo Miller
 * Licensed under MIT
 * Project 01 - Travel Researcher
 */
$("#departure-city").selectmenu();
$("#destination-city").selectmenu();

$(".datefield").datepicker({
      minDate: -0,
      dateFormat: "yy-mm-dd"
});

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
      $("#closeModal").on("click", function(){
            warning.classList.add('hidden');
      })

      //JQuery: trigger the Future Feature options
      $(".futureFeatures").on("click", () => { shownFuture("Future Implementation", "This options is not current being implemented in this version! Stay tuned", 1) });
})
