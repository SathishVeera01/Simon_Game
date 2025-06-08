let gamePattern = [];
let userClickedPattern = [];
let buttonColor = ["red", "blue", "green", "yellow"];
let start = false;
let level = 1;
let hl = 0;
function nextsequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour;
  randomChosenColour = buttonColor[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  console.log(gamePattern);
  $("h1").text("Level " + level);
  level++;
}
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  let currentLevel = userClickedPattern.length - 1;
  checkAnswer(currentLevel);
  console.log(currentLevel);
});
function playSound(name) {
  $("#" + name)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  let gindex = gamePattern.length - 1;
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (currentLevel === gindex) {
      if (currentLevel + 1 > hl) {
        hl = currentLevel + 1;
      }
      $("p").text("Highest Level:" + hl);
      setTimeout(function () {
        userClickedPattern = [];
        nextsequence();
      }, 1000);
    }
  } else {
    $("h1").text("Game Over.Press Any key to Restart");
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    gamePattern = [];
    userClickedPattern = [];
    level = 1;
    start = false;
  }
}
$(document).keydown(function () {
  if (!start) {
    nextsequence();
    start = true;
  }
});
