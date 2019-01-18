function drawCar(car) {
  ctx.fillStyle = car.color;
  ctx.beginPath();
  ctx.arc(car.x,car.y,3,2*Math.PI, false);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle =  "#000000";
  ctx.stroke();
}
