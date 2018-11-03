$( document ).ready(function() {

	var game = {
		questions: [
		{
	   		question: 'Where would you find the Sea of Tranquility?',
	   		possibles: ['Mars', 'Moon', 'Saturn', 'Jupiter'],
	   		id: 'question-one',
	   		answer: 1
		}, {
			question: 'What is the capital of Illinois?',
			possibles: ['Springfield', 'Chicago', 'Rockford', 'Joliet', 'Evanston'],
			id: 'question-two',
			answer: 0
		}, {
			question: 'Name the seventh planet from the sun',
			possibles: ['Murcury', 'Earth', 'Mars', 'Neptune', 'Uranus'],
			id: 'question-three',
			answer: 4
		}, {
			question: 'What is the worlds longest river?',
			possibles: ['Nile', 'Yangtze', 'Amazon', 'Mekong', 'Lena'],
			id: 'question-four',
			answer: 3
		}, {
			question: 'What is the diameter of Earth?',
			possibles: ['8,000 miles', '9,000 miles', '5,000 miles', '3,000 miles', '2,000 miles'],
			id: 'question-five',
			answer: 0
		}, {
			question: 'Name the worlds largest ocean',
			possibles: ['Arctic', 'Pacific', 'Indian', 'Atlantic', 'Southern'],
			id: 'question-six',
			answer: 1

		}, {
			question: 'Who invented the rabies vaccination?',
			possibles: ['Bob Smith', 'H.H Holmes', 'Louis Pasteu', 'Moonlight Graham', 'Anton Chekhov'],
			id: 'question-seven',
			answer: 2
		}, {
			question: 'When did the Cold War end?',
			possibles: ['1982', '1945', '1890', '1935', '1989'],
			id: 'question-eight',
			answer: 4
		},
		]}

    $("#startGame").on("click", function (){
        $('.wrapper').show();
        run();
		console.log('hello');

		$(this).hide();
	});
    var number = 60;
    $('#timeLeft').on('click', run);

	function decrement(){
        number--;
        $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
        if (number === 0){
        //i dont understand why the function below is not working
        $('#message').html('time up!');
        stop();
        checkAnswers();
        }
    }
    function run(){
        counter = setInterval(decrement, 1000);
    }
    
    function stop(){
        clearInterval(counter);
    }    
function formTemplate(data) {
	var qString = "<form id='questionOne'>"+ data.question +"<br>";
	var possibles = data.possibles;
	for (var i = 0; i < possibles.length; i++) {
        var possible = possibles[i];''
        console.log(possible);
		qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;

	}
	return qString + "</form>";
}
window.formTemplate = formTemplate;

function buildQuestions(){
	var questionHTML = ''
	for (var i = 0; i<game.questions.length; i++) {
		questionHTML = questionHTML + formTemplate(game.questions[i]);
	}
	$('#questions-container').append(questionHTML);

}
function isCorrect(question){
	var answers = $('[name='+question.id+']');
	var correct = answers.eq(question.answer);
	var isChecked = correct.is(':checked');
	return isChecked;
}

buildQuestions();

function resultsTemplate(question){
	var buildDisplay = '<div>'
	buildDisplay = buildDisplay + question.question + ': ' + isChecked;
	return buildDisplay + "</div>";
}

function checkAnswers (){

	var resultsHTML = '';
	var guessedAnswers = [];
	var correct = 0;
	var incorrect = 0;
	var unAnswered =0

	for (var i = 0; i<game.questions.length; i++) {
		if (isCorrect(game.questions[i])) {
			correct++;
		} else {
			if (checkAnswered(game.questions[i])) {
				incorrect++;
			} else {
				unAnswered++;
			}
		}

	}
	$('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
}

function checkAnswered(question){
	var anyAnswered = false;
	var answers = $('[name='+question.id+']');
	for (var i = 0; i < answers.length; i++) {
		if (answers[i].checked) {
			anyAnswered = true;
		}
	}
	return anyAnswered;

}

	$('#doneButton').on('click', function() {
	checkAnswers();
	stop();
	$("#messageDiv").html("Game Over!");
	})
});