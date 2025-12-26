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
    document.addEventListener("DOMContentLoaded", function () {
    let quizForm = document.getElementById('quizForm');
    if (quizForm) {
        let current_1 = 0;
        let sections_1 = document.querySelectorAll('.question-section');
        if (localStorage.getItem('quizCurrent')) {
            current_1 = parseInt(localStorage.getItem('quizCurrent'), 10) || 0;
        }
        function showQuestion(index) {
            sections_1.forEach(function (sec, i) {
                sec.style.display = i === index ? 'block' : 'none';
            });
            localStorage.setItem('quizCurrent', index);
        }
        function nextQuestion() {
            let currentSection = sections_1[current_1];
            let radios = currentSection.querySelectorAll('input[type="radio"]');
            let answered = false;
            radios.forEach(function (radio) {
                if (radio.checked)
                    answered = true;
            });
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
