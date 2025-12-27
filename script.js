let ANIMATION_DURATION = 8000;
let headerColors = [
    { pct: 0, color: "#000000" },
    { pct: 25, color: "#37377f" },
    { pct: 50, color: "#377f37" },
    { pct: 75, color: "#7f3737" },
    { pct: 100, color: "#000000" }
];
let navColors = [
    { pct: 0, color: "#000000" },
    { pct: 25, color: "#7f3737" },
    { pct: 50, color: "#377f37" },
    { pct: 75, color: "#37377f" },
    { pct: 100, color: "#000000" },
];
let footerColors = [
    { pct: 0, color: "#377f37" },
    { pct: 25, color: "#7f3737" },
    { pct: 50, color: "#000000" },
    { pct: 75, color: "#37377f" },
    { pct: 100, color: "#377f37" },
];
function interpolateColor(colors, pct) {
    let i = 1;
    while (i < colors.length && pct > colors[i].pct) i++;
    let prev = colors[i - 1];
    let next = colors[i];
    let range = next.pct - prev.pct;
    let rangePct = (pct - prev.pct) / range;
    let hex = function (a, b) { return Math.round(a + (b - a) * rangePct); };
    let c1 = prev.color.match(/\w\w/g).map(function (x) { return parseInt(x, 16); });
    let c2 = next.color.match(/\w\w/g).map(function (x) { return parseInt(x, 16); });
    return "#".concat(hex(c1[0], c2[0]).toString(16).padStart(2, "0")).concat(hex(c1[1], c2[1]).toString(16).padStart(2, "0")).concat(hex(c1[2], c2[2]).toString(16).padStart(2, "0"));
}
let startTime = Date.now();
const rawOffset = localStorage.getItem("colorAnimOffset");
const savedOffset = isNaN(parseInt(rawOffset, 10)) ? 0 : parseInt(rawOffset, 10);
window.addEventListener("beforeunload", () => {
    const currentElapsed = (Date.now() - startTime + savedOffset) % ANIMATION_DURATION;
    localStorage.setItem("colorAnimOffset", currentElapsed);
});
function animateColors() {
    let now = Date.now();
    let elapsed = (now - startTime + savedOffset) % ANIMATION_DURATION;
    let pct = (elapsed / ANIMATION_DURATION) * 100;
    let header = document.querySelector("header");
    if (header)
        header.style.backgroundColor = interpolateColor(headerColors, pct);
    document.querySelectorAll("nav a").forEach(function (a) { return a.style.backgroundColor = interpolateColor(navColors, pct); });
    let footer = document.querySelector("footer");
    if (footer)
        footer.style.backgroundColor = interpolateColor(footerColors, pct);
    requestAnimationFrame(animateColors);
}
animateColors();
window.addEventListener("beforeunload", function () {
    let now = Date.now();
    let elapsed = (now - startTime + savedOffset) % ANIMATION_DURATION;
    localStorage.setItem("colorAnimOffset", elapsed);
});
const answerValues = {
  "strongly-agree": 2,
  "agree": 1,
  "unsure": 0,
  "disagree": -1,
  "strongly-disagree": -2
};
const questionAxis = {
    q1: {x:-1,y:0},
    q2: {x:-1,y:0},
    q3: {x:0,y:1},
    q4: {x:0,y:-1},
    q5: {x:-1,y:0},
    q6: {x:0,y:-1},
    q7: {x:0,y:1},
    q8: {x:0,y:1},
    q9: {x:0,y:1},
    q10: {x:-1,y:0},
    q11: {x:-1,y:0},
    q12: {x:-1,y:0},
    q13: {x:0,y:1},
    q14: {x:-1,y:0},
    q15: {x:1,y:0},
    q16: {x:0,y:1},
    q17: {x:-1,y:0},
    q18: {x:-1,y:0},
    q19: {x:-1,y:0},
    q20: {x:-1,y:0},
    q21: {x:0,y:-1},
    q22: {x:0,y:-1},
    q23: {x:1,y:0},
    q24: {x:1,y:0},
    q25: {x:1,y:0},
    q26: {x:0,y:-1},
    q27: {x:1,y:0},
    q28: {x:-1,y:0},
    q29: {x:0,y:-1},
    q30: {x:0,y:-1},
    q31: {x:0,y:-1},
    q32: {x:0,y:1},
    q33: {x:0,y:1},
    q34: {x:0,y:1},
    q35: {x:-1,y:0},
    q36: {x:0,y:1},
    q37: {x:0,y:1},
    q38: {x:0,y:1},
    q39: {x:0,y:1},
    q40: {x:0,y:1},
};

