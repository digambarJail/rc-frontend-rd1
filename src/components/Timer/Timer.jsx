import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Timer() {
    const navigate = useNavigate();
    const initialTime = Number(localStorage.getItem("timeLeft")) || 30 * 60; // Load from localStorage or default to 30 minutes
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            navigate("#"); // Redirect when timer reaches 0
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;
                localStorage.setItem("timeLeft", newTime); // Save to localStorage
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on unmount
    }, [timeLeft, navigate]);

    useEffect(() => {
        const beforeUnloadHandler = () => {
            localStorage.setItem("timeLeft", timeLeft);
        };
        window.addEventListener("beforeunload", beforeUnloadHandler);
        return () => window.removeEventListener("beforeunload", beforeUnloadHandler);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <div className="text-3xl font-bold text-center p-4 text-[#e2b3cc] rounded-md w-40 mx-auto ">
            {formatTime(timeLeft)}
        </div>
    );
}

export default Timer;
