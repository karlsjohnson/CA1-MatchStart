var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  var $game = $('#game');
  var randomCards = MatchGame.generateCardValues();
  console.log(randomCards);
  MatchGame.renderCards(randomCards, $game);
});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var orderedNumArray = [];
  for (i = 1; i <= 8; i ++) {
    orderedNumArray.push(i);
    orderedNumArray.push(i);
  }
  var newArray = [];
  var x = 0;
  var y = 16;
  while (x < 16){
    var randomIndex = Math.floor(Math.random() * (y));
    var itemAtIndex = orderedNumArray[randomIndex];
    newArray.push(itemAtIndex);
    orderedNumArray.splice(randomIndex, 1);
    y--;
    x++;
  }

  return newArray;

};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.empty();
  $game.data('flippedCards', []);
  $game.data('matches', []);

  var colorArray = [
    'hsl(25,85%,65%)',
    'hsl(55,85%,65%)',
    'hsl(90,85%,65%)',
    'hsl(160,85%,65%)',
    'hsl(220,85%,65%)',
    'hsl(265,85%,65%)',
    'hsl(310,85%,65%)',
    'hsl(360,85%,65%)'
  ];

  for (i = 0; i < cardValues.length; i ++) {
    var value = cardValues[i];
    var color = colorArray[value - 1];
    var data = {value: value, color: color, flipped: false};

    var $cardGenerator = $('<div class="col-xs-3 card"></div>');
    $cardGenerator.data(data);

    $game.append($cardGenerator);
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
  var matches = $game.data('matches');

  flippedCards.push($card);
  console.log(flippedCards);

  if (flippedCards.length == 2) {

    if (flippedCards[0].data('value') === flippedCards[1].data('value') ) {
      var matching = {
        backgroundColor: 'rgb(153,153,153)',
        color: 'rgb(204,204,204)'
      };
      flippedCards[0].css(matching);
      flippedCards[1].css(matching);

      matches.push(flippedCards);
      $game.data('flippedCards', []);

    } else {
      setTimeout( function () {
        var resetCss = {
          backgroundColor: 'rgb(32,64,86)',
          color: 'rgb(255,255,255)'
        };

        flippedCards[0].css(resetCss);
        flippedCards[0].text('');
        flippedCards[0].data('flipped', false);
        flippedCards[1].css(resetCss);
        flippedCards[1].text('');
        flippedCards[1].data('flipped', false);
        $game.data('flippedCards', []);
      }, 350)

    }

    if (matches.length === 8) {
      alert('You are a WINNER!');
      setTimeout(function () {

        var $game = $('#game');
        var randomCards = MatchGame.generateCardValues();
        console.log(randomCards);
        MatchGame.renderCards(randomCards, $game);

      }, 200)
    }


  }


};