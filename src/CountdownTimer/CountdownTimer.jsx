import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const STORAGE_KEY = "countdown_state";

const CountdownTimer = ({ initialSeconds }) => {
  const isExtended =
    new URLSearchParams(window.location.search).get("extended") === "true";

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).timeLeft : initialSeconds;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).isRunning : false;
  });

  const intervalRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ timeLeft, isRunning }));
  }, [timeLeft, isRunning]);

  // Listen for changes (for extended screen)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const data = JSON.parse(e.newValue);
        setTimeLeft(data.timeLeft);
        setIsRunning(data.isRunning);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isRunning || isExtended) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isExtended]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  };

  const handleExtend = () => {
    window.open("?extended=true", "ExtendedScreen", "width=1200,height=800");
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeUp = timeLeft === 0;

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: isTimeUp ? "#f70404" : "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4
      }}
    >
      {/* {isExtended ? <Typography></Typography>} */}
      <Typography
        sx={{
          fontSize:
            isExtended && isTimeUp ? "15px" : isExtended ? "15vw" : "10vw",
          fontWeight: 700,
          textAlign: "center"
        }}
      >
        {isTimeUp
          ? "TIME UP"
          : `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`}
      </Typography>

      {/* Hide controls on extended screen */}
      {!isExtended && (
        <Box sx={{ display: "flex", gap: 2 }}>
          {!isRunning && !isTimeUp && (
            <Button variant="contained" onClick={handleStart}>
              {timeLeft === initialSeconds ? "Start" : "Resume"}
            </Button>
          )}

          {isRunning && (
            <Button variant="outlined" onClick={handlePause}>
              Pause
            </Button>
          )}

          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>

          <Button variant="contained" color="secondary" onClick={handleExtend}>
            Extend Screen
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CountdownTimer;
