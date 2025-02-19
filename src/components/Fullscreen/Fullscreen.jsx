import React, { useState, useEffect } from "react";

function FullScreenEnforcer() {
    const [exitAttempts, setExitAttempts] = useState(0);

    // Function to enter fullscreen mode
    const enterFullScreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen(); // Firefox
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(); // Chrome, Safari, Opera
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen(); // IE/Edge
        }
    };

    useEffect(() => {
        // Ensure fullscreen mode is activated when the component mounts
        const timeout = setTimeout(() => {
            enterFullScreen();
        }, 500);

        // Function to check if fullscreen was exited
        const checkExit = () => {
            if (!document.fullscreenElement && !document.mozFullScreenElement &&
                !document.webkitFullscreenElement && !document.msFullscreenElement) {
                
                setExitAttempts(prev => {
                    const newAttempts = prev + 1;
                    
                    if (newAttempts >= 3) {
                        alert("You have been logged out due to multiple fullscreen exit attempts.");
                        window.location.href = "/logout"; // Redirect to logout page
                    } else {
                        alert(`You cannot exit fullscreen! Attempt ${newAttempts}/3`);
                        enterFullScreen(); // Re-enter fullscreen
                    }

                    return newAttempts;
                });
            }
        };

        // Listen for fullscreen change events
        document.addEventListener("fullscreenchange", checkExit);
        document.addEventListener("mozfullscreenchange", checkExit);
        document.addEventListener("webkitfullscreenchange", checkExit);
        document.addEventListener("MSFullscreenChange", checkExit);

        return () => {
            clearTimeout(timeout);
            document.removeEventListener("fullscreenchange", checkExit);
            document.removeEventListener("mozfullscreenchange", checkExit);
            document.removeEventListener("webkitfullscreenchange", checkExit);
            document.removeEventListener("MSFullscreenChange", checkExit);
        };
    }, []);

    return null; // This component does not render anything
}

export default FullScreenEnforcer;
