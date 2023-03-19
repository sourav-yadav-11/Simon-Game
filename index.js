var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

//Event Handler For KeyPress
$(document).keypress(function() {
    if(!started){
        nextLevel();
    }
});

//Event Handler for MouseClick.
$(".btn").click(function () {
    var userBtn = $(this).attr("id");
    userPattern.push(userBtn);
    playSound(userBtn);
    btnPress(userBtn);
    checkInput(userPattern.length-1);
});

//Function for checking the input given by the user.
function checkInput(check) {
    if (userPattern[check] === gamePattern[check]) {

        if(userPattern.length === gamePattern.length){
            setTimeout(function(){nextLevel();},1000);
        }

    }else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);
        restartGame();
    }
    
}

//Function for generating Next Level.
function nextLevel(){
    userPattern = [];
    level++;
    $("#level-title").text("Level "+ level);

    var randomNo = Math.floor(Math.random()*4);
    var randomColor = colors[randomNo];
    gamePattern.push(randomColor);
    
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

//Function for playing corresponding Sounds.
function playSound(sound){
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

//Function for Button Press Animation
function btnPress(pressed) {
    $("#"+pressed).addClass("pressed");
    setTimeout(function(){
        $("#"+pressed).removeClass("pressed");
    },200);
    
}

//Function to restart Game
function restartGame() {
    $("#level-title").text("Game Over! Press any key to Restart"); 
    level = 0;
    started = false;
    userPattern = []; 
}