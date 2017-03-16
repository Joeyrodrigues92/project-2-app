$('#start').on('click', function(){
	$('#start').remove();
	game.loadQuestion();
});

$(document).on('click', '.answer-button', function(e){
	game.clicked(e);
})

$(document).on('click', '#reset', function(){
	game.reset();
})

var questions = [{
        question: "Name the actor that didn&#39;t play Batman:",
        answers: ["Ben Affleck", "George Clooney", "Christian Bale", "Hugh Jackman"],
        correctAnswer: "Hugh Jackman",
        image:"assets/images/wolverine.gif"
    }, {
        question: "What was Harley Quinn&#39;s Former Profession?",
        answers: ["Clown", "Psychiatrist", "Jester", "Assistant"],
        correctAnswer: "Psychiatrist",
        image:"assets/images/harley.gif"
    }, {
        question: "Who became the Oracle?",
        answers: ["Batwoman", "Catwoman", "Batgirl", "The Huntress"],
        correctAnswer: "Batgirl",
        image:"assets/images/batgirl.gif"
    }, {
        question: "Who wasn&#39;t a romantic interest for Batman?",
        answers: ["Zatanna", "Catwoman", "Batgirl", "Wonder Woman"],
        correctAnswer: "Zatanna",
        image:"assets/images/zatanna.gif"
    }, {
        question: "Batman made an appearance in this 2014 movie?",
        answers: ["X-men&#58; Days of Future Past", "Captain America&#58; the Winter Soldier", "The Amazing Spiderman 2", "The Lego Movie"],
        correctAnswer: "The Lego Movie",
        image:"assets/images/legobatman.gif"
    }];

var game = {
	questions: questions,
	currentQuestion:0,
	counter:30,
	correct:0,
	incorrect:0,
	unanswered:0,
	countdown: function(){
		game.counter--;
		$('#counter').html(game.counter);
		if(game.counter <= 0){
			console.log("TIME UP!");
			game.timeUp();
		}

	},
	loadQuestion: function(){
		timer = setInterval(game.countdown, 1000);

		$('#subwrapper').html("<h2 id='counter'>30</h2>")
		$('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>');
									// or
		// $('#subwrapper').html('<h2>' + questions[game.currentQuestion].question + '</h2>');

			for(var i =0; i<questions[game.currentQuestion].answers.length;i++){
				$('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.
					currentQuestion].answers[i]+'">' +questions[game.
					currentQuestion].answers[i]+ '</button>');
			}

	},
	nextQuestion: function(){
		game.counter = 30;
		$('#counter').html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();


	},
	timeUp: function(){
		clearInterval(timer);
		game.unanswered++;
		$('#subwrapper').html('<h2>OUT OF TIME!</h2>');
		$('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+ '</h3>');
		$('#subwrapper').append('<img src='+questions[game.currentQuestion].image+ '>');
			if(game.currentQuestion==questions.length-1){
					setTimeout(game.results,3*1000);
				} else {
					setTimeout(game.nextQuestion,3*1000);
				}
	},
	results: function(){
		clearInterval(timer);
		$('#subwrapper').html("<h2>ALL DONE!</h2>");
		$('#subwrapper').append("Correct: "+game.correct);
		$('#subwrapper').append("<br>Incorrect: "+game.incorrect);
		$('#subwrapper').append("<br>Unanswered: "+game.unanswered);
		$('#subwrapper').append("<br><button id='reset'>RESET</button>")

	},
	clicked: function(e){
		clearInterval(timer);
		if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
			game.answeredCorrectly();
		} else {
			game.answeredIncorrectly();
		}

	},
	answeredCorrectly: function(){
			console.log("YOU GOT IT!");
			clearInterval(timer);
			game.correct++;
			$('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2');
			if(game.currentQuestion==questions.length-1){
				setTimeout(game.results,3*1000);
			} else {
				setTimeout(game.nextQuestion,3*1000);
			}
	},
	answeredIncorrectly: function(){
			console.log("WRONG");
			clearInterval(timer);
			game.incorrect++;
			$('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2');
			$('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+ '</h3>');
			if(game.currentQuestion==questions.length-1){
				setTimeout(game.results,3*1000);
			} else {
				setTimeout(game.nextQuestion,3*1000);
			}
	},
	reset: function(){
		game.currentQuestion =0;
		game.counter = 30;
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		game.loadQuestion();
	}
}
