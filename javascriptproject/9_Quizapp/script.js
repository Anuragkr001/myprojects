const questions=[
    {
        question:"Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct:false},
            {text: "Blue Whale", correct:true},
            {text: "Elephant", correct:false},
            {text: "Giraffe", correct:false},
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct:true},
            {text: "Bhutan", correct:false},
            {text: "Nepal", correct:false},
            {text: "Sri Lanka", correct:false},
        ]

    },
    {
        question:"Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct:false},
            {text: "Gobi", correct:false},
            {text: "Sahara", correct:false},
            {text: "Antarctica", correct:true},
        ]

    },
    {
        question:"Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct:false},
            {text: "Australia", correct:true},
            {text: "Arctic", correct:false},
            {text: "Africa", correct:false},
        ]

    }
];

const questionelement=document.getElementById("question");
const answerbuttons=document.getElementById("answer-button");
const nextbutton=document.getElementById("next-btn");

let currentquestionindex=0;
let score =0;
function startQuiz(){
    currentquestionindex=0;
    score=0;
    nextbutton.innerHTML="Next";
    showquestion();
}

function showquestion(){
    resetState();
    let currentquestion=questions[currentquestionindex];
    let questionNo=currentquestionindex+1;
    questionelement.innerHTML=questionNo + ". "+currentquestion.question;

    currentquestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextbutton.style.display="none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}
 function selectAnswer(e){
        const selectedbtn=e.target;
        const iscorrect=selectedbtn.dataset.correct==="true";
        if(iscorrect){
            selectedbtn.classList.add("correct");
            score++;
        }else{
            selectedbtn.classList.add("incorrect");
        }
        Array.from(answerbuttons.children).forEach(button =>{
            if(button.dataset.correct==="true"){
                button.classList.add("correct");
            }
            button.disabled=true;
        });

        nextbutton.style.display="block";

 }

 function showscore(){
    resetState();
    questionelement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextbutton.innerHTML="Play Again";
    nextbutton.style.display="block";
 }

 function handlenextbtn(){
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        showquestion();
    }else{
        showscore();
    }
 }



  nextbutton.addEventListener("click", ()=>{
       if(currentquestionindex<questions.length){
         handlenextbtn();
       }else{
        startQuiz();
       }
  });

startQuiz();