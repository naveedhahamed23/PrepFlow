let currentSlug = null;
let updateInterval = null;


function formatTime(seconds) {
  seconds = Math.max(0, seconds);

  const hours = Math.floor(seconds / 3600);

  const minutes = Math.floor((seconds % 3600) / 60);

  const secs = seconds % 60;

  return [
    hours,
    minutes,
    secs
  ]
    .map(value => String(value).padStart(2, "0"))
    .join(":");
}


async function getCurrentTab() {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  return tabs[0];
}


function getSlugFromUrl(url) {
  try {
    const parsed = new URL(url);

    if (!parsed.hostname.includes("leetcode.com")) {
      return null;
    }

    const parts = parsed.pathname
      .split("/")
      .filter(Boolean);

    if (parts[0] !== "problems") {
      return null;
    }

    return parts[1] || null;

  } catch {
    return null;
  }
}
async function loadConnectionState() {

    const stored = await chrome.storage.local.get("prepflowToken");

    const status = document.getElementById("connectionStatus");
    const button = document.getElementById("connectButton");
    const message = document.getElementById("connectionMessage");

    if (stored.prepflowToken) {

        status.textContent = "Connected";
        status.className =
            "connection-status connected";

        button.textContent = "Connected";
        button.disabled = true;

        message.textContent =
            "Solved problems will sync to your PrepFlow account.";

    } else {

        status.textContent = "Not connected";
        status.className =
            "connection-status disconnected";

        button.textContent = "Connect to PrepFlow";
        button.disabled = false;

        message.textContent =
            "Connect your PrepFlow account to sync solved problems.";
    }
}

document
    .getElementById("connectButton")
    .addEventListener("click", async () => {

        try {
            await chrome.tabs.create({
                url: "http://localhost:5173/app/extension-connect"
            });
        } catch (error) {
            console.error(
                "PrepFlow: failed to open connection page:",
                error
            );

            document.getElementById("connectionMessage").textContent =
                "Could not open PrepFlow.";
        }
    });



async function loadTimer() {
  const tab = await getCurrentTab();

  const slug = getSlugFromUrl(tab?.url || "");

  if (!slug) {

    document
      .getElementById("problemSection")
      .classList.add("hidden");

    document
      .getElementById("notLeetCode")
      .classList.remove("hidden");

    return;
  }

  currentSlug = slug;

  document
    .getElementById("problemSection")
    .classList.remove("hidden");

  document
    .getElementById("notLeetCode")
    .classList.add("hidden");


  chrome.runtime.sendMessage(
    {
      type: "GET_TIMER",
      slug
    },
    response => {

      if (!response?.timer) {
        document.getElementById("problemTitle").textContent =
          "Starting timer...";

        setTimeout(loadTimer, 500);

        return;
      }

      renderTimer(response.timer);
    }
  );
}


function renderTimer(timer) {

  document.getElementById("problemTitle").textContent =
    timer.title || "LeetCode Problem";

  document.getElementById("difficulty").textContent =
    timer.difficulty || "UNKNOWN";

  document.getElementById("timer").textContent =
    formatTime(timer.elapsedSeconds);


  const status = document.getElementById("status");

  const pauseButton =
    document.getElementById("pauseButton");

  const resumeButton =
    document.getElementById("resumeButton");


  if (timer.status === "SOLVED") {

    status.textContent = "✓ Solved";
    status.className = "status solved";

    pauseButton.classList.add("hidden");
    resumeButton.classList.add("hidden");

  } else if (timer.status === "PAUSED") {

    status.textContent = "Paused";
    status.className = "status paused";

    pauseButton.classList.add("hidden");
    resumeButton.classList.remove("hidden");

  } else {

    status.textContent = "Solving";
    status.className = "status solving";

    pauseButton.classList.remove("hidden");
    resumeButton.classList.add("hidden");
  }
}


document
  .getElementById("pauseButton")
  .addEventListener("click", () => {

    if (!currentSlug) return;

    chrome.runtime.sendMessage(
      {
        type: "PAUSE_TIMER",
        slug: currentSlug
      },
      response => {

        if (response?.timer) {
          renderTimer(response.timer);
        }
      }
    );
  });


document
  .getElementById("resumeButton")
  .addEventListener("click", () => {

    if (!currentSlug) return;

    chrome.runtime.sendMessage(
      {
        type: "RESUME_TIMER",
        slug: currentSlug
      },
      response => {

        if (response?.timer) {
          renderTimer(response.timer);
        }
      }
    );
  });


function startUpdates() {

  clearInterval(updateInterval);

  updateInterval = setInterval(() => {

    if (!currentSlug) return;

    chrome.runtime.sendMessage(
      {
        type: "GET_TIMER",
        slug: currentSlug
      },
      response => {

        if (response?.timer) {
          renderTimer(response.timer);
        }

      }
    );

  }, 1000);
}

loadConnectionState();
loadTimer();
startUpdates();