document.addEventListener("DOMContentLoaded", function () {

  const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "Who wrote Romeo and Juliet?",
      options: ["Shakespeare", "Dickens", "Tolstoy", "Homer"],
      answer: "Shakespeare"
    }
  ];

  const quiz = document.getElementById("quiz");
  const result = document.getElementById("result");
  const submitBtn = document.getElementById("submit");
  const retryBtn = document.getElementById("retry");
  const showAnswerBtn = document.getElementById("showAnswer");

  let currentQuestion = 0;
  let score = 0;
  let wrongAnswers = [];

  function loadQuestion() {
    const q = quizData[currentQuestion];

    quiz.innerHTML = `
      <div class="question">${currentQuestion + 1}. ${q.question}</div>
      <div class="options">
        ${q.options.map(opt =>
          `<label class="option">
            <input type="radio" name="quiz" value="${opt}"> ${opt}
          </label>`
        ).join("")}
      </div>
    `;
  }

  function checkAnswer() {
    const selected = document.querySelector('input[name="quiz"]:checked');

    if (!selected) return;

    if (selected.value === quizData[currentQuestion].answer) {
      score++;
    } else {
      wrongAnswers.push({
        question: quizData[currentQuestion].question,
        your: selected.value,
        correct: quizData[currentQuestion].answer
      });
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    quiz.style.display = "none";
    submitBtn.style.display = "none";
    retryBtn.classList.remove("hide");
    showAnswerBtn.classList.remove("hide");

    result.innerHTML = `You scored ${score} out of ${quizData.length}`;
  }

  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    wrongAnswers = [];

    quiz.style.display = "block";
    submitBtn.style.display = "inline-block";
    retryBtn.classList.add("hide");
    showAnswerBtn.classList.add("hide");
    result.innerHTML = "";

    loadQuestion();
  }

  function showAnswers() {
    quiz.style.display = "none";
    showAnswerBtn.classList.add("hide");

    let html = `<h3>Correct Answers</h3>`;

    wrongAnswers.forEach(item => {
      html += `
        <p>
          <strong>Question:</strong> ${item.question}<br>
          <strong>Your Answer:</strong> ${item.your}<br>
          <strong>Correct Answer:</strong> ${item.correct}
        </p>
      `;
    });

    result.innerHTML = html;
  }

  submitBtn.addEventListener("click", checkAnswer);
  retryBtn.addEventListener("click", retryQuiz);
  showAnswerBtn.addEventListener("click", showAnswers);

  loadQuestion();
});
