const game_name = "MY CARD GAME!";
var card_areas = [{name: "playerHand", type:"clientPlayer", x:0, y:80, width: 100, height:20, cards: [], card_position_moveable:true},
                    {name: "enemyLand", type:"shared", x:0, y:25, width: 100, height:12, cards: []},
                    {name: "enemyBattlefield", type:"shared", x:0, y:25 + 12, width: 100, height:12, cards: []},
                    {name: "playerBattlefield", type:"shared", x:0, y:25 + 12*2, width: 100, height:12, cards: []},
                    {name: "playerLand", type:"shared", x:0, y:25 + 12*3, width: 100, height:12, cards: []},

                    {name: "enemyHand", type:"enemyPlayer", x:0, y:0, width: 100, height:20, cards: []},
                    {name: "playerDeck", type:"deckPlayer", x:0, y:0, width: 15, height:25, cards: []}];


var player_stats = {health:20, mana:10};
var turnStep = 0; //can assign own meaning to each turn step. Goes up by one each time player presses advance turn.

//CUSTOM METHOD TO RUN ON START OF PLAYER'S TURN
function advanceTurn() {
  if(turnStep == 0) {
    drawCard("playerDeck", "playerHand");
    refresh_moveable_cards();
  }

  turnStep++;

  if(turnStep == 4) {
    turnStep = 0;
  }
}

//Game Engine will call this function if it exists for a card, when attempting to drag it to another area, to check if legal.
//Define as you wish and assign different methods to your different cards!
function customMoveCheck(targetArea) {
  if(targetArea == "playerBattlefield" && this.cost <= player_stats.mana) {
    player_stats.mana -= this.cost;
    return true;
  }
  return false;
}

function sampleCustomAbilityDefinition() {

}

//TESTING

var deckCards = [];

for(var i = 0; i < 5; i++) {
  deckCards.push({color:getRandomColor(), move:customMoveCheck, cost: 5});
}

card_areas[6].cards = deckCards;
