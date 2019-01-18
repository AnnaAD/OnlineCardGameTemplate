function drawCard(from, to) {
  var fromIndex = -1;
  var fromIndex = -1;

  for(var i = 0; i < card_areas.length; i++) {
    if(card_areas[i].name == from) {
      fromIndex = i;
    }

    if(card_areas[i].name == to) {
      toIndex = i;
    }
  }
  console.log('attempt ' + fromIndex + " " + toIndex);

  if(fromIndex != -1 && toIndex != -1 && card_areas[fromIndex].cards.length > 0) {
    console.log('attempt' + fromIndex + " " + toIndex);
    card_areas[toIndex].cards.push(card_areas[fromIndex].cards.pop());
  }
}
