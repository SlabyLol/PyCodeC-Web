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

// Simulated progress bar
const form = document.getElementById('uploadForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let progress = 0;
    const progressBar = document.getElementById('progressBar');
    const log = document.getElementById('log');
    log.innerHTML = "Starting simulated build...\n";

    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = progress + "%";
        log.innerHTML += `Progress: ${progress}%\n`;
        log.scrollTop = log.scrollHeight;
        if(progress >= 100) {
            clearInterval(interval);
            log.innerHTML += "Build complete! (Simulation)\n";
            alert("Build finished! (Simulation only, no EXE/APK generated)");
        }
    }, 300);
});
