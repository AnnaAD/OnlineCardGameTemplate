const game_name = "MY CARD GAME!";
var card_areas = [{type:"clientPlayer", x:0, y:75, width: 100, height:25, cards: [], card_position_moveable:true},
                    {type:"shared", x:0, y:50-25/2, width: 100, height:25, cards: []},
                    {type:"enemyPlayer", x:0, y:0, width: 100, height:25, cards: []},
                    {type:"deckPlayer", x:0, y:0, width: 15, height:25, cards: []}];

var deckCards = [];

for(var i = 0; i < 5; i++) {
  deckCards.push({color:getRandomColor()});
}

card_areas[0].cards = deckCards;
