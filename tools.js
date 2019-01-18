function intersecting(mPos, rect) {
  return mPos.x > rect.x && mPos.x < rect.x+rect.width && mPos.y > rect.y && mPos.y < rect.y + rect.height;
}

/*function intersecting(mPos, x, y) {
  console.log("what");
  return Math.hypot(mPos.x - x, mPos.y - y) < 5;
}*/

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x:evt.clientX - rect.left,
    y:evt.clientY - rect.top
  }
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
