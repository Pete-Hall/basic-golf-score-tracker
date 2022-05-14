$(document).ready(onReady);

function onReady() {
  $('#addScoreButton').on('click', addScore);
  getScores();
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

// let newScore = {
//   date: $('#dateIn').val(),
//   course: $('#courseIn').val(),
//   par: $('#parCourseIn').val(),
//   frontNine: $('#frontNineIn').val(),
//   backNine: $('#backNineIn').val(),
//   total: $('#totalScoreIn').val()
// };