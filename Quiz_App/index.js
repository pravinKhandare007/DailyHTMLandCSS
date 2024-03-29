
function Quiz(questions){
    this.questions = questions;
    this.score = 0
    this.questionIndex = 0;
}

Quiz.prototype.isEnded = function(){
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(userAnswer){
    if(this.getQuestionByIndex().isCorrectAnswer(userAnswer)){
        this.score++;
    }
    this.questionIndex++;
}

 function Question(questionText,choices,answer){
    this.questionText=questionText;
    this.choices=choices;
    this.answer=answer;
}

Question.prototype.isCorrectAnswer = function(userAnswer){
    return this.answer===userAnswer;
}

function loadQuestions() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        let question = quiz.getQuestionByIndex();
        var element = document.getElementById("question");
        element.innerHTML = question.questionText;
  
        var choices = question.choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }
  
        updateProgress();
    }
}

function handleOptionButton(id,choice){
    let button = document.getElementById(id);
    button.onclick = function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}


function updateProgress(){ 
    var element = document.getElementById("progress");
    element.innerHTML=`Question ${quiz.questionIndex+1} of ${quiz.questions.length}`;
}

function showScores(){
    let quizOverHTML =  `<h1> Result</h1> <h2> Your score : ${quiz.score} & percentage is ${quiz.score*100/quiz.questions.length} %</h2>`;
    document.getElementById("quiz").innerHTML=quizOverHTML;
}


let questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
  ];

let quiz = new Quiz(questions);
loadQuestions();