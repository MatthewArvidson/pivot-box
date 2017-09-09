$('.save-button').on('click', createTodoCard);
////*ON LOAD TRIGGERS*////
$(document).ready(function() {
    getTodos();
});

////*LOCAL STORAGE FUNCTIONS*////

/*Pull Saved Todos from Local Storage*/
function getTodos () {
	for(var i in localStorage) {
		var oldTodo = localStorage[i];
		var parsedTodo = JSON.parse(oldTodo);
		todoCardBlueprint(parsedTodo);
	}
}

/*Store New Todo to Local Storage from Inputs*/
// function storeTodo (potato) {
	// localStorage.setItem("potato-" + potato.id, JSON.stringify(potato));
// }

////*EVENT LISTENERS*////

/*Delete Card Button*/
$('.bottom-section').on('click', '#delete-button', function(){
	$(this).closest('article').remove();
	var getId = $(this).closest('article').attr('id');
	var potatoId = 'potato-' + getId;
	localStorage.removeItem(potatoId);
});

// 	event.preventDefault();
// 	var todo = {
// 		title: $('#title-input').val(),
// 		body: $('#task-input').val(),
// 		importance: 'swill',
// 		id: Date.now()
// 	}
// 	storeTodo(todo);
// 	newCard(todo);
// 	clearInput();
// });

function createTodoCard (event) {
	event.preventDefault();
	var title = $('#title-input').val();
	var task = $('#task-input').val();
	var theTodo = new Card({title, task});
	console.log(theTodo);
	var saveButton = $('.save-button');
	$('.bottom-section').prepend(todoCardBlueprint(theTodo));
	Card.create(theTodo);
	$('#title-input').focus();
	saveButton.attr('disabled', false);
	clearInput;


}

function Card(content) {
this.title = content.title;
this.task = content.task;
this.id = content.id || Date.now();
this.importanceIndex = content.importanceIndex || 0;

};

Card.create = function(card){
	localStorage.setItem(card.id, JSON.stringify(card));

};


/*Down Vote Button*/
$('.bottom-section').on('click', '#down-vote-button', function() {
	var $importanceSpan = $(this).siblings('.todo-importance');
	$importanceSpan.text(changeRank('down',$importanceSpan.text()));
})

/*Search Event Listener*/
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
function todoCardBlueprint(todo) {
	// var title = $('#title-input').val();
	// var task = $('#task-input').val();
	$(".todo-box").prepend(
		`
			<article id=${todo.id} class="todo-card">
				<h3 class="todo-title">${todo.title}</h3><span id="delete-button"></span>
				<p class="todo-task">${todo.task}</p>
				<p class="importance"><span id="up-vote-button" class="card-button"></span>
				<span id="down-vote-button" class="card-button"></span>Importance: <span class="todo-importance">${todo.importance}</span></p>
			</article>
		`
	);
}



