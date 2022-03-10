("Buttons_Navigation")
const NextButton=document.getElementById("NextButton");
const PreviousButton=document.getElementById("PreviousButton");
const ShowMore=document.getElementById("ShowMore");

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

("AlertMsg")
const alertContainer=document.getElementById("alertMsg_Container");
const alertMsg=document.getElementById("alertMsg");

("QuestionCounter")
let curQuestion;
let allAreAnswered=false;

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
  { checked :[false,false,false,false,false,false,false,false],allowedAnsweres : 3, answered: 0},
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
  alertContainer.style.display="none";
  curQuestion=1;
  CheckForCurQuestion();
  addEventClickToAnswers();
  ReturnRandomNumOfAns();
  QuizQuestion.innerText=Questions[curQuestion-1].question;
};

function ShowAlertMsg(msg)
{
  alertMsg.innerText=msg;

  alertContainer.style.display="flex";

  setTimeout(()=>{alertContainer.style.display="none"},3000);
}
function addEventClickToAnswers()
{
  Answers.forEach(answer => {
    answer.answer.addEventListener("click",()=>setActiveButton(answer));
  });

  Slides.forEach(slide => {
    slide.addEventListener("click",()=>ActivateSlide(slide));
  })
}

function ActivateSlide(slide)
{
  curQuestion=slide.innerText;
  QuizQuestion.innerText=Questions[curQuestion-1].question;
  MapAnswers();
  CheckForCurQuestion();

  if(AnsweredQuestion.every(answer=>answer.answered >= 1))
      ShowMore.disabled=false;
  else
      ShowMore.disabled=true;
}

function CheckForCurQuestion()
{
  if(curQuestion==1)
    PreviousButton.style.display="none";
  else
    PreviousButton.style.display="block";

  if(curQuestion==4)
  {
    NextButton.style.display="none";
    ShowMore.style.display="inline-block";
  }  
  else
  {
    NextButton.style.display="flex";
    ShowMore.style.display="none";
  }
    
}

function setActiveButton(button)
{
  if(AnsweredQuestion[curQuestion-1].checked[button.numberOfQuestion]==false)
  {
    if(AnsweredQuestion[curQuestion-1].allowedAnsweres<=AnsweredQuestion[curQuestion-1].answered)
      ShowAlertMsg("Limit for answers is" + " " + (curQuestion+2) + " " + "answers");
    else
    {
      AnsweredQuestion[curQuestion-1].answered+=1;
      AnsweredQuestion[curQuestion-1].checked[button.numberOfQuestion]=true;
      button.answer.style.backgroundColor="rgb(255, 145, 0)";
    }

    if(AnsweredQuestion.every(answer=>answer.answered >= 1))
      ShowMore.disabled=false;
    else
      ShowMore.disabled=true;
      
  }
  
  else
  {
    AnsweredQuestion[curQuestion-1].answered-=1;
    AnsweredQuestion[curQuestion-1].checked[button.numberOfQuestion]=false;
    button.answer.style.backgroundColor="black";

    if(AnsweredQuestion.every(answer=>answer.answered >= 1))
      ShowMore.disabled=false;
    else
      ShowMore.disabled=true;
  }

  if(AnsweredQuestion[curQuestion-1].answered>=1)
    Slides[curQuestion-1].style.backgroundColor="rgb(255, 145, 0)";
  else
    Slides[curQuestion-1].style.backgroundColor="black";
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
  CheckForCurQuestion();

  if(AnsweredQuestion.every(answer=>answer.answered >= 1))
      ShowMore.disabled=false;
  else
      ShowMore.disabled=true;
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

 