function calculateScore(answers) {
    let x = 0, y = 0;
    for (let q in questionAxis) {
        let axis = questionAxis[q];
        let val = answerValues[answers[q]];
        x += (axis.x || 0) * val;
        y += (axis.y || 0) * val;
    }
    return { x, y };
}

function setResultsBackground(x, y) {
    const results = document.getElementById('results-section');
    let color;

    if (x < 50 && y < 50) {
        color = '#7f3737';
    } else if (x > 50 && y < 50) {
        color = '#377f37';
    } else if (x < 50 && y > 50) {
        color = '#000000';
    } else if (x > 50 && y > 50) {
        color = '#37377f';
    }

function animateResultsSectionBackground() {
    let now = Date.now();
    let elapsed = (now - startTime + savedOffset) % ANIMATION_DURATION;
    let pct = (elapsed / ANIMATION_DURATION) * 100;
    let results = document.getElementById("results-section");
    if (results) {
        results.style.backgroundColor = interpolateColor(headerColors, pct);
    }
    if (!areAllQuestionsAnswered()) {
        requestAnimationFrame(animateResultsSectionBackground);
    }
}

function areAllQuestionsAnswered() {
    const answers = JSON.parse(localStorage.getItem('quizAnswers'));
    if (!answers) return false;
    for (let i = 1; i <= 40; i++) {
        if (!answers['q' + i]) return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
        const resultsSection = document.getElementById("results-section");
        if (!resultsSection) return;

        if (!areAllQuestionsAnswered()) {
            animateResultsSectionBackground();
        } else {
            const answers = JSON.parse(localStorage.getItem('quizAnswers'));
            if (!answers) return;
            const { x, y } = calculateScore(answers);
            setResultsBackground(x, y);
        }
    });
};

function mapToSVG(x, y, svgWidth, svgHeight, scoreRange) {
    let svgX = ((x + scoreRange) / (2 * scoreRange)) * svgWidth;
    let svgY = svgHeight - ((y + scoreRange) / (2 * scoreRange)) * svgHeight;
    return { svgX, svgY };
};

document.addEventListener("DOMContentLoaded", function () {
    let quizForm = document.getElementById('quizForm');
    if (quizForm) {
        let current_1 = 0;
        let sections_1 = document.querySelectorAll('.question-section');
        if (localStorage.getItem('quizCurrent')) {
            current_1 = parseInt(localStorage.getItem('quizCurrent'), 10) || 0;
        }
        function updateRequiredRadios(currentIndex, sections) {
            sections.forEach((sec, i) => {
                sec.querySelectorAll('input[type="radio"]').forEach(radio => {
                    radio.required = (i === currentIndex);
                });
            });
        }
        function showQuestion(index) {
            sections_1.forEach(function (sec, i) {
                sec.style.display = i === index ? 'block' : 'none';
            });
            updateRequiredRadios(index, sections_1); // <-- Add this line
            localStorage.setItem('quizCurrent', index);
        }
        function nextQuestion() {
            let currentSection = sections_1[current_1];
            let radios = currentSection.querySelectorAll('input[type="radio"]');
            let answered = false;
            radios.forEach(function (radio) {
                if (radio.checked) answered = true;
            });
            console.log('Current section:', current_1, 'Answered:', answered, 'Radios:', radios.length);
            if (!answered) {
                alert('Please select an answer before continuing.');
                return;
            }
            if (current_1 < sections_1.length - 1) {
                current_1++;
                showQuestion(current_1);
            }
        }
        function prevQuestion() {
            if (current_1 > 0) {
                current_1--;
                showQuestion(current_1);
            }
        }
        quizForm.onsubmit = function (e) {
            e.preventDefault();
            alert('Quiz submitted!');
            let answers = {};
            for (let i = 1; i <= 40; i++) {
                let val = quizForm['q' + i].value;
                answers['q' + i] = val;
            }
            localStorage.setItem('quizAnswers', JSON.stringify(answers));
            window.location.href = "results.html";
        };
    };
    window.nextQuestion = nextQuestion;
    window.prevQuestion = prevQuestion;
    showQuestion(current_1);
    }
);
