var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var message = document.getElementById("message");
var jumping = 0;
var counter = 0;

var title = document.createTextNode("Flappy Bird");
message.appendChild(title);

// Randomly positions the hole for each block
hole.addEventListener("animationiteration", () => {
  var random = -((Math.random()*300)+150);
  hole.style.top = random + "px";
  counter++;
});

setInterval(() => {
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  if (jumping == 0) {
    character.style.top = (characterTop + 3) + "px";
  }

  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  var cTop = -(500 - characterTop);

  // Collision
  if((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
    character.style.display = 'none';
    character.style.top = 100 + "px";
  
    counter <= 0 ? counter = 0 : counter;
    var gameOver = document.createTextNode("Game Over. Final Score: " + counter);
    counter=0;
  
    var restart = document.createElement("button");
    restart.setAttribute("id", "restart")
    restart.textContent = 'Restart';

    message.removeChild(title);
    message.appendChild(gameOver);
    message.appendChild(restart);


    restart.addEventListener("click", () => {
      location.reload();
    })
  }

}, 10);

// Jump function
function jump() {
  jumping = 1;
  let jumpCount = 0;
  var jumpInterval = setInterval(function() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    if ((characterTop > 6) && (jumpCount < 15)) {
      character.style.top = (characterTop - 5) + "px";
    }
  
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  })
}
