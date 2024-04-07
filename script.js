// Start with init and mainLoop functions
// Print to console in loop
// Call startAnimation() from init - will have to reload to stop
// Replace startAnimation() call with showControls() and test
// Create a circle with the id="ball1"
// Demo how to animate the circle to move across the screen
// Demo overflow: hidden; to hide scroll bars
// Demo reset() function definition
// Demo using a variable for ball speed
// Demo using if-else to make the ball bounce 
// Demo moving ball1 code into animateBall1() function
// Students create a second bouncing ball the moves up and down
// Day 2: Demo using move() and rotate() to create a bouncing ball

let ballSpeed = 10;
let leftPressed = false;
let rightPressed = false;
let paddleSpeed = 10;
let level = 1;
let lives = 3;
let count = 3;
let counterId = 0;
let blockCount = 0;
let totalBlocks = 0;
let score = 0;

function init() {
  //showControls();
  addClickEvent("start-button", startNextLvl);
  addEventListener("keydown", keyDown);
  addEventListener("keyup", keyUp);
  addClickEvent("retry-button", reloadPage);
  
  createCircle(getWidth() / 2, getHeight() - 200, 10, "inherit", "ball");
  let angle = getRandomInt(-160, -20);
  setRotation(angle, "ball");
  hide("ball");
  createRect(getWidth() / 2 - 50, getHeight() - 50, 100, 20, "blue", "paddle");
  hide("paddle");
}

function reloadPage(){
  location.reload();
}

function startLvl1() {
  show("level1");
  score = 0;
  totalBlocks = 8;
  blockCount = 0;
  lives = 3;
  for (let n = 1; n <= totalBlocks; n++) {
    show("block" + n);
  }
  startLife();
}

function startLvl2() {
  show("level2");
  totalBlocks = 40;
  startLife();
}

function startNextLvl() {  
  hide("start-screen");
  resetBall();
  show("ball");
  resetPaddle();
  show("paddle");

  if (level == 1) {
    startLvl1();
  }
  else if (level == 2) {
    hide("level1");
    startLvl2();
  }
}

function mainLoop() {
  animateBall();
  animatePaddle();
  checkPaddleCollision();

  if (blockCount >= totalBlocks) {
    stopAnimation();
    hide("ball");
    hide("paddle");
    show("start-screen");
    level++;
    setText("Level " + level, "lvl-display");
  }

  if (level == 1) {
    checkLvl1Hits();
  }
  else if (level == 2){
    checkLvl2Hits();
  }

}

function checkLvl1HitsOld() {
  for (let n = 1; n <= totalBlocks; n++) {
    if (isTouching("ball", "block" + n)) {
      let text = getText("block" + n);
      if (text != "") {
        if (text == "💎"){
          score++;
          setText("💎 X " + score, "score-display");
        }
        setText("", "block" + n);
      }
      else {
        hide("block" + n);
        blockCount++;
      }
      bounceVert();
      break
    }
  }
}

function checkLvl1Hits() {
  for (let n = 1; n <= totalBlocks; n++) {
    if (isTouching("ball", "block" + n)) {
      let bgColor = getStyle("background-image", "block" + n);
      let text = getText("block" + n);
      if (bgColor != "inherit" && text != "") {
        setStyle("background-image", "inherit", "block" + n);
        setStyle("box-shadow", "inherit", "block" + n);
        setStyle("visibility", "inherit", "block" + n);
        blockCount++;
      }
      else {
        hide("block" + n);
        if (text == "💎"){
          score++;
          setText("💎 X " + score, "score-display");
        }
        else if (text == "❤️") {
          lives++;
          setText("❤️ X " + lives, "lives-display");
        }
        else {
          blockCount++;
        }
      }
      bounceVert();
      break;
    }
  }
}

function checkLvl2Hits() {
  for (let n = 9; n <= totalBlocks; n++) {
    if (isTouching("ball", "block" + n)) {
      let bgColor = getStyle("background-image", "block" + n);
      let text = getText("block" + n);
      if (bgColor != "inherit" && text != "") {
        setStyle("background-image", "inherit", "block" + n);
        setStyle("box-shadow", "inherit", "block" + n);
        setStyle("visibility", "inherit", "block" + n);
        blockCount++;
      }
      else {
        hide("block" + n);
        if (text == "💎"){
          score++;
          setText("💎 X " + score, "score-display");
        }
        else if (text == "❤️") {
          lives++;
          setText("❤️ X " + lives, "lives-display");
        }
        else {
          blockCount++;
        }
      }
      bounceVert();
      break;
    }
  }
}

function resetBall() {
  let angle = getRandomInt(60, 120);
  setRotation(angle, "ball");
  setX(getWidth() / 2, "ball");
  setY(getHeight() / 2, "ball");
}

function resetPaddle() {
  setX(getWidth() / 2 - 50, "paddle");
}

function animateBall() {
  move(ballSpeed, "ball");

  if (getX("ball") >= getWidth() - 10) {
    bounceHorz();
    setX(getWidth() - 10, "ball");
  }
  else if (getX("ball") <= 10){
    bounceHorz();
    setX(10, "ball");
  }
  else if (getY("ball") <= 10) {
    bounceVert();
    setY(10, "ball");
  }
  else if (getY("ball") >= getY("paddle")) {
    lives = lives - 1;
    setText("❤️ X " + lives, "lives-display");
    resetBall();
    resetPaddle();
    stopAnimation();
    if (lives > 0) {
      startLife();
    }
    else {
      showGameOver();
    }
  }
}

function startLife() {
  count = 2;
  show("timer");
  setText(3, "timer");
  counterId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (count > 0) {
    setText(count, "timer");
    count--;
    }
    else {
      hide("timer");
      show("paddle");
      show("ball");
      startAnimation();
      clearInterval(counterId);
    }
}

function showGameOver() {
  hide("paddle");
  hide("ball");
  show("gameover-screen");
  stopAnimation();
}

function bounceHorz() {
  let angle = getRotation("ball");
  angle = (180 - angle);
  setRotation(angle, "ball");
}

function bounceVert() {
  let angle = getRotation("ball");
  angle = -angle;
  setRotation(angle, "ball");
}

function animatePaddle() {
  if (leftPressed) {
    changeXBy(-paddleSpeed, "paddle");
    if (getX("paddle") < 0) {
      setX(0, "paddle");
    }
  }
  if (rightPressed) {
    changeXBy(paddleSpeed, "paddle");
    if (getX("paddle") > getWidth() - getWidth("paddle")) {
      setX(getWidth() - getWidth("paddle"), "paddle");
    }
  }
}

function checkPaddleCollision() {
  if (isTouching("ball", "paddle")) {
    let angle = getRotation("ball");
    angle = -angle + getRandomInt(-10, 10);
    setRotation(angle, "ball");
    setY(getY("paddle") - 10, "ball");
  }
}

function keyDown(event) {
  if (event.code == "ArrowLeft") {
    leftPressed = true;
  }
  if (event.code == "ArrowRight") {
    rightPressed = true;
  }

}

function keyUp(event) {
  if (event.code == "ArrowLeft") {
    leftPressed = false;
  }
  if (event.code == "ArrowRight") {
    rightPressed = false;
  }
}

init();