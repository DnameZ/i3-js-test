
const StartQuizButton=document.getElementById("start-button");
const linkToHomePage="../Pages/QuizPage.html";

StartQuizButton.addEventListener("click",()=>StartQuiz(linkToHomePage))

const StartQuiz=(link)=>
{
  location.href=`${link}`;
}
