("Buttons_Navigation")
const NextButton=document.getElementById("NextButton");
const PreviousButton=document.getElementById("PreviousButton");

("Quiz_Question")
const QuizQuestion=document.getElementById("Question");

("Quiz_Answers")
const FirstAns=document.getElementById("First_Answer");
const SecondAns=document.getElementById("Second_Answer");
const ThirdAns=document.getElementById("Third_Answer");
const FourthAns=document.getElementById("Fourth_Answer");
const FifthAns=document.getElementById("Fifth_Answer");
const SixthdAns=document.getElementById("Sixth_Answer");
const SeventhAns=document.getElementById("Seventh_Answer");
const EigthAns=document.getElementById("Eigth_Answer");

("Slides")
const FirstSlide=document.getElementById("Navigation_Button1");
const SecondSlide=document.getElementById("Navigation_Button2");
const ThirdSlide=document.getElementById("Navigation_Button3");
const FourthSlide=document.getElementById("Navigation_Button4");

("QuestionCounter")
let curQuestion;

("DataToWorkWith")
const Answers = 
[
  {answer: FirstAns, numberOfQuestion : 1},{answer: SecondAns, numberOfQuestion : 2},
  {answer: ThirdAns, numberOfQuestion : 3},{answer: FourthAns, numberOfQuestion : 4},
  {answer: FifthAns, numberOfQuestion : 5},{answer: SixthdAns, numberOfQuestion : 6},
  {answer: SeventhAns, numberOfQuestion : 7},{answer: EigthAns, numberOfQuestion : 8}
];

const AnsweredQuestion = 
[
  { checked :[false,false,false,false,false,false,false,false],allowedAnsweres : 3, answered:0},
  { checked :[false,false,false,false,false,false,false,false],allowedAnsweres : 4, answered:0},
  { checked :[false,false,false,false,false,false,false,false],allowedAnsweres : 5, answered:0},
  { checked :[false,false,false,false,false,false,false,false],allowedAnsweres : 6, answered:0},
]

const Slides = [FirstSlide,SecondSlide,ThirdSlide,FourthSlide];

const Questions=
[
  {
    question : "Pitanje 1"
  },
  {
    question : "Pitanje 2"
  },
  {
    question : "Pitanje 3"
  },
  {
    question : "Pitanje 4"
  }
]

let AnswersEachSlide = [];

("Events")
NextButton.addEventListener("click",()=>IncrementOrDecrementQuestion("+"));
PreviousButton.addEventListener("click",()=>IncrementOrDecrementQuestion("-"));

("UseEffect_WannaBe")
window.onload = function() {
  curQuestion=1;
  possibleAnswers=2+curQuestion;
  addEventClickToAnswers();
  ReturnRandomNumOfAns();
  QuizQuestion.innerText=Questions[curQuestion-1].question;
};


function addEventClickToAnswers()
{
  Answers.forEach(answer => {
    answer.answer.addEventListener("click",()=>setActiveButton(answer));
  });
}

function setActiveButton(button)
{
  if(AnsweredQuestion[curQuestion-1].checked[button.numberOfQuestion]==false)
  {
    if(AnsweredQuestion[curQuestion-1].allowedAnsweres<=AnsweredQuestion[curQuestion-1].answered)
      window.alert("nope");
    else
    {
      AnsweredQuestion[curQuestion-1].answered++;
      AnsweredQuestion[curQuestion-1].checked[button.numberOfQuestion]=true;
      button.answer.style.backgroundColor="rgb(255, 145, 0)";
      console.log(AnsweredQuestion[curQuestion-1].answered);
    }
  }
  else
  {
    AnsweredQuestion[curQuestion-1].checked[button.numberOfQuestion]=false;
    button.answer.style.backgroundColor="black";
  }
  
}

function IncrementOrDecrementQuestion(operation)
{
  switch(operation)
  {
    case "+" :
      curQuestion++;
    break;

    case "-":
      curQuestion--;
    break;
  }
  QuizQuestion.innerText=Questions[curQuestion-1].question;
  MapAnswers();
  possibleAnswers=2+curQuestion;
}

function ReturnRandomNumOfAns()
{
  Slides.forEach(slide => {  
    NumOfAns=Math.floor(Math.random() * (8-2) + 2);
    AnswersEachSlide.push(NumOfAns);
  });
  MapAnswers();
}

function MapAnswers()
{
  for(let i = AnswersEachSlide[curQuestion-1]; i<Answers.length; i++)
  {
     Answers[i].answer.style.display="none";

     for(let k = 0; k<AnswersEachSlide[curQuestion-1]; k++)
     {
       Answers[k].answer.style.display="block";         
     }
  }

  Answers.forEach((answer)=>
  {
    if(AnsweredQuestion[curQuestion-1].checked[answer.numberOfQuestion]==true)
    {
      answer.answer.style.backgroundColor="rgb(255, 145, 0)";
    }
    else
    {
      answer.answer.style.backgroundColor="black";
    }
  })
  
}

 