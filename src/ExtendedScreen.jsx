import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const STORAGE_KEY = "countdown_state";

const ExtendedScreen = () => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { timeLeft: 0 };
  });

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setState(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  const isTimeUp = state.timeLeft === 0;

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: isTimeUp ? "#f70404" : "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "15vw", fontWeight: 700 }}>
        {isTimeUp
          ? "TIME UP"
          : `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`}
      </Typography>
    </Box>
  );
};

export default ExtendedScreen;
