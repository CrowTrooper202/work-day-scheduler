// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  //added date and timer
  var currentTimeHeader = $('#currentDay')
  setInterval(myTimer, 1000);
  function myTimer() {
    const date = new Date();
    document.getElementById("currentDay").innerHTML = "Today is " + dayjs().format('MMM D, YYYY, a ') + date.toLocaleTimeString();
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // var comment = document.getElementsByClassName("btn saveBtn col-2 col-md-1");
  // var saveButton = document.getElementById("save");

  $('.saveBtn').on('click', function (event) {
    event.preventDefault();

    var comment = $(this).siblings('.description').val()

    // var saveMemo = {
    //   comment: comment.trim()
    // }

    var blockId = $(this).parent().attr('id')

    localStorage.setItem(blockId, comment);
    renderMessage();

  })
  $('#hour-16 .description').val(localStorage.getItem('hour-16'))

  // saveButton.addEventListener("click", function (event) {
  //   event.preventDefault();
  //   var saveMemo = {
  //     commen: comment.value.trim()
  //   }

  //   localStorage.setItem("saveMemo", JSON.stringify(saveMemo));
  //   renderMessage();

  // });
  function renderMessage() {
    var lastMemo = JSON.parse(localStorage.getItem("saveMemo"));
    if (lastMemo !== null) {
      document.querySelector(".description").textContent = lastMemo
    }
  }



  //set up if statement
  // if current time equals value of ID  change class row timeblock to present
  // else if current time is less than value of ID change class row time block to future
  // else if current time is greater than vaule of ID change class row time block to past
  //how to subsatute click?

  
  
  function timeUpdate () {
    var timeCode = dayjs().format('H')
  
    $('.time-block').each(function() {
      var elHour = parseInt($(this).attr('id').split('-')[1])
      console.log(typeof elHour);
      if (timeCode == elHour) {
        $(this).removeClass('past')
        $(this).removeClass('future')
        $(this).addClass('present')  
      } else if (timeCode < elHour) {
        $(this).addClass('past')
        $(this).removeClass('future')
        $(this).removeClass('present')
        }
        else if (timeCode > elHour) {
          $(this).removeClass('past')
          $(this).addClass('future')
          $(this).removeClass('present')
        }
        

    })
  }

  timeUpdate()

  setInterval(timeUpdate, 50000)

})