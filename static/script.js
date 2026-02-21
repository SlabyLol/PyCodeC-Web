// Rotating tips
let tips = [
    "First build can take several minutes.",
    "Use a proper icon for professional look.",
    "Check the log if build fails.",
    "Slow? Visit: DFGaming github.com/SlabyLol/DFGaming"
];
let tipIndex = 0;

function rotateTips() {
    document.getElementById('tips').innerText = "Tip: " + tips[tipIndex];
    tipIndex = (tipIndex + 1) % tips.length;
}

setInterval(rotateTips, 5000);
