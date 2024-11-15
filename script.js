let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timerInterval;

const questionContainer = document.getElementById("question-container");
const feedbackContainer = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const timer = document.getElementById("timer");
const scoreCorrect = document.querySelector(".correct");
const scoreIncorrect = document.querySelector(".incorrect");

function startTimer(duration) {
  let timeRemaining = duration;
  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timer.textContent = `Verbleibende Zeit: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (--timeRemaining < 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  const question = questions[currentQuestionIndex];
  feedbackContainer.textContent = "";
  questionContainer.innerHTML = `
    <h2>${question.question}</h2>
    ${question.choices.map((choice, index) => `
      <div>
        <input type="radio" id="choice${index}" name="answer" value="${choice[0]}">
        <label for="choice${index}">${choice}</label>
      </div>
    `).join('')}
  `;
  nextButton.disabled = true; // Disable "Weiter" button until an answer is selected
}

function checkAnswerAndProceed() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Bitte wähle eine Antwort aus!");
    return;
  }

  const question = questions[currentQuestionIndex];
  if (selected.value === question.correctAnswer) {
    correctAnswers++;
    feedbackContainer.textContent = "Richtig!";
    feedbackContainer.style.color = "green";
  } else {
    incorrectAnswers++;
    feedbackContainer.textContent = "Falsch!";
    feedbackContainer.style.color = "red";
  }

  scoreCorrect.textContent = `Richtige Antworten: ${correctAnswers}`;
  scoreIncorrect.textContent = `Falsche Antworten: ${incorrectAnswers}`;

  currentQuestionIndex++;
  setTimeout(loadQuestion, 1000); // Wait 1 second before loading the next question
}

function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.innerHTML = `<h2>Quiz beendet!</h2>`;
  feedbackContainer.innerHTML = `Du hast ${correctAnswers} von ${questions.length} Fragen richtig beantwortet.`;
  nextButton.style.display = "none";
}

nextButton.addEventListener("click", checkAnswerAndProceed);

questionContainer.addEventListener("change", () => {
  nextButton.disabled = false; // Enable "Weiter" button when an answer is selected
});

loadQuestion();
startTimer(60 * 60);
