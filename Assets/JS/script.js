// the questions, choices, and answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"],
        answer: "all of the above"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    },
];

// DOM elements
var startScreenEl = document.getElementById("start-screen");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var responseEl = document.getElementById("response");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");


var currentQuestionIndex = 0; 
var time = questions.length * 10;
var timerId;

function startGame() {
  // hide start screen
  startScreenEl.setAttribute("class", "hide");
  // un-hide questions section
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(timerDown, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // removes 10 seconds if working and displays new time
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    responseEl.textContent = "Wrong!";
 
} else {
    responseEl.textContent = "Correct!";
  }

  // show correct/wrong response
  responseEl.setAttribute("class", "response");
  setTimeout(function() {
    responseEl.setAttribute("class", "response hide");
  }, 1000);

  // moves to next question
  currentQuestionIndex++;

  // checks to see if enough time and either ends game, or gets new question
  if (currentQuestionIndex === questions.length) {
    endGame();
  } else {
    getQuestion();
  }
}
// stops timer and shows final scores
function endGame() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}
//updates time
function timerDown() {
    time--;
  timerEl.textContent = time;

   if (time <= 0) {
    endGame();
  }

}
// listens for click on start buttom to begin game
startBtn.addEventListener("click", startGame);
