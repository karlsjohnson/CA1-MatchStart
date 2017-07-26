var MatchGame = {};
/*
Sets up a new game after HTML document has loaded.
Renders a 4x4 board of cards.
*/
$(document).ready(function() {
	// More jQuery code goes in here later
	var $game = $('#game');
	var cardValues = MatchGame.generateCardValues();
	MatchGame.renderCards(cardValues, $game)
});
/*
Generates and returns an array of matching card values.
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
	$game.data('flippedCards', []);
	$game.data('matches', []);
	var colorArray = ["hsl(25,85%,65%)" ,"hsl(55,85%,65%)" ,"hsl(90,85%,65%)" ,"hsl(160,85%,65%)" ,"hsl(220,85%,65%)" ,"hsl(265,85%,65%)" ,"hsl(310,85%,65%)" ,"hsl(360,85%,65%)"];
	for (var i = 0; i <= 15; i++) {
		var $card = $('<div class="col-xs-3 card"></div>');
		var value = cardValues[i];
		var setColor = colorArray[value-1];
		$card.data('value', value);
		$card.data('color', setColor);
		$card.data('flipped', false);
		$game.append($card);
	}
	  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};
/*
Flips over a given card and checks to see if two cards are flipped over.
Updates styles on flipped cards depending whether they are a match or not.
*/
MatchGame.flipCard = function($card, $game) {

  if ($card.data('flipped')) {
    return;
  }

  $card.css('background-color', $card.data('color')).text($card.data('value')).data('flipped', true);

  var flippedCards = $game.data('flippedCards');
  var matchingCards = $game.data('matches');

  flippedCards.push($card);


  if (flippedCards.length == 2) {

    if (flippedCards[0].data('value') === flippedCards[1].data('value') ) {
      var cardsMatch = {
        backgroundColor: 'rgb(153,153,153)',
        color: 'rgb(204,204,204)'
      };
      flippedCards[0].css(cardsMatch);
      flippedCards[1].css(cardsMatch);

      matchingCards.push(flippedCards);
      $game.data('flippedCards', []);

    } else {
      setTimeout( function () {

        flippedCards[0].css({
          backgroundColor: 'rgb(32,64,86)',
          color: 'rgb(255,255,255)'
        });
        flippedCards[0].text('');
        flippedCards[0].data('flipped', false);
        flippedCards[1].css({
          backgroundColor: 'rgb(32,64,86)',
          color: 'rgb(255,255,255)'
        });
        flippedCards[1].text('');
        flippedCards[1].data('flipped', false);
        $game.data('flippedCards', []);
      }, 350)

    }

    if (matchingCards.length === 8) {
      alert('You are a WINNER!');
      setTimeout(function () {

        var $game = $('#game');
        var cardValues = MatchGame.generateCardValues();
        MatchGame.renderCards(cardValues, $game);

      }, 200)
    }


  }


};




