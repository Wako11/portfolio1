

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionLimit = quiz.length; //if you want all questions "quiz.length"
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


    //push the questions into the available questions array
function setAvailableQuestion(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion;i++){
        availableQuestions.push(quiz[i])
    }
}

//set question number and question and options
function getNewQuestion(){
    console.log(availableQuestions)
     //set question number
    questionNumber.innerHTML = "Question" + (questionCounter + 1) + " of " + questionLimit;
     //set question text
     //get random question
     const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
     currentQuestion = questionIndex;
      questionText.innerHTML = currentQuestion.q;  
//get the position of the 'questionIndex' from the availableQuestion Array;
      const index1= availableQuestions.indexOf(questionIndex);
    //remove the 'questionIndex' from the availableQuestion Array, so that the question does not repeat
      availableQuestions.splice(index1,1);
  //show question img if 'img' property exists
    if(currentQuestion.hasOwnProperty("img")){
       const img = document.createElement("img");
       img.src = currentQuestion.img;
       questionText.appendChild(img);
    }
      //set options
      //get the length of the options
     const optionLen = currentQuestion.options.length
      //push options into availableOptions Array
     for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
      }
      optionContainer.innerHTML = '';
      let animationDelay = 0.15;
   //create options in html
      for(let i=0;  i<optionLen;i++){
          //random option
          const optionIndex = availableOptions[Math.floor(Math.random()* availableOptions.length)];
         //get the position of 'optionIndex' from the availableOptions Array
          const index2 = availableOptions.indexOf(optionIndex);
          //remove the 'optionIndex' from the availableOptions Array, so that the option does not delay
          availableOptions.splice(index2,1);
          const option = document.createElement("div");
          option.innerHTML = currentQuestion.options[optionIndex];
          option.id = optionIndex;
          option.style.animationDelay = animationDelay + 's';
          animationDelay = animationDelay + 0.15;
          option.className = "option";
          optionContainer.appendChild(option)
          option.setAttribute("onclick","getResult(this)");
      }
     questionCounter++
}

//get the result of the current attempt question
function getResult(element){
    const id = parseInt(element.id);
    // get the answer by comparing the id of the clicked option
    if(id === currentQuestion.answer){
        //set the green color to the correct option
        element.classList.add("correct");
        //add the indicator to the correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        //set red for the incorrect answer
        element.classList.add("wrong");

        //add the indicator to the wrong mark
        updateAnswerIndicator("wrong");

        //if the answer is incorrect then show the correct option by adding a green color to the correct answer
        const optionLen = optionContainer.children.length;
        for(let i=0;i<optionLen; i++){
          if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
              optionContainer.children[i].classList.add("correct");
          }  
        }
    }
    attempt++;
    unclickableOptions();
}
//make all the options unclickable once the user select a option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}
function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    for(let i=0; i<totalQuestion;i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType){
 answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
    if(questionCounter === questionLimit){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    //hide quiz quizBox
    quizBox.classList.add("hide");
    //show result Box
    resultBox.classList.remove("hide");
    quizResult();
}
//get the quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/questionLimit)* 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
}
function resetQuiz(){
     questionCounter = 0;
     correctAnswers = 0;
     attempt = 0;
     availableQuestion = [];
}

function tryAgainQuiz(){
    //hide the resultBox
    resultBox.classList.add("hide");
    //show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    // hide result Box
    resultBox.classList.add("hide");
    // show home Box
    homeBox.classList.remove("hide");
    resetQuiz();
}

// #### STARTING POINT ####
function startQuiz(){

    //hide home box
    homeBox.classList.add("hide");
    //show quiz Box
    quizBox.classList.remove("hide");
    //first we will set all questions in availableQuestion Array
    setAvailableQuestion();
    //second we will call getNewQuestion(); function
    getNewQuestion();
    //to create indicators of answers
    answersIndicator();

}

window.onload = function (){
    homeBox.querySelector(".total-question").innerHTML = questionLimit;
}
