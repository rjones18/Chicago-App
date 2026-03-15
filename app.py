
from flask import Flask, jsonify, render_template
from datetime import datetime
from zoneinfo import ZoneInfo

app = Flask(__name__)

CHICAGO_TZ = ZoneInfo("America/Chicago")

# Move date: June 15, 2026 at 9:00 AM Chicago time
MOVE_DT = datetime(2026, 6, 15, 9, 0, 0, tzinfo=CHICAGO_TZ)

@app.get("/")
def home():
    return render_template("index.html")

@app.get("/api/target")
def target():
    # ISO format includes offset, which JS can parse
    return jsonify({
        "timezone": "America/Chicago",
        "targetIso": MOVE_DT.isoformat()
    })

if __name__ == "__main__":
    # For local dev only. In Docker we’ll run via gunicorn.
    app.run(debug=True)