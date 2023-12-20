const questions = [
  {
    question: 'Mùa noel này em bé thi có nhiều hem?',
    answers: [
      { text: 'Cũng thường thường', correct: true },
      { text: 'dsfbjhdsbfhjd (đang học bài)', correct: true },
      { text: 'Ok', correct: true },
      { text: 'Cũng chill mình đi chơi hem', correct: true },
    ],
  },
  {
    question: 'Ông già Noel tên thật là gì?',
    answers: [
      { text: 'Cristiano Ronaldo', correct: false },
      { text: 'Santa Claus', correct: true },
      { text: 'Santa Nicolas', correct: false },
      { text: 'Ronaldinho', correct: false },
    ],
  },
  {
    question: 'Ngày lễ chính thức của Giáng sinh là vào ngày nào naf?',
    answers: [
      { text: '23/12', correct: false },
      { text: '24/12', correct: false },
      { text: '25/12', correct: true },
      { text: 'Hem pik', correct: false },
    ],
  },
  {
    question: 'Đồ vật nào khiến em bé nghĩ đến mùa noel?',
    answers: [
      { text: 'Bánh quy', correct: true },
      { text: 'Khăn choàng', correct: true },
      { text: 'Tất / khăn tay noel', correct: true },
      { text: 'Hộp nhạc', correct: true },
    ],
  },
  {
    question: 'Người ta thường treo vật gì sau đây ở trên đỉnh của cây thông Noel?',
    answers: [
      { text: 'Chim cánh cụt', correct: false },
      { text: 'Cái chuông', correct: false },
      { text: 'Ngôi sao', correct: true },
      { text: 'Quả bóng', correct: false },
    ],
  },
  {
    question: 'Các món quà tặng của ông già Noel thường được để ở đâu?',
    answers: [
      { text: 'Trong xe tuần lộc', correct: false },
      { text: 'Trong chiếc tất', correct: true },
      { text: 'Trong cái nón hình củ carot', correct: false },
      { text: 'Trong áo', correct: false },
    ],
  },
  {
    question: 'Nghĩ đến mùa giáng sinh, em bé cảm thấy thích thú với trải nghiệm nào sau đây nhất?',
    answers: [
      { text: 'Nhâm nhi 1 món ăn nhẹ ngon lành', correct: true },
      { text: 'Có 1 chiếc tất để thu hút hi vọng và may mắn (or quà ông già noel', correct: true },
      { text: 'Chill chill cùng 1 mùi hương ấm áp', correct: true },
      { text: 'Ngắm nhìn thứ gì đó bé bé xinh xinh', correct: true },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const quizEl = document.querySelector('.quiz');

let curQuestionIdx = 0;
let score = 0;
let selectedAnswers = [];

function startQuiz() {
  curQuestionIdx = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let curQuestion = questions[curQuestionIdx];
  let questionNo = curQuestionIdx + 1;

  questionElement.innerHTML = questionNo + '. ' + curQuestion.question;

  curQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const selectedAnswerText = selectedBtn.innerText;

  const isCorrect = selectedBtn.dataset.correct === 'true';

  const selectedAnswer = {
    questionIndex: curQuestionIdx + 1,
    answerText: selectedAnswerText,
    isCorrect: isCorrect,
  };

  selectedAnswers.push(selectedAnswer);

  console.log(selectedAnswers);

  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  nextButton.style.display = 'block';
}

// function showScore() {
//   resetState();
//   questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
//   nextButton.innerHTML = 'Play Again';
//   nextButton.style.display = 'block';
// }

function showScore() {
  resetState();
  questionElement.innerHTML = `
  Love you my Princess ♥️ Merry Christmas!
    Because of you, my Christmas season becomes happy and meaningful. You are my world! I love you!`;
  nextButton.innerHTML = 'Answer Again';
  questionElement.style.fontSize = '12px';
  nextButton.style.display = 'block';

  const answeredQuestionsElement = document.createElement('div');
  answeredQuestionsElement.classList.add('answered-questions');

  const header = document.createElement('h2');
  header.innerText = 'Các câu hỏi đã trả lời:';

  answeredQuestionsElement.appendChild(header);

  selectedAnswers.forEach(answer => {
    const paragraph = document.createElement('p');
    paragraph.innerText = `Câu hỏi ${answer.questionIndex}: '${answer.answerText}' `;
    answeredQuestionsElement.appendChild(paragraph);
  });

  answeredQuestionsElement.classList.add('answered-question');

  quizEl.appendChild(answeredQuestionsElement);
}

function handleNextButton() {
  curQuestionIdx++;
  if (curQuestionIdx < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (curQuestionIdx < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
