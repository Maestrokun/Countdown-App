import React, { useState } from "react";
// import "../CountdownTimer/CountdownTimer.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const SetCount = ({ handleStart }) => {
  const [countdownTime, setCountdownTime] = useState("");
  const [inputType, setInputType] = useState("seconds");

  const handleStartTimerClick = () => {
    const timeInSeconds =
      inputType === "seconds"
        ? parseInt(countdownTime, 10)
        : parseInt(countdownTime, 10) * 60;
    // console.log(`Starting timer with ${countdownTime} seconds`);
    handleStart(timeInSeconds);
  };

  const handleCountdownTimeChange = (event) => {
    setCountdownTime(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleStartTimerClick();
    }
  };

  const handlePresetClick = (presetTimeInMinutes) => {
    const timeInSeconds = presetTimeInMinutes * 60;
    console.log(`Starting timer with ${timeInSeconds} seconds`);
    handleStart(timeInSeconds);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000000",
        color: "#FFFFFF",
        gap: 8
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: '93vw', px:2 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: '90%'
          }}
        >
          <Typography sx={{ fontSize: "300px", fontWeight: 700 }}>
            00:00
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 2
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2
              }}
            >
              <TextField
                placeholder={inputType === "seconds" ? "Seconds" : "Minutes"}
                variant="outlined"
                sx={{ color: "#fff", background: "#fff", borderRadius: "10px" }}
                value={countdownTime}
                onChange={handleCountdownTimeChange}
                onKeyPress={handleKeyPress}
              />
              <Box>
                <Button
                  variant="contained"
                  sx={{ width: 30, height: 50, borderRadius: "50%" }}
                  onClick={handleStartTimerClick}
                >
                  <PlayArrowIcon />
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "capitalize" }}
                onClick={() =>
                  setInputType(inputType === "seconds" ? "minutes" : "seconds")
                }
              >
                {inputType === "seconds" ? "Minutes" : "Seconds"}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 6, gap: 2, width: '7%' }}>
          {[5, 10, 15, 20, 30].map((time) => (
            <Button
              key={time}
              variant="outlined"
              sx={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                "&:hover": { backgroundColor: "#1976D2", color: "#FFFFFF" },
                textTransform: "capitalize"
              }}
              onClick={() => handlePresetClick(time)}
            >
              {time} Mins
            </Button>
          ))}
        </Box>
      </Box>
      <Typography sx={{ fontSize: "12px", fontWeight: 600, mb: 2 }}>
        Copyright @Maestro, 2023
      </Typography>
    </Box>
  );
};

export default SetCount;
