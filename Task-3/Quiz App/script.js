
const quizData = [
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        options: [
            "&lt;script src=\"script.js\"&gt;&lt;/script&gt;",
            "&lt;script href=\"script.js\"&gt;&lt;/script&gt;",
            "&lt;script name=\"script.js\"&gt;&lt;/script&gt;",
            "&lt;script file=\"script.js\"&gt;&lt;/script&gt;"
        ],
        correct: 0
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: [
            "alertBox(\"Hello World\");",
            "msg(\"Hello World\");",
            "alert(\"Hello World\");",
            "msgBox(\"Hello World\");"
        ],
        correct: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            "function = myFunction()",
            "function:myFunction()",
            "function myFunction()",
            "create myFunction()"
        ],
        correct: 2
    },
    {
        question: "How to write an IF statement in JavaScript?",
        options: [
            "if i = 5 then",
            "if (i == 5)",
            "if i == 5 then",
            "if i = 5"
        ],
        correct: 1
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: [
            "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")",
            "var colors = [\"red\", \"green\", \"blue\"]",
            "var colors = \"red\", \"green\", \"blue\"",
            "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizData.length).fill(null);

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const resultElement = document.querySelector('.result');
const progressElement = document.querySelector('.progress');

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerHTML = currentQuizData.question;
    optionsElement.innerHTML = '';

    progressElement.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerHTML = option;

        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }

        optionElement.addEventListener('click', () => {
            selectOption(optionElement, index);
        });

        optionsElement.appendChild(optionElement);
    });

    nextButton.style.display = currentQuestion < quizData.length - 1 ? 'inline-block' : 'none';
    submitButton.style.display = currentQuestion === quizData.length - 1 ? 'inline-block' : 'none';
}

function selectOption(optionElement, optionIndex) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));

    optionElement.classList.add('selected');
    userAnswers[currentQuestion] = optionIndex;
}

function showResult() {
    score = 0;
    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });

    resultElement.style.display = 'block';
    resultElement.style.backgroundColor = score >= quizData.length / 2 ? '#dff0d8' : '#f2dede';
    resultElement.innerHTML = `You scored ${score} out of ${quizData.length}!<br>${getResultMessage(score)}`;

    // Show correct answers
    quizData.forEach((question, qIndex) => {
        const options = document.querySelectorAll(`.question:nth-child(${qIndex + 1}) + .options .option`);
        if (options.length) {
            options[question.correct].classList.add('correct');
            if (userAnswers[qIndex] !== null && userAnswers[qIndex] !== question.correct) {
                options[userAnswers[qIndex]].classList.add('incorrect');
            }
        }
    });
}

function getResultMessage(score) {
    const percentage = score / quizData.length;
    if (percentage >= 0.8) return "Excellent! You know JavaScript well!";
    if (percentage >= 0.6) return "Good job! You have a solid understanding.";
    if (percentage >= 0.4) return "Not bad! Keep learning!";
    return "Keep practicing! You'll get better!";
}

nextButton.addEventListener('click', () => {
    if (userAnswers[currentQuestion] !== null) {
        currentQuestion++;
        loadQuestion();
    } else {
        alert('Please select an option before proceeding.');
    }
});

submitButton.addEventListener('click', () => {
    showResult();
    submitButton.disabled = true;
});

// Initialize the quiz
loadQuestion();
