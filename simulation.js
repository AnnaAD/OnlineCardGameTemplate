

var canvas;
var ctx;
var canvasWidth;
var canvasHeight;
var mousePos = {x:0,y:0};


var moveable_cards = [];
var draggingCard = null;


function play() {

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");

  canvasWidth = canvas.getBoundingClientRect().width;
  canvasHeight = canvas.getBoundingClientRect().height;

  canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas,evt);
  });

  document.addEventListener('keypress', function(evt) {
    startPlayerTurn();
  });


  canvas.addEventListener('mousedown', function(evt) {
    processClick(getMousePos(canvas,evt));
  });

  canvas.addEventListener('mouseup', function(evt) {
    if(draggingCard != null) {
        processLetGo();
    }
  });

  refresh_moveable_cards();

  var FPS = 30;
  setInterval(function() {
    update();
    draw();
  }, 1000/FPS);

}

function draw() {
  ctx.fillStyle = "lightgray";
  ctx.fillRect(0,0,canvasWidth,canvasHeight);

  for(var i = 0; i < card_areas.length; i++) {
    if(card_areas[i].type != "deckPlayer" && card_areas[i].type != "deckEnemy") {
      ctx.fillStyle = "white";
      ctx.fillRect(card_areas[i].x/100*canvasWidth,card_areas[i].y/100*canvasHeight,card_areas[i].width/100*canvasWidth,card_areas[i].height/100*canvasHeight);
    }

    if(card_areas[i].type == "clientPlayer" || card_areas[i].type == "shared") {
      for(var j = 0; j < card_areas[i].cards.length; j++) {
        renderCard(card_areas[i].cards[j]);
      }
    }

    if(draggingCard != null) {
      renderCard(draggingCard);
    }

  }
}

function update() {
  if(draggingCard != null) {
    draggingCard.x = mousePos.x;
    draggingCard.y = mousePos.y;
  }
}

function refresh_moveable_cards() {
  moveable_cards = [];
  for(var i = 0; i < card_areas.length; i++) {
    var cardHeight = card_areas[i].height/100*canvasHeight;
    var cardWidth = cardHeight * (2.5/3.5);
    for(var j = 0; j < card_areas[i].cards.length; j++) {
      card_areas[i].cards[j].x = card_areas[i].x/100*canvasWidth+(j*cardWidth);
      card_areas[i].cards[j].y = card_areas[i].y/100*canvasHeight;
      card_areas[i].cards[j].width = cardWidth;
      card_areas[i].cards[j].height = cardHeight;
      card_areas[i].cards[j].parentAreaIndex = i;

      if(card_areas[i].card_position_moveable == true) {
        moveable_cards.push(card_areas[i].cards[j]);
      }
    }
  }
}


function processClick(mPos) {
  for(var i = 0; i < moveable_cards.length; i++) {
    if(intersecting(mPos, moveable_cards[i])) {
      draggingCard = moveable_cards[i];
      for(var j = 0; j < card_areas[draggingCard.parentAreaIndex].cards.length; j++) {
        if(moveable_cards[i] === card_areas[draggingCard.parentAreaIndex].cards[j]) {
          card_areas[draggingCard.parentAreaIndex].cards.splice(j,1);
          refresh_moveable_cards();
        }
      }
    }
  }
}

function processLetGo() {
  console.log("drop");
  var tempCards = card_areas[draggingCard.parentAreaIndex].cards;
  for(var i = 0; i < card_areas.length; i++) {
    rect = {x:card_areas[i].x/100*canvasWidth,y:card_areas[i].y/100*canvasHeight, width:card_areas[i].width/100*canvasWidth,height: card_areas[i].height/100*canvasHeight};
    if(intersecting(mousePos,rect)) {
      //runs custom designed method to see if you can play to this zone.
      if(draggingCard.move(card_areas[i].name)) {
        tempCards = card_areas[i].cards;
      }
    }
  }

  var inserted = false;
  for(var i = 0; i < tempCards.length; i++) {
    if(tempCards[i].x + tempCards[i].width/2 > draggingCard.x) {
      console.log("at " + i);
      tempCards.splice(i,0,draggingCard);
      inserted = true;
      break;
    }
  }
  if(!inserted) {
    tempCards.push(draggingCard);
  }
  draggingCard = null;
  refresh_moveable_cards();
}
