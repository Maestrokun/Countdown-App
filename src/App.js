import React, { useState } from "react";
import Counter from "./CountdownTimer/Counter";
import SetCount from "./Count/SetCount";
import { Box } from "@mui/material";

const App = () => {
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownTime, setCountdownTime] = useState("");

  const handleStart = (countdownTime) => {
    // Render the Countdown component and pass countdownTime as a prop
    setShowCountdown(true);
    setCountdownTime(countdownTime);
  };

  const handleRefresh = () => {
    setShowCountdown(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#000000", color: "#FFFFFF" }}>
      {showCountdown ? (
        <Counter countdownTime={parseInt(countdownTime, 10)} onRefresh={handleRefresh} />
      ) : (
        <SetCount handleStart={handleStart} />
      )}
    </Box>
  );
};

export default App;
