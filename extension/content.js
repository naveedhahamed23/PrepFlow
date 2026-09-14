let currentSlug = null;
let submissionPending = false;
let acceptedDetected = false;

// -----------------------------
// Get problem information
// -----------------------------

function getProblemSlug() {
  const parts = window.location.pathname
    .split("/")
    .filter(Boolean);

  if (parts[0] !== "problems") {
    return null;
  }

  return parts[1] || null;
}


// -----------------------------
// Get problem title
// -----------------------------

function getProblemTitle() {
  const selectors = [
    'div[data-cy="question-title"]',
    'a[href*="/problems/"] h1',
    'h1[class*="text-title"]',
    "h1"
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);

    if (element?.innerText?.trim()) {
      return element.innerText.trim();
    }
  }

  // Fallback: browser page title
  const pageTitle = document.title
    .replace(/\s*-\s*LeetCode\s*$/i, "")
    .trim();

  if (pageTitle) {
    return pageTitle;
  }

  // Final fallback: convert slug into readable title
  const slug = getProblemSlug();

  if (slug) {
    return slug
      .split("-")
      .map(
        word =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  }

  return "Unknown Problem";
}


// -----------------------------
// Get difficulty
// -----------------------------

function getDifficulty() {
  const selectors = [
    '[class*="text-difficulty-easy"]',
    '[class*="text-difficulty-medium"]',
    '[class*="text-difficulty-hard"]'
  ];

  // First try LeetCode difficulty-specific classes
  for (const selector of selectors) {
    const element = document.querySelector(selector);

    if (element?.innerText?.trim()) {
      const text = element.innerText
        .trim()
        .toUpperCase();

      if (text.includes("EASY")) {
        return "EASY";
      }

      if (text.includes("MEDIUM")) {
        return "MEDIUM";
      }

      if (text.includes("HARD")) {
        return "HARD";
      }
    }
  }

  // Fallback: look for an element containing
  // exactly the difficulty text.
  const elements = document.querySelectorAll(
    "span, div, button"
  );

  for (const element of elements) {
    const text = element.innerText
      ?.trim()
      .toUpperCase();

    if (!text) {
      continue;
    }

    if (text === "EASY") {
      return "EASY";
    }

    if (text === "MEDIUM") {
      return "MEDIUM";
    }

    if (text === "HARD") {
      return "HARD";
    }
  }

  return "UNKNOWN";
}


// -----------------------------
// Detect current problem
// -----------------------------

function detectProblem() {
  const slug = getProblemSlug();

  if (!slug) {
    return;
  }

  // Same problem — don't create another timer
  if (slug === currentSlug) {
    return;
  }

  currentSlug = slug;

  // Reset submission state for a new problem
  submissionPending = false;
  acceptedDetected = false;

  const problem = {
    platform: "LEETCODE",
    slug: slug,
    title: getProblemTitle(),
    difficulty: getDifficulty(),
    url: window.location.href
  };

  console.log(
    "PrepFlow detected problem:",
    problem
  );

  try {
    chrome.runtime.sendMessage({
        type: "PROBLEM_DETECTED",
        data: problem
    });
} catch (error) {
    console.warn(
        "PrepFlow: extension context was refreshed. Reload the LeetCode page.",
        error
    );
}
}


// -----------------------------
// Submission verdicts
// -----------------------------

const FINAL_VERDICTS = [
  "Accepted",
  "Wrong Answer",
  "Compile Error",
  "Runtime Error",
  "Time Limit Exceeded",
  "Memory Limit Exceeded",
  "Output Limit Exceeded",
  "Presentation Error",
  "System Error"
];


// -----------------------------
// Get exact verdict from element
// -----------------------------

function getVerdictFromElement(element) {
  if (!element) {
    return null;
  }

  const text = element.innerText?.trim();

  if (!text) {
    return null;
  }

  for (const verdict of FINAL_VERDICTS) {
    if (text === verdict) {
      return verdict;
    }
  }

  return null;
}


// -----------------------------
// Get verdicts currently visible
// -----------------------------

function getCurrentVerdictElements() {
    const elements = document.querySelectorAll("div, span, button");
    const verdictElements = new Map();

    for (const element of elements) {
        const verdict = getVerdictFromElement(element);

        if (verdict) {
            verdictElements.set(element, verdict);
        }
    }

    return verdictElements;
}


// -----------------------------
// Handle submission result
// -----------------------------

