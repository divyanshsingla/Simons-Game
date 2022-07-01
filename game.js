var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keypress(function () {
  if (!start) {
    $("h1").text("Level " + level);
    nextSequence();
    start = true;
  }
});

$("button").click(function () {
  var userChosenColor = $(this).attr("class");
  userClickedPattern.push(userChosenColor);
//   console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAns(userClickedPattern.length - 1);
});

function checkAns(currentLevel) {
  if ((gamePattern[currentLevel] == userClickedPattern[currentLevel])) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over!! Press Any key to Restart");
    startOver();
  }
}

function startOver() {
  start = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  
}

function playSound(buttonClicked) {
  var audio = new Audio("sounds_" + buttonClicked + ".mp3");
  audio.play();
}

function animatePress(button) {
  var buttonclk = $("#" + button);
  buttonclk.addClass("pressed");
  setTimeout(function () {
    buttonclk.removeClass("pressed");
  }, 100);
}
