///Create a Button that will start the quiz 
//once Button Is clicked the button will dissapear 
//User Will be prompted with the quiz questions 
//Timer on the top right of the screen indicating time left
//questions have to = a set amount of points totaling 100.
//if user gets questions wrong the don't receive points for the question + question is skipped.
//Scores are to be stored and displayed for reference
//will be using the let function in order to set values 
let buttonsDiv =  document.getElementById("buttons")
let quizStart =  document.getElementById("Begin");
quizStart.addEventListener("click", showTime)
var divQuestion =  document.getElementById("d-Question")
var options = document.getElementById("Answers")
let total = document.getElementById("total")
let divscore = document.getElementById("d-Scores")
//will display time
let numTime = document.getElementById("numTime")
//will display scores
let scoresBtn = document.getElementById("all-scores")
//Keeps track as to what question # it is
var numquestions = 0;
//keeps track of time
let timeleft = 76;
//keeps track of points 
let points = 0
let highscore = [];

let storedArray = JSON.parse(window.localStorage.getItem("HighScores"));


function showTime() {
    showQuestions();
   let timeInterval = setInterval(function() {
    timeLeft--;
    numTime.textContent = "";
    numTime.textContent - "Time: " + timeleft;
    if (timeleft <= 0 || numquestions === questions.lenght){
        clearInterval(timeInterval);
        storeScore();
    }
    }, 1000);
   }

   function showQuestions(){
       ElsRemove(quizStart);

    if(numquestions < questions.lenght){
        divQuestion.innerHTML =  questions[numquestions].title;
        options.textContent = ""

        for(let i = 0; i <questions[numquestions].multiChoice.lenght; i++) {
            let ment = document.createElement("button");
            ment.innerText = questions[numquestions].multiChoice[1];
            ment.setAttribute("Data", i)
            ment.addEventListener("click", function(event){
                event.stopPropagation();
            
                if(ment.innerText === questions[numquestions].answer){
                    score += timeleft
                }else {
        score -=25;
    
    
   }

divQuestion.innerHTML = "";
if(numquestions === questions.lenght){
    return;
}else {
    numquestions++;
    showQuestions();
}
});
options.append(ment);
        }
    }
}


function storeScore() {
    numTime.remove();
    options.textContent = "";

    let startingInput = document.createElement("input");
    let endInput = document.createElement("input");
  
    total.innerHTML = `You scored ${score} points! Enter Initials (2 characters) `;
    startingInput.setAttribute("type", "text");
    endInput.setAttribute("type", "button");
    endInput.setAttribute("value", "Submit my Score");
    endInput.addEventListener("click", function (event) {
      event.preventDefault();

let Scores = scoresArray(storedArray, emptyArray);

    let nameInitial = startingInput.value;
    let userAndScore = {
      nameInitial: nameInitial,
      score: score,
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
  
  const removeEls = (...els) => {
    for (let ment of els) ment.remove();
  }
  
  function showAllScores() {
    removeEls(numTime, quizStart, total);
    let Scores = scoresArray(storedArray, emptyArray);
  
    Scores.forEach(obj => {
      let nameInitial = obj.nameInitial;
      let storedScore = obj.score;
      let resultsP = document.createElement("p");
      resultsP.innerText = `${nameInitial}: ${storedScore}`;
      divScore.append(resultsP);
    });
  }
  
  function viewScores() {
    viewScoresBtn.addEventListener("click", function(event) {
      event.preventDefault();
      removeEls(numTime, quizStart);
      showAllScores();
      removeEls(viewScoresBtn);
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
      removeEls(divScore);
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
  
  
  viewScores();
  