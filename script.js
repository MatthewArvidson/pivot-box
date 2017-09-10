////*ON LOAD TRIGGERS*////
$(document).ready(function() {
  getTodos();
});
//Event Listeners
$('.save-button').on('click', createTodoCard);
$('.todo-box').on('keyup', '.todo-title', editTitle);
$('.todo-box').on('keyup', '.todo-task', editTask);
$('.todo-box').on('click', '#delete-button', deleteButton);
$('.todo-box').on('click', '#up-vote-button', voteUp);
$('.todo-box').on('click', '#down-vote-button', voteDown);

////*FUNCTIONS*////

/*Pull Saved Todos from Local Storage*/
function getTodos() {
	for(var i in localStorage) {
		var oldTodo = localStorage[i];
		var parsedTodo = JSON.parse(oldTodo);
		todoCardBlueprint(parsedTodo);
	}
};

//Delete Card Button
function deleteButton() {
	$(this).closest('.todo-card').remove();
  localStorage.removeItem(($(this).closest('.todo-card').attr('id')));
};

//Create Todo Card
function createTodoCard (event) {
	event.preventDefault();
	var title = $('#title-input').val();
	var task = $('#task-input').val();
	var theTodo = new Card({title, task});
	var saveButton = $('.save-button');
	$('.bottom-section').prepend(todoCardBlueprint(theTodo));
	Card.create(theTodo);
  $('#title-input').val("");
  $('#task-input').val("");
	$('#title-input').focus();
	saveButton.attr('disabled', false);
};

function Card(content) {
this.title = content.title;
this.task = content.task;
this.id = content.id || Date.now();
this.importanceIndex = content.importanceIndex || 0;
};

Card.create = function(card){
	localStorage.setItem(card.id, JSON.stringify(card));
};

//Search Event Listener
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

//Prepend New Card Function
function todoCardBlueprint(todo) {
  //When you go to blueprint the card, in localStorage, the object has importanceIndex (not importance)
  //so you need to find a way to relate the index to the actual value (i.e. if index 2, value is 'normal') and this is what you put into the card

	$(".todo-box").prepend(
		`
			<article id=${todo.id} class="todo-card">
				<h3 class="todo-title" contenteditable>${todo.title}</h3><span id="delete-button"></span>
				<p class="todo-task" contenteditable>${todo.task}</p>
				<p class="importance"><span id="up-vote-button" class="card-button"></span>
				<span id="down-vote-button" class="card-button"></span>Importance: <span class="todo-importance">${todo.importanceIndex}</span></p>
			</article>
		`
	);
};


//Edit Title
function editTitle (event) {
var id = ($(this).closest('.todo-card').attr('id'));
var uniqueTodo = JSON.parse(localStorage.getItem(id));
if (event.keyCode === 13) {
	event.preventDefault();
	this.blur();
  };
  uniqueTodo.title = $(this).text();
  localStorage.setItem(id, JSON.stringify(uniqueTodo));
};

//Edit Task
function editTask (event) {
var id = ($(this).closest('.todo-card').attr('id'));
var uniqueTodo = JSON.parse(localStorage.getItem(id));
if (event.keyCode === 13) {
	event.preventDefault();
	this.blur();
  };
  uniqueTodo.task = $(this).text();
  localStorage.setItem(id, JSON.stringify(uniqueTodo));
};

function voteUp(event) {
  event.preventDefault();
  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  var articleElement = $(event.target).closest('article');
  var id = articleElement.prop('id');
  var card = Card.find(id);
  var uniqueTodo = JSON.parse(localStorage.getItem(id));
  console.log('unique todo in voteUp', uniqueTodo);

  articleElement.find('.todo-importance').text(card.getImportance());
  card.incrementImportance();
  localStorage.setItem(id, JSON.stringify(uniqueTodo));
  card.save();
    console.log('saved card in voteUp', card)
};

function voteDown(event) {
  event.preventDefault();
  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  var articleElement = $(event.target).closest('article');
  var id = articleElement.prop('id');
  var card = Card.find(id);
  var uniqueTodo = JSON.parse(localStorage.getItem(id));
  console.log('unique todo in voteDown', uniqueTodo);
  articleElement.find('.todo-importance').text(card.getImportance());
  card.decrementImportance();
  localStorage.setItem(id, JSON.stringify(uniqueTodo));
  card.save();
  console.log('saved card in voteDown', card)
};

Card.prototype.getImportance = function() {
  console.log('importance index in getImportance', this.importanceIndex);

  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  return importanceArray[this.importanceIndex];
};

Card.prototype.incrementImportance = function() {
  console.log('importance index in increment', this.importanceIndex)

  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  if (this.importanceIndex !== importanceArray.length - 1) {
    this.importanceIndex += 1;
  }
};

Card.prototype.decrementImportance = function() {
  console.log('importance index in decrement', this.importanceIndex)

  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  if (this.importanceIndex !== 0) {
    this.importanceIndex -= 1;
  }
};

//Save Card
Card.prototype.save = function() {
  Card.create(this);
};

//Find Card
Card.find = function(id) {
  return new Card(JSON.parse(localStorage.getItem(id)));
};



















//Down Vote Button
// $('.bottom-section').on('click', '#down-vote-button', function() {
// 	var $importanceSpan = $(this).siblings('.todo-importance');
// 	$importanceSpan.text(changeRank('down',$importanceSpan.text()));
// });

//Up Vote Button
// $('.bottom-section').on('click', '#up-vote-button', function() {
// 	var $importanceSpan = $(this).siblings('.todo-importance');
// 	$importanceSpan.text(changeRank('up',$importanceSpan.text()));
// });
