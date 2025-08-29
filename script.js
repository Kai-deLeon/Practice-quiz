// Quiz questions and answers (no randomness)

const questions = [
    {
        q: "What is the slope of the line shown?",
        a: "Positive",
        type: "graph",
        choices: ["Positive", "Negative", "Zero", "Undefined"]
    },
    {
        q: "Given the equation y = 2x + 3, the point (4, 11) is on the line. True or False?",
        a: "True",
        type: "truefalse",
        choices: ["True", "False"]
    },
    {
        q: "What is the slope of the line passing through the points (2, 3) and (4, 7)?",
        a: "2",
        type: "short",
    },
    {
        q: "Which of the following is the y-intercept of the line y = -3x + 5?",
        a: "5",
        type: "multiple",
        choices: ["-3", "0", "5", "-5"]
    },
    {
        q: "True or False: The lines y = 2x + 1 and y = 2x - 4 are parallel.",
        a: "True",
        type: "truefalse",
        choices: ["True", "False"]
    },
    {
        q: "Write the equation of a line with slope -1 and y-intercept 4.",
        a: "y = -1x + 4",
        type: "short",
    },
    {
        q: "What is the x-intercept of the line y = 4x - 8?",
        a: "2",
        type: "short",
    },
    {
        q: "Is the line y = -x + 2 increasing, decreasing, or constant?",
        a: "Decreasing",
        type: "multiple",
        choices: ["Increasing", "Decreasing", "Constant", "Undefined"]
    },
    {
        q: "Find the value of k so that the point (k, 7) lies on the line y = 2x + 3.",
        a: "2",
        type: "short",
    },
    {
        q: "Which line has an undefined slope?",
        a: "x = 5",
        type: "multiple",
        choices: ["y = 0", "x = 5", "y = 2x", "y = -3x + 1"]
    },
    {
        q: "True or False: The line y = 4x passes through the origin.",
        a: "True",
        type: "truefalse",
        choices: ["True", "False"]
    },
    {
        q: "Find the equation of the line passing through (1, 2) and (3, 6).",
        a: "y = 2x",
        type: "short",
    },
    {
        q: "True or False: The lines y = x + 2 and y = x - 5 are parallel.",
        a: "True",
        type: "truefalse",
        choices: ["True", "False"]
    },
    {
        q: "What is the slope of the line passing through the points (3, 2) and (7, 10)?",
        a: "2",
        type: "short"
    },
    {
        q: "True or False: The line x = 7 is vertical.",
        a: "True",
        type: "truefalse",
        choices: ["True", "False"]
    }
];

let current = 0;
let userAnswers = [];







function showQuestion(idx) {
    // Update progress
    const progressDiv = document.getElementById('progress');
    progressDiv.textContent = `Question ${idx + 1} of ${questions.length}`;

    const quizDiv = document.getElementById('quiz');
    const q = questions[idx];
    let html = `<div class="question">${q.q}</div>`;
    if (q.type === "graph" || q.type === "truefalse" || q.type === "multiple") {
        // For question 1, add a vertical style to choices
        const verticalStyle = (idx === 0 && q.type === "graph") ? ' style="display:flex;flex-direction:column;gap:8px;"' : '';
        html += `<div id="choices"${verticalStyle}>`;
        if (q.type === "graph") {
            html = `<div class="question">${q.q}</div>`;
            html += `<canvas id="graphCanvas" width="300" height="200" style="border:1px solid #ccc;margin-bottom:16px;"></canvas>`;
            html += `<div id="choices"${verticalStyle}>`;
        }
        q.choices.forEach(choice => {
            html += `<label><input type="radio" name="answer" value="${choice}"> ${choice}</label>`;
        });
        html += `</div>`;
    } else {
        html += `<input type="text" id="answer" class="answer-input" autocomplete="off" />`;
    }
    quizDiv.innerHTML = html;
    if (q.type === "graph") {
        drawLineGraph();
    } else if (q.type !== "truefalse" && q.type !== "multiple") {
        document.getElementById('answer').focus();
    }

    // Add event listeners to radio buttons to clear warning on selection
    if (q.type === "graph" || q.type === "truefalse" || q.type === "multiple") {
        const radios = document.getElementsByName('answer');
        for (const radio of radios) {
            radio.onclick = clearWarning;
        }
    }
}

