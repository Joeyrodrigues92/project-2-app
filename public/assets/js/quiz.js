var questions = [
	{
		question: "Who was the 16th President of the United States?",
		answers: ["Abraham Lincoln", "Calvin Coolidge", "Benjamin Harrison", " Benjamin Franklin"],
		correctAnswer: 1
	},
	{
		question: "Who was the 21st President of the United States?",
		answers: ["Grover Cleveland", "James Garfield", "Chester Arthur", "Rutherford B. Hayes"],
		correctAnswer: 3
	},
	{
		question: " This state became an American possession after the Mexican War, and later became the 31st state?",
		answers: ["Arizona", "Texas", "New Mexico", "California"],
		correctAnswer: 4
	},
		{
		question: "Which Amendment prohibits any state in the US from denying or abridging a citizen's right to vote on account of race, color, or previous condition of servitude?",
		answers: ["Fifteenth", "Fourteenth", "Sixteenth", "Thirteenth"],
		correctAnswer: 3
	},
	{
		question: " This man is generally said to have begun the First Great Awakening?",
		answers: ["George Whitefield", "John Peter Zenger", "Brigham Young", "Jonathan Edwards"],
		correctAnswer: 4
	},
	{
		question: "Who said 'I will fight no more, forever'?",
		answers: ["Cheif Joseph", "George Washington", "William Tecumseh Sherman", "Robert E. Lee"],
		correctAnswer: 2
	},
		{
		question: " This land purchase was made in order to allow for the construction of a southern route for a transcontinental railroad?",
		answers: ["The Gadsden Purchase", "The Texas Purchase", "The Louisiana Purchase", "The Purchase of 1853"],
		correctAnswer: 1
	},
	{
		question: " George Bush jr was the ______ President from the Republican Party?",
		answers: ["19", "20", "18", "16"],
		correctAnswer: 3
	},
	{
		question: "Which battle happened in the South in July of 1863?",
		answers: ["The Battle of Versille", "The Battle of Vicksburg", "The Battle of Antietam", "The Second Battle of Bull Run"],
		correctAnswer: 2
	},
	{
		question: "Who wrote 'Letter from Birmingham Jail'?",
		answers: ["Malcom X", "W.E.B. DuBois", "Frederick Douglass", "Martin Luther King Jr."],
		correctAnswer: 4
	}
]


var currentQuestionIndex = 0;
var currentQuestion;
var time = 30*1000;
var timer;
var score = 0;
$('#time').text(time/1000);

function countDown(){
	timer = setInterval(function(){
		time -= 1000;
		$('#time').text(time/1000);

		if (time == 0){
			time = 30 * 1000;
			$('#time').text(time/1000);

			currentQuestionIndex++;

			if (currentQuestionIndex <= questions.length - 1){
				loadQuestion();
			}else{

				var data = {
					total_score: score,
				}

				//thsi ajax is used to send the scores, if the timmer gets to 0,
				$.ajax({
					url: "/scores/create", 
					method: "POST",
					data: data, 
				}).done(function(response){
					window.location = "/scores"
				});

				clearInterval(timer);
				alert('put a fork in it');
				$("#container").empty();
				$("#container").html("<p>Finito!</p>");
			}
		}
	}, 1 * 1000);
}

$('#container').hide();

$('#startGame').on('click', function(){
	countDown();
	$('#container').show();
	$('#startGame').hide();
})




function loadQuestion(){

	currentQuestion = questions[currentQuestionIndex];

	$('#displayQuestion').html("");

	var question = $('<div>').text(currentQuestion.question);
	$('#displayQuestion').append(question);

	for (var i=0; i<currentQuestion.answers.length; i++){
		var answerButton = $("<button>").attr('class', 'answer').attr('data-key', i).text(currentQuestion.answers[i]);
		$('#displayQuestion').append(answerButton);
	}
}

loadQuestion();

$(document).on('click', '.answer', function(){
	if ($(this).data('key') == currentQuestion.correctAnswer){
		// alert('winner winner winner!!');
		score = score + 5;
	}else{
		// alert('you are a weiner weiner weiner');
		score = score - 2;
	}

	currentQuestionIndex++;

	$('#score').text(score);

	if (currentQuestionIndex <= questions.length - 1){
		loadQuestion();
		time = 1000 * 7;
		$('#time').text(time/1000);
	}else{

		var data = {
			total_score: score,
		}

		//
		$.ajax({
			url: "/scores/create", 
			method: "POST",
			data: data, 
		}).done(function(response){
			window.location = "/scores"
		});

		clearInterval(timer);
		$("#container").empty();
		$("#container").html("<p>Finito!</p>");
	}
})

