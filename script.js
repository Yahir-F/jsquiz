///Create a Button that will start the quiz 
//once Button Is clicked the button will dissapear P.S I didn't make it dissapear but it works..
//User Will be prompted with the quiz questions 
//Timer on the top right of the screen indicating time left
//questions have to = a set amount of points totaling 100.
//if user gets questions wrong the don't receive points for the question + question is skipped.
//Scores are to be stored and displayed for reference
//will be using the let function in order to set values 

//Will keep track of the time
let timeLeft = 60;

let numTime = document.getElementById("numTime");
let divScore = document.getElementById("d-Scores");
let buttonsDiv = document.getElementById("buttons")
let viewScoresBtn = document.getElementById("all-scores")
let quizStart = document.getElementById("Begin");
quizStart.addEventListener("click", showTime);
var divQuestion = document.getElementById("d-Question");
let total = document.getElementById("total");
var options = document.getElementById("Answers");
//Will store High Score
let highscore = [];


let storedArray = JSON.parse(window.localStorage.getItem("highScores"));


var numquestions = 0;

//Will keep track of Points
let points = 100

//Function to make the timer show up.. I Struggled to get this working again..
function showTime() {
  showQuestions();
  let timeInterval = setInterval(function() {
    timeLeft--;
    numTime.textContent = "";
    numTime.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0 || numquestions === questions.length) {
      clearInterval(timeInterval);
      storeScore();
    } 
  }, 1000);
}



//Function to make the questions show up...
function showQuestions() {
  ElsRemove(quizStart);

  if (numquestions < questions.length) {
    divQuestion.innerHTML = questions[numquestions].title;
    options.textContent = "";

    for (let i = 0; i < questions[numquestions].multiChoice.length; i++) {
      let ment = document.createElement("button");
      ment.innerText = questions[numquestions].multiChoice[i];
      ment.setAttribute("data-id", i);
      ment.addEventListener("click", function (event) {
        event.stopPropagation();

        if (ment.innerText === questions[numquestions].answer) {
        } else {
          points -= 20;
      
        }
        divQuestion.innerHTML = "";
        if (numquestions === questions.length) {
          return;
        } else {
          numquestions++;
          showQuestions();
        }
      });
      options.append(ment);
    }
  }
}

//function that will store the users final score and keep it in localstorage.
function storeScore() {
  numTime.remove();
  options.textContent = "";

  let startingInput = document.createElement("input");
  let endInput = document.createElement("input");

  total.innerHTML = `Your score ${points} points! Enter Initials (2 characters) `;
  startingInput.setAttribute("type", "text");
  endInput.setAttribute("type", "button");
  endInput.setAttribute("value", "Submit my Score");
  endInput.addEventListener("click", function (event) {
    event.preventDefault();
    let Scores = scoresArray(storedArray, highscore);

    let nameInitial = startingInput.value;
    let userAndScore = {
      nameInitial: nameInitial,
      points: points,
    };

    Scores.push(userAndScore);
    Save(Scores);
    showAllScores();
    removeScores();
    buttonReturn();
    viewScoresBtn.remove();
  });
  total.append(startingInput);
  total.append(endInput);
}

const Save = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

const scoresArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

const ElsRemove = (...els) => {
  for (let ment of els) ment.remove();
}

function showAllScores() {
  ElsRemove(numTime, quizStart, total);
  let Scores = scoresArray(storedArray, highscore);

  Scores.forEach(obj => {
    let nameInitial = obj.nameInitial;
    let storedScore = obj.points;
    let resultsP = document.createElement("p");
    resultsP.innerText = `${nameInitial}: ${storedScore}`;
    divScore.append(resultsP);
  });
}

function viewScores() {
  viewScoresBtn.addEventListener("click", function(event) {
    event.preventDefault();
    ElsRemove(numTime, quizStart);
    showAllScores();
    ElsRemove(viewScoresBtn);
    removeScores();
    buttonReturn();
  });
}

function removeScores() {    
  let clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear Scores");
  clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    ElsRemove(divScore);
    window.localStorage.removeItem("highScores");
  })
  divScore.append(clearBtn)
}

function buttonReturn() {
  let backBtn = document.createElement("input");
  backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "Go Back");
  backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonsDiv.append(backBtn)
}

//This will show all the final scores.
viewScores();
