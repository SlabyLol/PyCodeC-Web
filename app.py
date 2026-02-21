from flask import Flask, request, render_template, send_from_directory
import os, threading, subprocess

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
DIST_FOLDER = "dist"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DIST_FOLDER, exist_ok=True)

TIPS = [
    "First build can take several minutes.",
    "Use a proper icon for professional look.",
    "Check the log if build fails.",
    "Slow? Visit: DFGaming github.com/SlabyLol/DFGaming"
]

def run_command(cmd, cwd=None):
    """Runs command and prints output line by line"""
    process = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        cwd=cwd
    )
    for line in process.stdout:
        print(line.strip())
    process.wait()
    return process.returncode == 0

def build_exe(filepath):
    filename = os.path.splitext(os.path.basename(filepath))[0]
    cmd = ["pyinstaller", "--onefile", filepath, "--distpath", DIST_FOLDER]
    run_command(cmd)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files.get("pyfile")
        if file:
            path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(path)
            threading.Thread(target=build_exe, args=(path,)).start()
            return "Build started! Check server log for progress."
    return render_template("index.html", tips=TIPS)

@app.route("/dist/<filename>")
def download(filename):
    return send_from_directory(DIST_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True)
