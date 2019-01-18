function renderCard(card) {
  ctx.fillStyle = card.color;
  ctx.fillRect(card.x,card.y, card.width, card.height);
}
