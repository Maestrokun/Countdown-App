import React from "react";
import "../CountdownTimer/CountdownTimer.css";
import { Button, Grid, TextField } from "@mui/material";

const SetCount = ({ handleStart }) => {
  const [countdownTime, setCountdownTime] = React.useState("");

  const handleStartTimerClick = () => {
    // Do something with countdownTime, e.g. start a timer with the value
    console.log(`Starting timer with ${countdownTime} seconds`);
    handleStart(countdownTime);
  };

  const handleCountdownTimeChange = (event) => {
    setCountdownTime(event.target.value);
  };

  return (
    <div className="set-timer">
      <div>Set Countdown</div>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "flex-end",
          width: "30%",
        }}
      >
        <Grid item sx={{ mr: 2 }}>
          <TextField
            sx={{ color: "#fff", background: "#fff", borderRadius: "10px" }}
            value={countdownTime}
            onChange={handleCountdownTimeChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            sx={{ p: 2 }}
            onClick={handleStartTimerClick}
          >
            Start Count
          </Button>
        </Grid>
      </Grid>
      <div className="footer">Copyright @Maestro, 2023</div>
    </div>
  );
};

export default SetCount;
