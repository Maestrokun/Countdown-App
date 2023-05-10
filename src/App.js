import React, { useState } from "react";
import Counter from "./CountdownTimer/Counter";
import SetCount from "./Count/SetCount";
import { Grid } from "@mui/material";

const App = () => {
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownTime, setCountdownTime] = useState("");

  const handleStart = (countdownTime) => {
    // Render the Countdown component and pass countdownTime as a prop
    setShowCountdown(true);
    setCountdownTime(countdownTime);
  };

  return (
    <Grid sx={{ maxHeight: "1164px" }}>
      {showCountdown ? (
        <Counter countdownTime={countdownTime} />
      ) : (
        <SetCount handleStart={handleStart} />
      )}
    </Grid>
  );
};

export default App;
