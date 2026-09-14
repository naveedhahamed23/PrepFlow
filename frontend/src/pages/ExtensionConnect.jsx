import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const EXTENSION_ID = "mimopmmkbmcjdpobamkkbbpbgcapnegf";

export default function ExtensionConnect() {
    const { isAuthenticated } = useAuth();

    const [status, setStatus] = useState("connecting");
    const [message, setMessage] = useState(
        "Connecting your PrepFlow extension..."
    );

    useEffect(() => {
        async function connect() {
            try {
                if (!isAuthenticated) {
                    setStatus("error");
                    setMessage(
                        "Please log in to PrepFlow before connecting the extension."
                    );
                    return;
                }

                const token = localStorage.getItem("prepflow_token");

                if (!token) {
                    throw new Error(
                        "PrepFlow authentication token was not found."
                    );
                }

                if (!window.chrome?.runtime?.sendMessage) {
                    throw new Error(
                        "Chrome extension messaging is unavailable."
                    );
                }

                chrome.runtime.sendMessage(
                    EXTENSION_ID,
                    {
                        type: "PREPFLOW_CONNECT",
                        token
                    },
                    (response) => {
                        if (chrome.runtime.lastError) {
                            setStatus("error");
                            setMessage(
                                chrome.runtime.lastError.message ||
                                "Could not connect to the extension."
                            );
                            return;
                        }

                        if (!response?.success) {
                            setStatus("error");
                            setMessage(
                                response?.error ||
                                "Extension connection failed."
                            );
                            return;
                        }

                        setStatus("success");
                        setMessage(
                            "Your PrepFlow extension is now connected. Solved LeetCode problems will sync automatically."
                        );
                    }
                );
            } catch (error) {
                setStatus("error");
                setMessage(
                    error.message || "Failed to connect to the extension."
                );
            }
        }

        connect();
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg px-6">
            <div className="w-full max-w-lg rounded-2xl border border-bg-border bg-bg-card p-8 text-center shadow-xl">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {status === "success" ? (
                        <span className="text-3xl">✓</span>
                    ) : status === "error" ? (
                        <span className="text-3xl">!</span>
                    ) : (
                        <span className="text-3xl">↗</span>
                    )}
                </div>

                <h1 className="text-2xl font-bold text-text">
                    {status === "success"
                        ? "Extension Connected"
                        : status === "error"
                            ? "Connection Failed"
                            : "Connecting PrepFlow"}
                </h1>

                <p className="mt-3 text-sm text-text-muted">
                    {message}
                </p>

                {status === "error" && (
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="mt-6 rounded-xl bg-primary px-5 py-3 font-semibold text-white"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}