function drawLineGraph() {
    const canvas = document.getElementById('graphCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw axes
    ctx.strokeStyle = '#888';
    ctx.beginPath();
    ctx.moveTo(30, 170); ctx.lineTo(270, 170); // x-axis
    ctx.moveTo(30, 170); ctx.lineTo(30, 30);   // y-axis
    ctx.stroke();
    // Draw positive slope line
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 150); ctx.lineTo(250, 50);
    ctx.stroke();
}




function nextQuestion() {
    let answer;
    const q = questions[current];
    let valid = true;
    if (q.type === "graph" || q.type === "truefalse" || q.type === "multiple") {
        const radios = document.getElementsByName('answer');
        for (const radio of radios) {
            if (radio.checked) answer = radio.value;
        }
        if (!answer) valid = false;
    } else {
        answer = document.getElementById('answer').value;
        if (!answer.trim()) valid = false;
    }
    if (!valid) {
        showWarning('Please select or enter an answer before continuing.');
        return;
    }
    clearWarning();
    userAnswers[current] = answer;
    current++;
    if (current < questions.length) {
        showQuestion(current);
        if (current === questions.length - 1) {
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('submitBtn').style.display = 'inline-block';
        }
    }
}

function showWarning(msg) {
    let warn = document.getElementById('warnMsg');
    if (!warn) {
        warn = document.createElement('div');
        warn.id = 'warnMsg';
        warn.style.color = 'red';
        warn.style.marginBottom = '10px';
        document.querySelector('.container').insertBefore(warn, document.getElementById('progress'));
    }
    warn.textContent = msg;
}

function clearWarning() {
    const warn = document.getElementById('warnMsg');
    if (warn) warn.textContent = '';
}



function gradeQuiz() {
    const resultsDiv = document.getElementById('results');
    let score = 0;
    let output = '<h3>Results</h3><ol>';
    questions.forEach((q, i) => {
        let correct = q.a.trim().toLowerCase();
        let user = (userAnswers[i] || '').trim().toLowerCase();
        let isCorrect;
        if (q.type === 'short') {
            // Remove all spaces for comparison
            correct = correct.replace(/\s+/g, '');
            user = user.replace(/\s+/g, '');
        }
        isCorrect = correct === user;
        if (isCorrect) score++;
        output += `<li>${q.q}<br>Correct answer: <b>${q.a}</b><br>Your answer: <b>${userAnswers[i] || ''}</b> <span style=\"color:${isCorrect?'green':'red'};\">${isCorrect?'✔️':'❌'}</span></li>`;
    });
    output += `</ol><p>Your score: <b>${score} / ${questions.length}</b></p>`;
    resultsDiv.innerHTML = output;
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('progress').style.display = 'none';
}

document.getElementById('nextBtn').onclick = nextQuestion;
document.getElementById('submitBtn').onclick = function() {
    // Save answer for last question before grading
    let answer;
    const q = questions[current];
    let valid = true;
    if (q.type === "graph" || q.type === "truefalse" || q.type === "multiple") {
        const radios = document.getElementsByName('answer');
        for (const radio of radios) {
            if (radio.checked) answer = radio.value;
        }
        if (!answer) valid = false;
    } else {
        answer = document.getElementById('answer').value;
        if (!answer.trim()) valid = false;
    }
    if (!valid) {
        showWarning('Please select or enter an answer before submitting.');
        return;
    }
    clearWarning();
    userAnswers[current] = answer;
    gradeQuiz();
};

// Initialize first question
showQuestion(0);
