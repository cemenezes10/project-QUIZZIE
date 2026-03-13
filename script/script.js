
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "London", "Paris", "Madrid"],
        answer: 2
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: 3
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const q = questions[currentQuestion];
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '/homepage/index.html';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.className = 'option-btn';
        btn.onclick = () => selectAnswer(idx);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(selected) {
    if (selected === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const quizEl = document.getElementById('quiz');
    quizEl.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
}


window.onload = function() {
    showQuestion();
};