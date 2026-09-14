const STORAGE_PREFIX = "timer_";

// Change this if your Spring Boot backend runs on another port.
const API_BASE_URL = "http://localhost:8081";
chrome.runtime.onMessageExternal.addListener(
    (message, sender, sendResponse) => {

        if (message.type !== "PREPFLOW_CONNECT") {
            return;
        }

        if (!message.token) {
            sendResponse({
                success: false,
                error: "No authentication token provided."
            });
            return;
        }

        chrome.storage.local.set({
            prepflowToken: message.token
        }).then(() => {

            console.log("PrepFlow extension connected.");

            sendResponse({
                success: true
            });

        }).catch((error) => {

            console.error(
                "PrepFlow: failed to store authentication token:",
                error
            );

            sendResponse({
                success: false,
                error: error.message
            });
        });

        return true;
    }
);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "PROBLEM_DETECTED") {
        startProblemTimer(message.data).then(() => {
            sendResponse({ success: true });
        });

        return true;
    }

    if (message.type === "SUBMISSION_ACCEPTED") {
        finishProblemTimer(message.data.slug).then(async (result) => {

            let syncResult = null;

            if (result) {
                syncResult = await syncSolvedProblem(result);
            }

            sendResponse({
                success: true,
                result,
                syncResult
            });
        });

        return true;
    }

    if (message.type === "GET_TIMER") {
        getTimer(message.slug).then((timer) => {
            sendResponse({ success: true, timer });
        });

        return true;
    }

    if (message.type === "PAUSE_TIMER") {
        pauseTimer(message.slug).then((timer) => {
            sendResponse({ success: true, timer });
        });

        return true;
    }

    if (message.type === "RESUME_TIMER") {
        resumeTimer(message.slug).then((timer) => {
            sendResponse({ success: true, timer });
        });

        return true;
    }
});


async function startProblemTimer(problem) {

    if (!problem.slug) return;

    const key = STORAGE_PREFIX + problem.slug;

    const stored = await chrome.storage.local.get(key);
    const existing = stored[key];

    // Don't restart a completed problem.
    if (existing?.status === "SOLVED") {
        return existing;
    }

    // Already running.
    if (existing?.status === "RUNNING") {
        return existing;
    }

    const now = Date.now();

    const timer = {
        platform: "LEETCODE",
        slug: problem.slug,
        title: problem.title || "Unknown Problem",
        difficulty: problem.difficulty || "UNKNOWN",
        url: problem.url || "",

        status: "RUNNING",

        startedAt: existing?.startedAt || now,
        pausedAt: null,
        totalPausedMs: existing?.totalPausedMs || 0,

        solvedAt: null,
        elapsedMs: existing?.elapsedMs || 0,
        elapsedSeconds: existing?.elapsedSeconds || 0
    };

    await chrome.storage.local.set({
        [key]: timer,
        currentProblemSlug: problem.slug
    });

    return timer;
}


async function getTimer(slug) {

    if (!slug) return null;

    const key = STORAGE_PREFIX + slug;

    const stored = await chrome.storage.local.get(key);

    const timer = stored[key];

    if (!timer) return null;

    return calculateTimer(timer);
}


function calculateTimer(timer) {

    if (!timer) return null;

    let elapsedMs = timer.elapsedMs || 0;

    if (timer.status === "RUNNING") {
        elapsedMs =
            Date.now() -
            timer.startedAt -
            (timer.totalPausedMs || 0);
    }

    if (timer.status === "PAUSED" && timer.pausedAt) {
        elapsedMs =
            timer.pausedAt -
            timer.startedAt -
            (timer.totalPausedMs || 0);
    }

    return {
        ...timer,
        elapsedMs: Math.max(0, elapsedMs),
        elapsedSeconds: Math.floor(
            Math.max(0, elapsedMs) / 1000
        )
    };
}


async function pauseTimer(slug) {

    const timer = await getTimer(slug);

    if (!timer || timer.status !== "RUNNING") {
        return timer;
    }

    timer.status = "PAUSED";
    timer.pausedAt = Date.now();

    await chrome.storage.local.set({
        [STORAGE_PREFIX + slug]: timer
    });

    return timer;
}


async function resumeTimer(slug) {

    const timer = await getTimer(slug);

    if (!timer || timer.status !== "PAUSED") {
        return timer;
    }

    const now = Date.now();

    timer.totalPausedMs =
        (timer.totalPausedMs || 0) +
        (now - timer.pausedAt);

    timer.pausedAt = null;
    timer.status = "RUNNING";

    await chrome.storage.local.set({
        [STORAGE_PREFIX + slug]: timer
    });

    return timer;
}


async function finishProblemTimer(slug) {

    const timer = await getTimer(slug);

    if (!timer) return null;

    const finalTime = timer.elapsedMs;

    const solved = {
        ...timer,
        status: "SOLVED",
        solvedAt: Date.now(),
        elapsedMs: finalTime,
        elapsedSeconds: Math.floor(finalTime / 1000),
        pausedAt: null
    };

    await chrome.storage.local.set({
        [STORAGE_PREFIX + slug]: solved,
        lastSolvedProblem: solved
    });

    return solved;
}


/*
 * Sends an Accepted LeetCode problem to the PrepFlow backend.
 */
async function syncSolvedProblem(solved) {

    try {

        const stored = await chrome.storage.local.get("prepflowToken");
        const token = stored.prepflowToken;

        if (!token) {
            console.warn(
                "PrepFlow: no authentication token. Problem was solved locally but not synced."
            );

            return {
                success: false,
                reason: "NOT_AUTHENTICATED"
            };
        }

        const payload = {
            platform: solved.platform,
            slug: solved.slug,
            title: solved.title,
            difficulty: solved.difficulty,
            timeTaken: solved.elapsedSeconds,
            solvedOn: new Date(solved.solvedAt)
                .toISOString()
                .split("T")[0],
            url: solved.url
        };

        console.log(
            "PrepFlow: syncing solved problem:",
            payload
        );

        const response = await fetch(
            `${API_BASE_URL}/api/dsa/extension/solved`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {

            const errorText = await response.text();

            console.error(
                "PrepFlow: backend sync failed:",
                response.status,
                errorText
            );

            return {
                success: false,
                status: response.status,
                error: errorText
            };
        }

        const data = await response.json();

        console.log(
            "PrepFlow: problem synced successfully:",
            data
        );

        return {
            success: true,
            data
        };

    } catch (error) {

        console.error(
            "PrepFlow: failed to sync solved problem:",
            error
        );

        return {
            success: false,
            error: error.message
        };
    }
}