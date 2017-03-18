var questions = [
	{
		question: "Who was the 16th President of the United States?",
		answers: ["Abraham Lincoln", "Calvin Coolidge", "Benjamin Harrison", " Benjamin Franklin"],
		correctAnswer: 0
	},
	{
		question: "Who was the 21st President of the United States?",
		answers: ["Grover Cleveland", "James Garfield", "Chester Arthur", "Rutherford B. Hayes"],
		correctAnswer: 2
	},
	{
		question: " This state became an American possession after the Mexican War, and later became the 31st state?",
		answers: ["Arizona", "Texas", "New Mexico", "California"],
		correctAnswer: 3
	},
		{
		question: "Which Amendment prohibits any state in the US from denying or abridging a citizen's right to vote on account of race, color, or previous condition of servitude?",
		answers: ["Fifteenth", "Fourteenth", "Sixteenth", "Thirteenth"],
		correctAnswer: 2
	},
	{
		question: " This man is generally said to have begun the First Great Awakening?",
		answers: ["George Whitefield", "John Peter Zenger", "Brigham Young", "Jonathan Edwards"],
		correctAnswer: 3
	},
	{
		question: "Who said 'I will fight no more, forever'?",
		answers: ["Cheif Joseph", "George Washington", "William Tecumseh Sherman", "Robert E. Lee"],
		correctAnswer: 1
	},
		{
		question: " This land purchase was made in order to allow for the construction of a southern route for a transcontinental railroad?",
		answers: ["The Gadsden Purchase", "The Texas Purchase", "The Louisiana Purchase", "The Purchase of 1853"],
		correctAnswer: 0
	},
	{
		question: " George Bush jr was the ______ President from the Republican Party?",
		answers: ["19", "20", "18", "16"],
		correctAnswer: 2
	},
	{
		question: "Which battle happened in the South in July of 1863?",
		answers: ["The Battle of Versille", "The Battle of Vicksburg", "The Battle of Antietam", "The Second Battle of Bull Run"],
		correctAnswer: 1
	},
	{
		question: "Who wrote 'Letter from Birmingham Jail'?",
		answers: ["Malcom X", "W.E.B. DuBois", "Frederick Douglass", "Martin Luther King Jr."],
		correctAnswer: 3
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
		//to countdown by 1 sec
		time -= 1000;
		//displays time
		$('#time').text(time/1000);

		if (time == 0){
			//reset time
			time = 30 * 1000;
			//display time
			$('#time').text(time/1000);

			//move to next question
			currentQuestionIndex++;
			
			//is there are more questions
			if (currentQuestionIndex <= questions.length - 1){
				//call this function
				loadQuestion();
			}else{

				var data = {
					total_score: score,
				}

				//this ajax is used to send the users answers
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
// alert('hi');

$('#startGame').on('click', function(){
	countDown();
	// $('#startGame').hide();
	$('#container').show();

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
// when you click on an .answer class button
$(document).on('click', '.answer', function(){
	//if its the rigth answers
	if ($(this).data('key') == currentQuestion.correctAnswer){
		// add 5 to the score
		score += 5;
	}else{
		// decrease score by 2
		score = score - 2;
	}
		//move on to next question
	currentQuestionIndex++;

	//display the score
	$('#score').text(score);

	//if there are more questions 
	if (currentQuestionIndex <= questions.length - 1){
		//call function
		loadQuestion();
		//reset time to 30 secs
		time = 1000 * 30;
		//display time
		$('#time').text(time/1000);
	}else{
		//put score into data
		var data = {
			total_score: score
		}

		//posting final score after all questions are answered
		$.ajax({
			url: "/scores/create", 
			method: "POST",
			data: data, 
		}).done(function(response){
			window.location = "/scores"
		});

		//clears timer
		clearInterval(timer);
		$("#container").empty();
		$("#container").html("<p>Finito!</p>");
	}
})

 