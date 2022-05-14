$(document).ready(onReady);

function onReady() {
  $('#addScoreButton').on('click', addScore);
}

function addScore() {
  console.log('in addScore');
  // get user input and save in object
  let newScore = {
    date: $('#dateIn').val(),
    course: $('#courseIn').val(),
    par: $('#parCourseIn').val(),
    frontNine: $('#frontNineIn').val(),
    backNine: $('#backNineIn').val(),
    total: $('#totalScoreIn').val()
  };
  console.log('adding:', newScore);
  // send object to server in data of a POST call
  $.ajax({
    method: 'POST',
    url: '/golf',
    data: newScore
  }).then(function(response){
    console.log('back from /golf POST:', response);
    // display scores on DOM
    // clear user inputs
    $('#dateIn').val('');
    $('#courseIn').val('');
    $('#parCourseIn').val('');
    $('#frontNineIn').val('');
    $('#backNineIn').val('');
    $('#totalScoreIn').val('');
  }).catch(function(err){
    console.log(err);
    alert('error adding new score');
  })
}