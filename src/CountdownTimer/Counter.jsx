import React, { useEffect, useRef, useState } from "react";
// import "./CountdownTimer.css";
import { Box, Button } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
};

const Counter = ({ countdownTime, onRefresh }) => {
  const [countdown, setCountDown] = useState(countdownTime);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
      setIsTimeUp(true);
    }
  }, [countdown]);

  const handleRefresh = () => {
    setIsTimeUp(false);
    setCountDown(countdownTime);
    onRefresh();
  };


  return (
    <Box display={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "28px", fontWeight: 700 }}>
      {isTimeUp ? (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center", backgroundColor: "#f70404", color: '#FFFFFF', width: '100vw', height: '100vh',
          fontSize: '340px',
          fontWeight: 700 }}>
          <Box>TIME UP</Box>
          <Button variant="contained" color="primary" onClick={handleRefresh} sx={{ marginTop: "20px", width: "30px", height: "50px", borderRadius: '50%' }}>
              <RefreshIcon />
            </Button>
        </Box>
      ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000', color: '#FFFFFF', width: '100vw', height: '100vh', }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000', color: '#FFFFFF', fontSize: '500px',
          fontWeight: 700 }}>{formatTime(countdown)}</Box>
            <Button variant="contained" color="primary" onClick={handleRefresh} sx={{width: "20px", height: "50px", borderRadius: '50%' }}>
              <RefreshIcon />
            </Button>
          </Box>
      )}
    </Box>
  );
};

export default Counter;
