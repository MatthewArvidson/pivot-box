//**ON LOAD TRIGGERS**
$(document).ready(function() {
  getTodos();
  $('.completed-task').hide();
});

//**Event Listeners**
$('.save-button').on('click', createTodoCard);
$('.todo-box').on('keyup', '.todo-title', editTitle);
$('.todo-box').on('keyup', '.todo-task', editTask);
$('.todo-box').on('click', '#delete-button', deleteButton);
$('.todo-box').on('click', '#up-vote-button', voteUp);
$('.todo-box').on('click', '#down-vote-button', voteDown);
$('.filter-bar').on('keyup', search);
$('#show-all-btn').on('click', showComplete);
$('#none-btn').on('click', showNone);
$('#none-btn').on('click', showNone);
$('#low-btn').on('click', showLow);
$('#normal-btn').on('click', showNormal)
$('#high-btn').on('click', showHigh);
$('#critical-btn').on('click', showCritical);

//**FUNCTIONS**

//Pull Saved Todos from Local Storage
function getTodos() {
  for (var i = 0; i < localStorage.length; i++) {
    todoCardBlueprint(JSON.parse(localStorage.getItem(localStorage.key(i))));
  };
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

//Constructor Function
function Card(content) {
this.title = content.title;
this.task = content.task;
this.id = content.id || Date.now();
this.importanceIndex = 2;
this.importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
this.todoQuality = this.importanceArray[this.importanceIndex];
this.completeTodo = false;
};

Card.create = function(card){
  localStorage.setItem(card.id, JSON.stringify(card));
};

//Search Event Listener
  function search () {
  var userInput = $(this).val();
  $('.todo-card').each(function(index, card){
    if ($(this).children('.todo-title').text().toLowerCase().includes(userInput.toLowerCase()) || $(this).children('.todo-task').text().toLowerCase().includes(userInput.toLowerCase())) {
      $(this).show()
    } else {
      $(this).hide()
    }
  })
};

function showComplete () {
  $('.completed-task').show()
}

function showNone () {
  var none = $('.todo-card');
  none.each(function(){
    if (($(this).children('.importance').children('.todo-importance').text()) === 'none') {
      $(this).show()
    } else {
      $(this).hide()
    };
  });
};

function showLow () {
  var low = $('.todo-card');
  low.each(function() {
    if (($(this).children('.importance').children('.todo-importance').text()) === 'low') {
      $(this).show()
    } else {
      $(this).hide()
    }
  });
}

function showNormal () {
  var normal = $('.todo-card');
  normal.each(function() {
  if (($(this).children('.importance').children('.todo-importance').text()) === 'normal') {
      $(this).show();
    } else {
      $(this).hide()
    }
  });
}

function showHigh () {
  var none = $('.todo-card');
  none.each(function(){
    if (($(this).children('.importance').children('.todo-importance').text()) === 'high') {
      $(this).show()
    } else {
      $(this).hide()
    };
  });
};

function showCritical () {
  var none = $('.todo-card');
  none.each(function(){
    if (($(this).children('.importance').children('.todo-importance').text()) === 'critical') {
      $(this).show()
    } else {
      $(this).hide()
    };
  });
};

//Prepend New Card Function
function todoCardBlueprint(todo) {
	$(".todo-box").prepend(
		`
			<article id=${todo.id} class="todo-card">
				<h3 class="todo-title" contenteditable>${todo.title}</h3><span id="delete-button"></span>
				<p class="todo-task" contenteditable>${todo.task}</p>
				<p class="importance"><span id="up-vote-button" class="card-button"></span>
				<span id="down-vote-button" class="card-button"></span>Importance: <span class="todo-importance">${todo.todoQuality}</span><button class="completed">Completed Task</button>
			</article>
		`
	);
  if (todo.completeTodo) {
    $(`#${todo.id}`).addClass('completed-task');
  }
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

function voteUp() {
  var articleId = $(this).closest('article').prop('id');
  var parsedObject = find(articleId);
  if (parsedObject.importanceIndex === parsedObject.importanceArray.length - 1) {return;};
  parsedObject.importanceIndex++;
  parsedObject.importanceIndex = parsedObject.importanceIndex;
  parsedObject.todoQuality = parsedObject.importanceArray[parsedObject.importanceIndex];
  saveTodo(articleId, parsedObject);
  $(this).siblings('.todo-importance').text(parsedObject.importanceArray[parsedObject.importanceIndex]);
};

function voteDown(event) {
  var articleId = $(this).closest('article').prop('id');
  var parsedObject = find(articleId);
  if (parsedObject.importanceIndex === 0) {return;};
  parsedObject.importanceIndex--;
  parsedObject.importanceIndex = parsedObject.importanceIndex;
  parsedObject.todoQuality = parsedObject.importanceArray[parsedObject.importanceIndex];
  saveTodo(articleId, parsedObject);
  $(this).siblings('.todo-importance').text(parsedObject.importanceArray[parsedObject.importanceIndex]);
};

Card.prototype.getImportance = function() {
  console.log('importance index in getImportance', this.importanceIndex);

  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  return importanceArray[this.importanceIndex];
};

function saveTodo(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function find(id) {
  return JSON.parse(localStorage.getItem(id));
}

$('.todo-box').on('click', '.completed', completeTodo);

//Toggle Completed Todos
function completeTodo (){
  var completeTitle = $(this).closest('.todo-card').toggleClass('completed-task');
  var articleId = $(this).closest('article').prop('id');
  var parsedObject = find(articleId);
  parsedObject.completeTodo = !parsedObject.completeTodo;
  saveTodo(articleId, parsedObject);

};
