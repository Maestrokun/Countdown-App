import React, { useState, useEffect } from "react";
// import "./CountdownTimer.css";
import { Box, Typography } from "@mui/material";

const CountdownTimer = ({ initialTime }) => {
  // Set the future time that you want to count down to
  const futureTime = new Date("2023-05-31T18:00:00Z").getTime();

  const [timeLeft, setTimeLeft] = useState(futureTime - new Date().getTime());

  useEffect(() => {
    const countdownTimer = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(countdownTimer);
  }, [timeLeft]);

  const minutes = Math.floor((timeLeft % 600000) / 46000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "2em", fontWeight: 700, backgroundColor: '#000000', color: '#FFFFFF' }}>
      <Typography>{`${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}</Typography>
    </Box>
  );
};

export default CountdownTimer;
