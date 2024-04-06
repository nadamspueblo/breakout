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

function init() {
  //showControls();
  createCircle(getWidth() / 2, getHeight() - 200, 10, "inherit", "ball");
  createRect(getWidth() / 2 - 50, getHeight() - 50, 100, 20, "blue", "paddle");
  let angle = getRandomInt(-160, -20);
  setRotation(angle, "ball");
  addEventListener("keydown", keyDown);
  addEventListener("keyup", keyUp);
  addClickEvent("start-button", start);
}

function start() {
  hide("start-screen");
  startAnimation();
}

function mainLoop() {
  animateBall();
  animatePaddle();
  checkPaddleCollision();

  if (isTouching("ball", "block1")) {
    hide("block1");
    bounceVert();
  }
  else if (isTouching("ball", "block2")) {
    hide("block2");
    bounceVert();
  }
  else if (isTouching("ball", "block3")) {
    hide("block3");
    bounceVert();
  }
  else if (isTouching("ball", "block4")) {
    hide("block4");
    bounceVert();
  }
  else if (isTouching("ball", "block5")) {
    hide("block5");
    bounceVert();
  }
  else if (isTouching("ball", "block6")) {
    hide("block6");
    bounceVert();
  }
  else if (isTouching("ball", "block7")) {
    hide("block7");
    bounceVert();
  }
  else if (isTouching("ball", "block8")) {
    hide("block8");
    bounceVert();
  }

}

function reset() {
  let angle = getRandomInt(-160, -20);
  console.log(angle);
  setRotation(angle, "ball");
  setX(getWidth() / 2, "ball");
  setY(getHeight() / 2, "ball");
}

function animateBall() {
  move(ballSpeed, "ball");

  if (getX("ball") >= getWidth() - 10 || getX("ball") <= 10) {
    bounceHorz();
  }
  else if (getY("ball") >= getHeight() - 10 || getY("ball") <= 10) {
    bounceVert();
  }
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