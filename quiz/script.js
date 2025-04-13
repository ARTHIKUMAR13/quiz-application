const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const questionText = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const resultBox = document.getElementById("result-box");
const finalScore = document.getElementById("final-score");
const progress = document.getElementById("progress");
const timerDisplay = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questions = [
  {
    question: "What does CSS stand for?",
    answers: [
      "Creative Style System",
      "Cascading Style Sheets",
      "Computer Style Sheet",
      "Colorful Style Sheet"
    ],
    correct: 1
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Netscape", "Microsoft", "Google", "Oracle"],
    correct: 0
  },
  {
    question: "What keyword declares a variable in JavaScript?",
    answers: ["int", "var", "string", "dim"],
    correct: 1
  },
  {
    question: "What is the correct syntax to link a CSS file?",
    answers: [
      "<css src='style.css'>",
      "<link rel='stylesheet' href='style.css'>",
      "<style src='style.css'>",
      "<script src='style.css'>"
    ],
    correct: 1
  },
  {
    question: "Inside which tag is JavaScript written?",
    answers: ["<javascript>", "<js>", "<script>", "<code>"],
    correct: 2
  }
];

startBtn.addEventListener("click", () => {
  document.getElementById("start-screen").classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
  startTimer();
});

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  startTimer();

  const q = questions[currentQuestionIndex];
  questionText.textContent = q.question;
  progress.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
  answerButtons.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.classList.add("btn");
    btn.onclick = () => selectAnswer(index);
    answerButtons.appendChild(btn);
  });
}

function selectAnswer(index) {
  const correct = questions[currentQuestionIndex].correct;
  if (index === correct) score++;

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  const percentage = Math.round((score / questions.length) * 100);
  finalScore.textContent = `Your Score: ${percentage}% (${score} out of ${questions.length})`;
}

function startTimer() {
  timerDisplay.textContent = `${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1); // skip question
    }
  }, 1000);
}
