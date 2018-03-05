// Ready set go!

$(document).ready(function() {

// Initialize Firebase

var config = {
  apiKey: "AIzaSyDOr4_s5bJ1yzJtIKpxAnk1H0SWePmR5mY",
  authDomain: "a-train-to-nowhere.firebaseapp.com",
  databaseURL: "https://a-train-to-nowhere.firebaseio.com",
  projectId: "a-train-to-nowhere",
  storageBucket: "a-train-to-nowhere.appspot.com",
  messagingSenderId: "555039969933"
};

firebase.initializeApp(config);

var database = firebase.database();

// User-inputted values
var trainName;
var destination;
var freqMin;

// Variables manipulated with Moment.js
// NOTE: earliestDepartureTime won't actually be posted - instead, it's used to calculate the next upcoming departure
var currentTime;
var earliestDepartureTime;
var nextDepartureTime;
var nextArrvMin;

// What happens when a user presses the submit button?

$("#submit-button").on("click", function(event) {

	// Stop button from actually submitting!
	event.preventDefault();

	// Assigns user's input to variables up there ^
	trainName = $("#id-train-name").val().trim();
	destination = $("#id-train-destination").val().trim();

	// Deals with time and minutes in numbers...
	earliestDepartureTime = $("#id-train-firstdep").val().trim();
	freqMin = $("#id-train-freq").val().trim();

	// Takes data to Firebase to reassign the variables there

	database.ref().push({
		trainName: trainName,
		destination: destination,
		earliestDepartureTime: earliestDepartureTime,
		freqMin: freqMin
	})

	// database.ref().on('child_added', function(childSnapshot) {
	// 	trainName = childSnapshot.val().trainName;
	// 	destination = childSnapshot.val().destination;
	// 	earliestDepartureTime = childSnapshot.val().earliestDepartureTime;
	// 	freqMin = childSnapshot.val().freqMin;
	// })

	// Creates a new table row to hold new train info

	var newTR = $("<tr class='trTrainInfo'>");

	// Creates new table data (new columns) to hold new train info

	var tdName = $("<td class='tdName'>");
	var tdDest = $("<td class='tdDest'>");
	var tdFreq = $("<td class='tdFreq'>");
	var tdNxtArrv = $("<td class='tdNxtArrv'>");
	var tdMinAway = $("<td class='tdMinAway'>");

	// Calculates when the next train will arrive (in both time - tdNxtArrv, AND minutes away - tdMinAway)

	// nextDepartureTime - Calculate how much time is between now and the nextDepartureTime.

	// Find amount of remaining minutes and subtract from nextDepartureTime

	// Appends Firebase information to train table data

	tdName.append(trainName);
	tdDest.append(destination);
	tdFreq.append(freqMin);
	tdNxtArrv.append(nextDepartureTime);
	tdMinAway.append(nextArrvMin);

	// Appends all the td data to the newTR

	newTR.append(tdName).append(tdDest).append(tdFreq).append(tdNxtArrv).append(tdMinAway);

	// Appends the newTR (with all the table data) to train-table

	$("#train-table").append(newTR);

})

// Fancy JS stuff related to CSS


// $(window).scroll(function () {
//     var scrollTop = $(window).scrollTop();
//     var height = $(window).height();

//     $('#image1').css({
//         'opacity': ((height - scrollTop) / height)
//     }); 
// });

});