function handleSubmissionResult(verdict) {
  if (!submissionPending) {
    return;
  }

  console.log(
    "PrepFlow submission result:",
    verdict
  );

  submissionPending = false;

  // ONLY Accepted completes the problem
  if (verdict === "Accepted") {
    if (acceptedDetected) {
      return;
    }

    acceptedDetected = true;

    console.log(
      "PrepFlow: ACCEPTED detected for",
      currentSlug
    );

    chrome.runtime.sendMessage({
      type: "SUBMISSION_ACCEPTED",
      data: {
        slug: currentSlug
      }
    });

    return;
  }

  // Every other result keeps the problem unsolved.
  console.log(
    "PrepFlow: problem still unsolved:",
    verdict
  );
}


// -----------------------------
// Watch for NEW submission result
// -----------------------------

function watchSubmissionResult(previousVerdictElements) {
    const observer = new MutationObserver(() => {

        if (!submissionPending) {
            observer.disconnect();
            return;
        }

        const currentVerdictElements =
            getCurrentVerdictElements();

        for (const [element, verdict] of currentVerdictElements) {

            // Ignore verdict elements that existed before Submit.
            if (previousVerdictElements.has(element)) {
                continue;
            }

            console.log(
                "PrepFlow: NEW submission verdict:",
                verdict
            );

            handleSubmissionResult(verdict);

            if (!submissionPending) {
                observer.disconnect();
                return;
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    setTimeout(() => {
        observer.disconnect();

        if (submissionPending) {
            console.log(
                "PrepFlow: no submission result detected within 120 seconds."
            );
        }
    }, 120000);
}


// -----------------------------
// Detect Submit button
// -----------------------------
function watchSubmitButton() {
    document.addEventListener(
        "click",
        event => {

            const target = event.target;

            if (!target) {
                return;
            }

            // Look for the nearest clickable element.
            const clickable = target.closest(
                'button, [role="button"], [data-e2e-locator]'
            );

            if (!clickable) {
                return;
            }

            const text = (
                clickable.innerText ||
                clickable.textContent ||
                clickable.getAttribute("aria-label") ||
                clickable.getAttribute("title") ||
                ""
            )
                .trim()
                .toLowerCase();

            const locator = (
                clickable.getAttribute("data-e2e-locator") ||
                ""
            ).toLowerCase();

            const isSubmit =
                text === "submit" ||
                text.includes("submit") ||
                locator.includes("submit");

            if (!isSubmit) {
                return;
            }

            console.log(
                "PrepFlow: SUBMIT BUTTON DETECTED",
                {
                    text,
                    locator
                }
            );

            const previousVerdictElements =
                getCurrentVerdictElements();

            submissionPending = true;
            acceptedDetected = false;

            watchSubmissionResult(
                previousVerdictElements
            );
        },
        true
    );
}

// -----------------------------
// Handle LeetCode SPA navigation
// -----------------------------

function watchNavigation() {
    let lastUrl = window.location.href;

    const observer = new MutationObserver(() => {
        const currentUrl = window.location.href;

        if (currentUrl === lastUrl) {
            return;
        }

        const previousUrl = lastUrl;
        lastUrl = currentUrl;

        console.log(
            "PrepFlow: URL changed:",
            currentUrl
        );

        const currentSlug = getProblemSlug();

        /*
         * LeetCode changes:
         *
         * /problems/spiral-matrix/
         *
         * to:
         *
         * /problems/spiral-matrix/submissions/123456/
         *
         * while judging a submission.
         *
         * DO NOT cancel submissionPending here.
         */
        const isSubmissionPage =
            window.location.pathname.includes("/submissions/");

        if (isSubmissionPage) {
            console.log(
                "PrepFlow: submission page detected; continuing to watch for verdict."
            );

            return;
        }

        // Actual problem navigation.
        if (currentSlug !== null) {
            submissionPending = false;
            acceptedDetected = false;

            setTimeout(() => {
                detectProblem();
            }, 500);

            setTimeout(() => {
                detectProblem();
            }, 1500);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}


// -----------------------------
// Initialisation
// -----------------------------

function init() {
  console.log("PrepFlow extension loaded");

  // Detect problem immediately
  detectProblem();

  // Detect Submit clicks
  watchSubmitButton();

  // Watch SPA navigation
  watchNavigation();

  // LeetCode can take time to render
  setTimeout(() => {
    detectProblem();
  }, 1000);

  setTimeout(() => {
    detectProblem();
  }, 2500);
}


// -----------------------------
// Start
// -----------------------------

init();