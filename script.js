const quizData = [
    {
        question: "What is the largest planet in our solar system?",
        a: "Earth",
        b: "Jupiter",
        c: "Saturn",
        d: "Mars",
        correct: "b",
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        a: "William Shakespeare",
        b: "Charles Dickens",
        c: "Mark Twain",
        d: "Leo Tolstoy",
        correct: "a",
    },
    {
        question: "What is the boiling point of water at sea level?",
        a: "90°C",
        b: "100°C",
        c: "110°C",
        d: "120°C",
        correct: "b",
    },
    {
        question: "Which is the smallest prime number?",
        a: "1",
        b: "2",
        c: "3",
        d: "5",
        correct: "b",
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        a: "Gold",
        b: "Oxygen",
        c: "Hydrogen",
        d: "Carbon",
        correct: "b",
    },
    {
        question: "Who painted the Mona Lisa?",
        a: "Vincent van Gogh",
        b: "Leonardo da Vinci",
        c: "Pablo Picasso",
        d: "Claude Monet",
        correct: "b",
    },
    {
        question: "What is the main ingredient in guacamole?",
        a: "Tomato",
        b: "Avocado",
        c: "Cucumber",
        d: "Lettuce",
        correct: "b",
    },
    {
        question: "Which planet is known as the Red Planet?",
        a: "Venus",
        b: "Mars",
        c: "Saturn",
        d: "Neptune",
        correct: "b",
    },
    {
        question: "What is the square root of 64?",
        a: "6",
        b: "7",
        c: "8",
        d: "9",
        correct: "c",
    },
    {
        question: "Which gas do plants absorb during photosynthesis?",
        a: "Oxygen",
        b: "Nitrogen",
        c: "Carbon Dioxide",
        d: "Hydrogen",
        correct: "c",
    },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = Array(quizData.length).fill(null);

const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const submitButton = document.getElementById('submit-button');
const scoreDisplay = document.getElementById('score');

// Load the current question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <label><input type="radio" name="answer" value="a" ${selectedAnswers[currentQuestionIndex] === 'a' ? 'checked' : ''}>${currentQuestion.a}</label><br>
        <label><input type="radio" name="answer" value="b" ${selectedAnswers[currentQuestionIndex] === 'b' ? 'checked' : ''}>${currentQuestion.b}</label><br>
        <label><input type="radio" name="answer" value="c" ${selectedAnswers[currentQuestionIndex] === 'c' ? 'checked' : ''}>${currentQuestion.c}</label><br>
        <label><input type="radio" name="answer" value="d" ${selectedAnswers[currentQuestionIndex] === 'd' ? 'checked' : ''}>${currentQuestion.d}</label>
    `;
    
    // Show/Hide buttons based on question index
    prevButton.classList.toggle('hidden', currentQuestionIndex === 0);
    nextButton.classList.toggle('hidden', currentQuestionIndex === quizData.length - 1);
    submitButton.classList.toggle('hidden', currentQuestionIndex !== quizData.length - 1);
}

// Check the answer for the current question and move to the next
function checkAnswer() {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer;
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            selectedAnswer = answerEl.value;
        }
    });

    // Save selected answer
    selectedAnswers[currentQuestionIndex] = selectedAnswer;

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        submitButton.classList.remove('hidden');
        nextButton.classList.add('hidden');
        prevButton.classList.add('hidden');
    }
}

// Navigate to the previous question
function prevQuestion() {
    currentQuestionIndex--;
    loadQuestion();
}

// Submit the quiz and show the score
function submitQuiz() {
    selectedAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });
    showScore();
}

// Display the score and hide quiz content
function showScore() {
    quizContainer.classList.add('hidden');
    scoreDisplay.classList.remove('hidden');
    scoreDisplay.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

// Event Listeners
nextButton.addEventListener('click', checkAnswer);
prevButton.addEventListener('click', prevQuestion);
submitButton.addEventListener('click', submitQuiz);

// Load the first question
loadQuestion();
