$(document).ready(function () {

      // Jquery selector to retrieve popup
      const popup = $("#popup");

      /**
       * This function will trigger the select flight. The information in the <tr> will be 
       * added into the Local Storage
       */
      function selectRow() {

            // Jquery selector using ID to retrieve the row element
            const row = $("#" + this.parentElement.parentElement.id);

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

            // Remove all buttons from area - there is only 1 button
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
            $("#selectFlight").remove();
      }

      /**
       * This function will add a new button to the row where user has 
       * hover (mouseover) their mouse. It assigns the an ID to the button, and adds the rest of the 
       * attributes. It appends the new button on the last column and assigns a event.
       */
      function revealButton() {
            var buttonArea = $("#" + this.id); // Create variable using JQuery selctor

            // Jquer to create new button
            var newElement = $("<button></button>")
            newElement.attr("id", "selectFlight"); // Assign an ID
            newElement.attr("type", "button"); // Assign an ID
            newElement.text("Select Flight"); // Add text to button

            // Add multiple classes 
            // https://www.w3schools.com/jquery/html_addclass.asp
            newElement.addClass("px-5 py-1 border-blue-500 border text-sm text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"); // Add CSS classes

            // The button is added to section dynamically. Validate whether the button is are already existing
            if (buttonArea.children().eq(buttonArea.children().length - 1).children().length == 0) {

                  // Appends button using the append class
                  // https://developer.mozilla.org/en-US/docs/Web/API/Element/append
                  buttonArea.children().eq(buttonArea.children().length - 1).append(newElement); // Append new button      

                  // Add event to selected flight button
                  // https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
                  $("#selectFlight").on("click", selectRow);
            }
      }

      function retrieveIssues() {
            var requestUrl = 'https://api.github.com/repos/gusmiller/Travel_Researcher/issues';
            requestUrl = 'https://api.github.com/repos/gusmiller/Travel_Researcher/issues?state=closed';

            fetch(requestUrl)
                  .then(function (response) {
                        return response.json();
                  })
                  .then(function (data) {
                        var issues = data; // Instantiate Issues object

                        issues.forEach(issue => {
                              console.log(issue.title);
                        })
                  });

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
            $(".tablerow").on("mouseover", revealButton);               // SONJA: the row NEEDS to have a dummy class - tablerow
            $(".tablerow").on("mouseleave", removeButton);              // SONJA: the row NEEDS to have a dummy class - tablerow
            $("#close-popup").on("click", function () {
                  popup.classList.add('hidden');
            });

            retrieveIssues();
      }

      init();
});