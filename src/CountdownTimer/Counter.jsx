import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const STORAGE_KEY = "countdown_state";

const formatTime = (time) => {
  const mins = String(Math.floor(time / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");
  return `${mins}:${secs}`;
};

const Counter = ({
  duration,
  onExit,
  showControls = true,
  onExtend,
  isExtended,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  // Sync from localStorage (important for extended window)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTimeLeft(parsed.timeLeft);
      setIsRunning(parsed.isRunning);
    }
  }, []);

  // Listen for changes from main screen
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const parsed = JSON.parse(e.newValue);
        setTimeLeft(parsed.timeLeft);
        setIsRunning(parsed.isRunning);
        setIsFinished(parsed.isFinished || false);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Only MAIN window runs interval
  useEffect(() => {
    if (!isRunning || isExtended) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev <= 1 ? 0 : prev - 1;
        const finished = next === 0;

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            duration,
            timeLeft: next,
            isRunning: next > 0,
            isFinished: finished,
          }),
        );

        if (finished) clearInterval(intervalRef.current);

        return next;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isExtended, duration]);

  const handleStart = () => {
    setIsRunning(true);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ duration, timeLeft, isRunning: true }),
    );
  };

  const handlePause = () => {
    setIsRunning(false);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ duration, timeLeft, isRunning: false }),
    );
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    setIsFinished(false);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        duration,
        timeLeft: duration,
        isRunning: false,
      }),
    );
  };

  // const isTimeUp = timeLeft === 0;
  // const isTimeUp = timeLeft === 0 && duration !== 0;
  const isTimeUp = isFinished;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: isTimeUp ? "#f70404" : "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          fontSize: showControls ? "12vw" : "25vw",
          fontWeight: 700,
        }}
      >
        {/* {isTimeUp ? "TIME UP" : formatTime(timeLeft)} */}
        {isTimeUp ? "TIME UP" : formatTime(timeLeft)}
      </Box>

      {showControls && (
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={handleReset}>
            <RefreshIcon />
          </Button>

          {!isRunning && !isTimeUp ? (
            <Button variant="contained" onClick={handleStart}>
              {timeLeft === duration ? "Start" : "Resume"}
            </Button>
          ) : (
            <Button variant="outlined" onClick={handlePause}>
              Pause
            </Button>
          )}

          <Button variant="outlined" onClick={onExtend}>
            Extend
          </Button>

          <Button variant="outlined" onClick={onExit}>
            <ArrowBackIcon />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Counter;
