////*ON LOAD TRIGGERS*////
$(document).ready(function() {
    console.log(localStorage);
    getIdeas();
});

////*LOCAL STORAGE FUNCTIONS*////

/*Pull Saved Ideas from Local Storage*/
function getIdeas () {
	for(var i in localStorage) {
		var oldIdea = localStorage[i];
		var parsedIdea = JSON.parse(oldIdea);
		newCard(parsedIdea);
	}
}

/*Store New Idea to Local Storage from Inputs*/
function storeIdea (potato) {
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
	var idea = {
		title: $('#title-input').val(),
		body: $('#body-input').val(),
		quality: 'swill',
		id: Date.now()
	}
	storeIdea(idea);
	newCard(idea);
	clearInput();
});

/*Down Vote Button*/
$('.bottom-section').on('click', '#down-vote-button', function() {
	var $qualitySpan = $(this).siblings('.idea-rank');
	$qualitySpan.text(changeRank('down',$qualitySpan.text()));
})

/*Search Evebnt Listener*/
$('.search-bar').on('keyup', function(){
	var userInput = $(this).val();
	$('.idea-card').each(function(index, card){
		if ($(this).children('.idea-title').text().toLowerCase().includes(userInput.toLowerCase()) || $(this).children('.idea-body').text().toLowerCase().includes(userInput.toLowerCase())) {
			$(this).show()
		} else {
			$(this).hide()
		}
	})
});

/*Up Vote Button*/
$('.bottom-section').on('click', '#up-vote-button', function() {
	var $qualitySpan = $(this).siblings('.idea-rank');
	$qualitySpan.text(changeRank('up',$qualitySpan.text()));
})

////*FUNCTIONS*////

/*Clear Fields Function*/
function clearInput() {
  $('#title-input').val("");
  $('#body-input').val("");
}

/*Prepend New Card Function*/
function newCard(idea) {
	$(".idea-box").prepend( `
		<article id=${idea.id} class="idea-card">
			<h3 class="idea-title">${idea.title}<span id="delete-button"></span></h3>
			<p class="idea-body">
				${idea.body}
			</p>
			<p class="quality"><span id="up-vote-button" class="card-button"></span>
			<span id="down-vote-button" class="card-button"></span>quality: <span class="idea-rank">${idea.quality}</span></p>
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

//To save old ideas:
//First needs to look at localStorage to see if there are ideas.
//If ideas are present, they are shown in lower half, represented as cards.

//For new idea:
//Get input from user: Title and the Body.
//Make a new card with those values.
//When card is created, it needs a unique value, based on when card when
//card was created and/or content of card.
//Pass unique value created to localStorage to pull from.
