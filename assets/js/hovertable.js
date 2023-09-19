$(document).ready(function () {


      function revealButton(){
            console.log("It works!")
      }

      /**
       * Initialize the page time-block elements, set their color and availability based in the time. We need t
       * build the HTML from scratch using text strings. I had in mind to CLONE a template row and add it but
       * it would not add; as the next row. Leave for later.
       */
      function init() {

            // Assign an event to ALL buttons added dynamically into the DOM. These buttons originally
            // will NOT be there. To reset the array use the inspect to delete the LocalStorage
            $(".tablerow").on("hover", revealButton);
      }

      init();
});