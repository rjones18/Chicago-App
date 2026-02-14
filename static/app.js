function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatLocal(d) {
  return d.toLocaleString(undefined, {
    year: "numeric", month: "short", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    timeZoneName: "short"
  });
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function tick(targetDate) {
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    setText("days", "0");
    setText("hours", "00");
    setText("minutes", "00");
    setText("seconds", "00");
    document.getElementById("doneText").hidden = false;
    setText("nowText", formatLocal(now));
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  setText("days", String(days));
  setText("hours", pad2(hours));
  setText("minutes", pad2(minutes));
  setText("seconds", pad2(seconds));
  setText("nowText", formatLocal(now));
}

(async function main() {
  try {
    const res = await fetch("/api/target");
    if (!res.ok) throw new Error("Failed to load target date");
    const data = await res.json();

    const target = new Date(data.targetIso);
    setText("targetText", data.targetIso);

    tick(target);
    setInterval(() => tick(target), 1000);
  } catch (e) {
    console.error(e);
    document.body.innerHTML = `<pre style="white-space:pre-wrap">Error: ${e.message}</pre>`;
  }
})();
