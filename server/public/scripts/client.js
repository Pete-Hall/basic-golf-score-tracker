$(document).ready(onReady);

// event handlers
function onReady() {
  $('#addScoreButton').on('click', addScore);
  getScores();
}

// addScore sends the user inputted score to the backend via an AJAX POST call. Before sending, it validates the inputted user info. If the score is added successfully, the DOM is updated. 
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
  // check if the inputted data is missing a field
  if(newScore.date === '' || newScore.course === '' || newScore.par === '' || newScore.frontNine === '' || newScore.backNine === '' || newScore.total === '') {
    console.log('incomplete form submission');
    alert('Score not added. Incomplete form submission.');
    return false;
  };
  // check if the front nine score + the back nine score = the total score
  if((+newScore.frontNine) + (+newScore.backNine) != (+newScore.total)) {
    console.log('inaccurate score reporting');
    alert('Score not added. Inaccurate score reporting.');
    return false;
  };
  // send object to server in data of a POST call
  $.ajax({
    method: 'POST',
    url: '/golf',
    data: newScore
  }).then(function(response){
    console.log('back from /golf POST:', response);
    // display scores on DOM
    getScores();
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

// getScore retrieves the scores from the backend via an AJAX GET request. It then appends the data from the database onto the DOM in the output table
function getScores() {
  console.log('in getScores');
  $.ajax({
    method: 'GET',
    url: '/golf'
  }).then(function(response){
    console.log('back from /golf GET:', response);
    let el = $('#dataOut');
    el.empty();
    for(let i=0; i<response.length; i++) {
      el.append(`<tr><td>${response[i].date}</td><td>${response[i].course}</td><td>${response[i].par}</td><td>${response[i].front_nine}</td><td>${response[i].back_nine}</td><td>${response[i].total}</td></tr>`)
    }
  }).catch(function(err){
    console.log(err);
    alert('error getting scores');
  })
}