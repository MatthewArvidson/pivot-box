////*ON LOAD TRIGGERS*////
$(document).ready(function() {
    // console.log(localStorage);
    getTodos();
});

////*LOCAL STORAGE FUNCTIONS*////

/*Pull Saved Todos from Local Storage*/
function getTodos () {
	for(var i in localStorage) {
		var oldTodo = localStorage[i];
		var parsedTodo = JSON.parse(oldTodo);
		newCard(parsedTodo);
	}
}

/*Store New Todo to Local Storage from Inputs*/
function storeTodo (potato) {
	localStorage.setItem("potato-" + potato.id, JSON.stringify(potato));
}

////*EVENT LISTENERS*////

/*Delete Card Button*/
$('.bottom-section').on('click', '#delete-button', function(){
	$(this).closest('article').remove();
	var getId = $(this).closest('article').attr('id');
	var potatoId = 'potato-' + getId;
	localStorage.removeItem(potatoId);
});

$('.save-button').on('click', function(event){
	event.preventDefault();
	var todo = {
		title: $('#title-input').val(),
		body: $('#task-input').val(),
		importance: 'swill',
		id: Date.now()
	}
	storeTodo(todo);
	newCard(todo);
	clearInput();
});

/*Down Vote Button*/
$('.bottom-section').on('click', '#down-vote-button', function() {
	var $importanceSpan = $(this).siblings('.todo-importance');
	$importanceSpan.text(changeRank('down',$importanceSpan.text()));
})

/*Search Evebnt Listener*/
$('.search-bar').on('keyup', function(){
	var userInput = $(this).val();
	$('.todo-card').each(function(index, card){
		if ($(this).children('.todo-title').text().toLowerCase().includes(userInput.toLowerCase()) || $(this).children('.todo-task').text().toLowerCase().includes(userInput.toLowerCase())) {
			$(this).show()
		} else {
			$(this).hide()
		}
	})
});

/*Up Vote Button*/
$('.bottom-section').on('click', '#up-vote-button', function() {
	var $importanceSpan = $(this).siblings('.todo-importance');
	$importanceSpan.text(changeRank('up',$importanceSpan.text()));
})

////*FUNCTIONS*////

/*Clear Fields Function*/
function clearInput() {
  $('#title-input').val("");
  $('#task-input').val("");
}

/*Prepend New Card Function*/
function newCard(todo) {
	$(".todo-box").prepend( `
		<article id=${todo.id} class="todo-card">
			<h3 class="todo-title">${todo.title}<span id="delete-button"></span></h3>
			<p class="todo-task">
				${todo.body}
			</p>
			<p class="importance"><span id="up-vote-button" class="card-button"></span>
			<span id="down-vote-button" class="card-button"></span>Importance: <span class="todo-importance">${todo.importance}</span></p>
		</article>
		`
	);
}

/*Change Rank Up/Down Function*/
function changeRank(direction, currentRank) {
	var rankArray = ['swill', 'plausible', 'genius'];
	var increment = direction === 'down'? -1:1;
	var currentIndex = rankArray.indexOf(currentRank);
	if (currentRank + increment < 0 || currentRank + increment > rankArray.length - 1) {
		return rankArray[currentIndex];
	} else {
		return rankArray[currentIndex + increment];
	};
}

////////////NOTES////////////

// localStorage.setItem('ID Local Storage Knows', myObject);
// Date.now()
// localStorage.getItem(myObject.id)
// v

//To save old Todos:
//First needs to look at localStorage to see if there are Todos.
//If Todos are present, they are shown in lower half, represented as cards.

//For new Todo:
//Get input from user: Title and the Body.
//Make a new card with those values.
//When card is created, it needs a unique value, based on when card when
//card was created and/or content of card.
//Pass unique value created to localStorage to pull from.
