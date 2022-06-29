///Create a Button that will start the quiz 
//once Button Is clicked the button will dissapear 
//User Will be prompted with the quiz questions 
//Timer on the top right of the screen indicating time left
//questions have to = a set amount of points totaling 100.
//if user gets questions wrong the don't receive points for the question + question is skipped.
//Scores are to be stored and displayed for reference
//will be using the let function in order to set values 


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

let quizStart =  document.getElementById("Begin");
quizStart.addEventListener("click",showTime);


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
        divQ
    }
   }





