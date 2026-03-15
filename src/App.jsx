import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Counter from "./CountdownTimer/Counter";
import SetCount from "./Count/SetCount";

const STORAGE_KEY = "countdown_state";

const App = () => {
  const isExtended =
    new URLSearchParams(window.location.search).get("extended") === "true";

  const [view, setView] = useState("SET");
  const [duration, setDuration] = useState(0);
  // const [showControls, setShowControls] = useState(!isExtended);

  // Sync from localStorage if extended
  useEffect(() => {
    if (!isExtended) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setDuration(parsed.duration);
      setView("TIMER");
    }
  }, [isExtended]);

  const handleStart = (timeInSeconds) => {
    setDuration(timeInSeconds);
    setView("TIMER");

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        duration: timeInSeconds,
        timeLeft: timeInSeconds,
        isRunning: true,
      }),
    );
  };

  const handleBack = () => {
    setDuration(0);
    setView("SET");

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        duration: 0,
        timeLeft: 0,
        isRunning: false,
      }),
    );
  };

  const handleExtend = () => {
    window.open("?extended=true", "ExtendedScreen", "width=1200,height=800");
  };

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      {view === "SET" && !isExtended && <SetCount onStart={handleStart} />}

      {view === "TIMER" && (
        <Counter
          duration={duration}
          onExit={handleBack}
          showControls={!isExtended}
          onExtend={handleExtend}
          isExtended={isExtended}
        />
      )}
    </Box>
  );
};

export default App;
