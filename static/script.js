// Datei lesen (nur Frontend)
const form = document.getElementById('uploadForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('pyfile');
    const file = fileInput.files[0];
    if (!file) return alert("Select a Python file!");

    const reader = new FileReader();
    reader.onload = function() {
        console.log("File content loaded:", reader.result.substring(0,100), "…"); 
        startProgressSimulation();
    }
    reader.readAsText(file);
});

function startProgressSimulation() {
    let progress = 0;
    const progressBar = document.getElementById('progressBar');
    const log = document.getElementById('log');
    log.innerHTML = "Simulated build started...\n";

    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = progress + "%";
        log.innerHTML += `Progress: ${progress}%\n`;
        log.scrollTop = log.scrollHeight;
        if(progress >= 100) {
            clearInterval(interval);
            log.innerHTML += "Build complete! (Simulation only)\n";
            alert("Build finished! (Simulation only, no EXE/APK generated)");
        }
    }, 300);
}
