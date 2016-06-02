/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready(function() {

	var playersGuess = null;
	var winningNumber = generateWinningNumber();
	var numberOfGuesses = 0;
	var remainingGuesses = 5;
	var guesses = [];

	/* **** Event Listeners/Handlers ****  */
	$("#guess").on('click', playersGuessSubmission);
	$("#hint").on('click', provideHint);
	$("#reset").on('click', playAgain);
	$(document).keypress(function(e) {
		if (e.which == 13) {
			playersGuessSubmission();
		}
	});
	
	// For debugging purposes
	console.log(winningNumber);

	/* **** Guessing Game Functions **** */

	// Generate the Winning Number

	function generateWinningNumber(){
		var num = Math.floor(Math.random() * 100 + 1);
		return num;
	}

	// Fetch the Players Guess

	function playersGuessSubmission(){
		// use jquery
		var $input = $('#input');
		playersGuess = parseInt($input.val());
		if (isNaN(playersGuess)) {
			if ($("#valid").length) {
			} else {
				$('#input').after('<h4 id="valid">You did not enter a valid number.</h3>');
			}
		} else {
			if ($("#valid").length) {
				$("#valid").hide();
			}
			$input.val('');
			console.log('Players Guess: ' + playersGuess);
			checkGuess();
		}
	}

	// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(){
		var string = '';
		var dist = distanceWithin();
		if (playersGuess < winningNumber) {
			if (dist == undefined) {
				return "Your guess is lower than the Winning Number."
			} else {
				return "Your guess is lower and " + dist + " the winning number."
			}
		} else if (playersGuess > winningNumber) {
			if (dist == undefined) {
				return "Your guess is higher than the Winning Number."
			} else {
				return "Your guess is higher and " + dist + " the winning number."
			}
		}
	}

	function distanceWithin() {
		var distance = Math.abs(playersGuess - winningNumber);
		if (distance > 5 && distance <= 10) {
			return "within 10 digits of"
		} else if (distance > 0 && distance <= 5) {
			return "within 5 digits of"
		} 
	}

	// Check if the Player's Guess is the winning number 

	function checkGuess(){
		if (guesses.indexOf(playersGuess) != -1) {
			$("#resultChange").text('You entered a duplicate guess!');
		}
		else if (playersGuess !== winningNumber) {
			$('#resultChange').text('Try again');
			numberOfGuesses += 1;
			remainingGuesses -= 1;
			if (remainingGuesses == 0) {
				$("#enter, #input").hide();
				$("#lose").show();
				$("#guess, #hint, #easy, #hard").prop("disabled", true).addClass('buttonDisabled');
			}
		}
		else if (playersGuess === winningNumber) {
			$("#resultChange").text('You win!');
			$("#feedbackChange").text('Your guess is on point!');
			$("#enter, #input, #hintShown").hide();
			$("#guess, #hint, #easy, #hard").prop("disabled", true).addClass('buttonDisabled');
			$("#win").show();
		}

		guesses.push(playersGuess);
		$("#numGuessChange").text(numberOfGuesses);
		$("#remainingGuessChange").text(remainingGuesses);
		$("#prevGuessChange").text(guesses);
		$("#feedbackChange").text(lowerOrHigher());
	}

	// Create a provide hint button that provides additional clues to the "Player"

	function provideHint(){
		if ($("#hintShown").length) {
			// do nothing
			} else {
				var randomHint = [];
				for (var i = 0; i < 2; i++) {
					randomHint.push(Math.floor(Math.random() * 100 + 1));
				}
				randomHint.push(winningNumber);
				randomHint.sort();
				console.log(randomHint);
				$('#input').after('<h4 id="hintShown">One of these values is the winning number: [' + randomHint + '].</h4>');
			}
	}

	// Allow the "Player" to Play Again

	function playAgain(){
		playersGuess = null;
	    winningNumber = generateWinningNumber();
	    numberOfGuesses = 0;
	    remainingGuesses = 5;
	    guesses = [];
	    console.log(winningNumber);
	    $("#guess, #hint, #easy, #hard").prop("disabled", false).removeClass('buttonDisabled');
	    $("#valid, #hintShown").remove();
	    $("#win, #lose").hide();
	    $("#enter, #input").show();
	    $("#resultChange, #feedbackChange, #prevGuessChange").text('No guess entered.');
	    $("#numGuessChange").text(numberOfGuesses);
		$("#remainingGuessChange").text(remainingGuesses);
	}

});