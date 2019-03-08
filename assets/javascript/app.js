var correct = 0;
var wrong = 0;
var unanswered = 0;
// time in seconds
var time = 300;
var countdownRunning = false;
var intervalID;
// Answer Key
var AnswerArr = [
"option3", //Q1
"option4", //Q2
"option1", //Q3
"option2", //Q4
"option3", //Q5
"option3", //Q6
"option4", //Q7
"option2", //Q8
"option1"  //Q9
];

// Hide the questions and display a "get ready message"
$("#question-container").hide();

var introBox = $("<div>");
introBox.attr("id", "intro-box");
introBox.html("<p id='instructions'>You'll have 5 minutes to answert the questions. Good luck!</p>");
$(".container").append(introBox);
var startButton = $("<button>");
startButton.attr("id", "start-button");
startButton.text("Let's start!");
$("#intro-box").append(startButton);

// remove the intro and show the questions
$(document).on("click", "#intro-box", function(){
    $("#intro-box").remove();
    $("#question-container").show();
    startCount();
    // console.log(countdownRunning);
});

// Use setInterval to start the countdown
function startCount(){
    
    if(!countdownRunning){
        intervalID = setInterval(count, 1000);
        countdownRunning = true;
    }
}

function count(){

  // When time is up, clear the html and display results
    if(time===0){
        clearInterval(intervalID);
        countdownRunning = false;
        $("#question-container").remove();
        showResults();
    }
    // Convert the countdown to timer we know how to read and send that to the html
    var converted = timeConverter(time);
    // console.log(converted);
    $("#time-remaining").text(converted);

    // decrement time left
    time--;
}

function timeConverter(unconverted){

  var minutes = Math.floor(unconverted / 60);
  var seconds = unconverted - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}

// If the sbmit button is clicked, figure out the results and display it
$("#submit-button").on("click", function(){
  
  clearInterval(intervalID);
  countdownRunning = false;
  showResults();
  $("#question-container").remove();
  
});


function showResults(){
  
  // Go through each radio group, figure out what was checked
  for (var i=1; i<=AnswerArr.length; i++){
    var radioValue = $("input[name=Answers" + i + "]:checked").val();
    // console.log("Question" + i + ": " + radioValue + " selected");

    // if the user checked a button for a question, check if it was right
    if($("input[name=Answers" + i + "]:checked").length > 0){
      // Array counts from 0, we count from one. Make the two line up
      if(AnswerArr[i-1] == radioValue){
        // console.log("Question" + i + ": Right!" );
        correct++;
        radioValue = null;
      } else if (AnswerArr[i-1] != radioValue){
        // console.log("Question" + i + ": Wrong!" );
        wrong++;
        radioValue = null;
      } 
    } else { //if no button was checked, increment the unanswered counter
      // console.log("You left question " + i + " unanswered");
      unanswered++;
    }
    
  }

  // console.log("Num correct: " + correct);
  // console.log("Num Wrong: " + wrong);
  // console.log("Num unanswered: " + unanswered);

  // Make the results div and send it out
  var resultDiv = $("<div>");
  resultDiv.attr("id", "result-box");
  resultDiv.html("<p id='answered-correctly'> Questions answered correctly: " + correct + "/" + AnswerArr.length +"</p>");
  resultDiv.append("<p id='answered-wrong'> Questions answered wrong: " + wrong + "/" + AnswerArr.length + "</p>");
  resultDiv.append("<p id='no-answer'> Questions unanswered: " + unanswered + "/" + AnswerArr.length + "</p>");
  $(".container").append(resultDiv);

}
