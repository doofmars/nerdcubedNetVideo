jQuery(document).ready(startGame);

//Starts the game and sets the  handlers
function startGame(){
	$( "#button_game0" ).click(function() {selectGame(0)});
	$( "#button_game1" ).click(function() {selectGame(1)});
	$( "#button_game2" ).click(function() {selectGame(2)});
	loadRound();
}

//Countdown function called in js interval to decrease the Progressbar
function countdown(){
	if (variables.time > 0) {
		variables.time--;
		$('#time').width(variables.time + '%');
	} else {
		if (variables.gamestate > 0) {
			clearInterval(timeInterval);
			variables.gamestate = 0;
			$(".container").children().fadeOut(gameOver);		
		}
	}
}

//Load new round and sets the handlers
function loadRound(){
	enableButtons();
	updateScore();
	unbindHandlers();
	shuffle();

	setGame(0);
	setGame(1);
	setGame(2);
	bindSelectors();
}

//Shuffles the recipes array
function shuffle() {
  var currentIndex = recipes.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = recipes[currentIndex];
    recipes[currentIndex] = recipes[randomIndex];
    recipes[randomIndex] = temporaryValue;
  }
}

//loads the image and title into the site
function setGame(id){
	$('#name_game' + id).html(recipes[id].name);
	$('#image_game' + id).attr("src", "img/" + recipes[id].name + ".jpg" );
}

//Function called by the buttons or select-game-keys (1-3) to select a game
function selectGame(id){
	if(variables.gamestate === 2){
		timeInterval = setInterval(countdown, 1000);
		variables.gamestate = 1;
	}
	if(variables.gamestate === 1){
		clearKeys();
		disableButtons();
		displayKeys(id);	
		bindHandlers(id);
	}
}

//displays the keys from the Array as Buttons
function displayKeys(id){
	var thekeys = $("#thekeys");
	for (var i = 0; i < recipes[id].elements_key.length; i++){
		var container = $('<p>').html(
			'<button type="button" id="_' + 
			recipes[id].elements_key[i] +
			'" class="input-key btn btn-default btn-lg">' + 
			getKeyDisplayFormat(recipes[id].elements_key[i]) + 
			'</button>');
		thekeys.append(container);
	}
}

//binds the key handlers using jquery.hotkeys
function bindHandlers(id){
	unbindHandlers();
	var elements = recipes[id].elements_key;
	
	// the fetching...
	$.each(elements, function(i, e) { // i is element index. e is element as text.
	   var newElement = ( /[\+]+/.test(elements[i]) ) ? elements[i].replace("+","_") : elements[i];
	   
	   // Binding keys
	   $(document).bind('keydown', elements[i], function assets() {
		   $('#_'+ newElement).addClass("active");
		   return false;
	   });
	   // Binding keys
	   $(document).bind('keyup', elements[i], function assets() {
		   updateBar();
		   $('#_'+ newElement).removeClass("active");
		   return false;
	   });
	});
	//make buttons click able
	$('.input-key').click(function(){updateBar();});
}

// unbinds every 'keydown' or 'keyup' handler
function unbindHandlers(id){
	$(document).unbind('keydown');
	$(document).unbind('keyup');
}

//binds the select-game-keys (1-3) th the selectGame() function
function bindSelectors(){
	$(document).bind('keydown', '1', function(){selectGame(0); return false;});
	$(document).bind('keydown', '2', function(){selectGame(1); return false;});
	$(document).bind('keydown', '3', function(){selectGame(2); return false;});
}

//updates the progress bar and determents if a game is done.
function updateBar(){
    var bar = $('#progress');
	if (variables.progress < 100){
		variables.progress += 5;
		bar.width(variables.progress + '%');
	} else {
		variables.progress = 0;
		variables.videos += 1;
		bar.width("0%");
		clearKeys();
		loadRound();
	}
}

//Displays the game over screen with score.
function gameOver(){
	$(".container").attr('class','center-parent container container-content')
		.html($('<div>').attr('class','center-child')
				.append($('<h1>').html('Game Over'))
				.append($('<h3>').html("Score: " + variables.videos))
				.append($('<a>').html('Again?').attr('href','index.html')));
}

//Enables the select game buttons
function enableButtons() {
	$( "#button_game0" ).attr("disabled", false);
	$( "#button_game1" ).attr("disabled", false);
	$( "#button_game2" ).attr("disabled", false);
}

//Disables the select game buttons
function disableButtons() {
	$( "#button_game0" ).attr("disabled", true);
	$( "#button_game1" ).attr("disabled", true);
	$( "#button_game2" ).attr("disabled", true);
}

//clears the 'thekeys' div
function clearKeys(){
	$("#thekeys").html("");
}

//updates the 'thescore' div
function updateScore(){
	$("#thescore").html("Score: " + variables.videos);
}

//function to get bootstrap arrow icon to key-code
function getKeyDisplayFormat(key){
	switch(key) {
    case "up":
        return '<span class="glyphicon glyphicon-arrow-up"></span>'
    case "down":
        return '<span class="glyphicon glyphicon-arrow-down"></span>'
	case "left":
        return '<span class="glyphicon glyphicon-arrow-left"></span>'
	case "right":
        return '<span class="glyphicon glyphicon-arrow-right"></span>'
    default:
        return key.toUpperCase();
	} 
}