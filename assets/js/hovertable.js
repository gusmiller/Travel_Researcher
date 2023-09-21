$(document).ready(function () {

      // Use combination of JQuery and Javascrips
      const popup = document.getElementById('popup');

      /**
       * This function will trigger the select flight. The information in the <tr> will be 
       * added into the Local Storage
       */
      function selectFlight() {
            var row = $("#" + this.parentElement.parentElement.id); // Retrieve the row element

            // Retrieve items using JQuery traversing; moving though the html
            // https://www.w3schools.com/jquery/jquery_traversing.asp
            $("#departureTime").val(row.children().eq(0).text());
            $("#arrivalTime").val(row.children().eq(1).text());
            $("#airline").val(row.children().eq(2).text());
            $("#flightDuration").val(row.children().eq(3).text());
            $("#price").val(row.children().eq(4).text());
            $("#flightNumber").val(row.children().eq(5).text());
            popup.classList.remove('hidden');
      }

      /**
       * This function will remove the button. Buttons are added dynamically and they are done
       * by the row. There is no validation here 
       */
      function removeButton() {

            // Remove button element
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
            $("#selectFlight").remove(); // Build the id in string
      }

      /**
       * This function will add a new button to the section where the user has 
       * hover their mouse
       */
      function revealButton() {
            var buttonArea = $("#" + this.id); // Build the id in string
            var newElement = $("<button></button>") // Create new button
            newElement.attr("id", "selectFlight"); // Assign an ID
            newElement.attr("type", "button"); // Assign an ID
            newElement.text("Select Flight"); // Add text to button
            newElement.addClass("px-5 py-1 border-blue-500 border text-sm text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"); // Add CSS classes

            // The button is added to section dynamically. Validate whether the button is are already existing
            if (buttonArea.children().eq(buttonArea.children().length - 1).children().length == 0) {
                  buttonArea.children().eq(buttonArea.children().length - 1).append(newElement); // Append new button      

                  // Add event to selected flight button
                  // https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
                  $("#selectFlight").on("click", selectFlight);
            }
      }

      /**
       * Initialize the page time-block elements, set their color and availability based in the time. We need t
       * build the HTML from scratch using text strings. I had in mind to CLONE a template row and add it but
       * it would not add; as the next row. Leave for later.
       */
      function init() {
            // Assign an event to ALL buttons added dynamically into the DOM. These buttons originally
            // will NOT be there. To reset the array use the inspect to delete the LocalStorage
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
            $(".tablerow").on("mouseover", revealButton);
            $(".tablerow").on("mouseleave", removeButton);
            $("#close-popup").on("click", function () {
                  popup.classList.add('hidden');
            });
      }

      init();
});