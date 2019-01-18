

var canvas;
var ctx;
var canvasWidth;
var canvasHeight;
var mousePos = {x:0,y:0};

var moveable_cards = [];

function play() {

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");

  canvasWidth = canvas.getBoundingClientRect().width;
  canvasHeight = canvas.getBoundingClientRect().height;

  canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas,evt);
  });

  document.addEventListener('keypress', function(evt) {

  });


  canvas.addEventListener('mousedown', function(evt) {

  });


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
    if(card_areas[i].type == "deckPlayer" || card_areas[i].type == "deckEnemy") {
      ctx.fillStyle = "black";
    } else {
      ctx.fillStyle = "white";
    }
    ctx.fillRect(card_areas[i].x/100*canvasWidth,card_areas[i].y/100*canvasHeight,card_areas[i].width/100*canvasWidth,card_areas[i].height/100*canvasHeight);

    if(card_areas[i].type == "clientPlayer" || card_areas[i].type == "shared") {
      var cardHeight = card_areas[i].height/100*canvasHeight;
      var cardWidth = cardHeight * (2.5/3.5);
      for(var j = 0; j < card_areas[i].cards.length; j++) {
        ctx.fillStyle = card_areas[i].cards[j].color;
        ctx.fillRect(card_areas[i].x/100*canvasWidth+(j*cardWidth) + 5,card_areas[i].y/100*canvasHeight,cardWidth,cardHeight);
      }
    }
  }
}

function update() {
  for(var i = 0; i < card_areas.length; i++) {
    if(card_areas[i].card_position_moveable == true) {
      for(var j = 0; j < card_areas[i].cards.length; j++) {
        moveable_cards.push(card_areas[i].cards[j]);
      }
    }
  }

}

function processClick(mPos) {
  /**for(var i = 0; i <moveable_cards.length; i++) {
      var rect = {x:moveable_cards[i].x/100*canvasWidth, y:moveable_cards[i].y/100*canvasHeight, height:moveable_cards[i].height/100*canvasHeight,
      var cardWidth = (moveable_cards[i].height/100*canvasHeight) * (2.5/3.5)};
      if(intersecting(mPos,)) {

      }
  }**/
}
