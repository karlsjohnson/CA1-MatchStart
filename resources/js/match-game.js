var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
  file:///Users/elecknight/Projects/F1U8PMatch_start/index.html
 MatchGame.generateCardValues();
 */

MatchGame.generateCardValues = function () {
var arrayIndex = 0;
var cardArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
var returnArray = [];
while (cardArray.length > 0){
	arrayIndex = Math.floor((Math.random() * cardArray.length));
	returnArray.push(cardArray[arrayIndex]);
	cardArray.splice(arrayIndex, 1);
}
	return returnArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
	$game.empty();
	var colorArray = ['hsl(25,85%,65%)', 'hsl(55,85%,65%)', 'hsl(90,85%,65%)', 'hsl(160,85%,65%)', 'hsl(220,85%,65%)', 'hsl(265,85%,65%)', 'hsl(310,85%,65%)', 'hsl(360,85%,65%)']
	for (var i = 0; i >= 15; i++) {
		var $card = $('<div class="col-xs-3 card"></div>');
		var value = cardValues[valueIndex];
		$card.data(data, value);
		$card.data('flipped', false);
		$card.data('color', colorArray[value]);
		$game.append($card);
	}
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};