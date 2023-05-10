import React, { useEffect, useRef, useState } from "react";
import "./CountdownTimer.css";

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
};

const Counter = ({ countdownTime }) => {
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

  return (
    <div>
      {isTimeUp ? (
        <div className="final">TIME UP</div>
      ) : (
        <div className="countdown-timer">{formatTime(countdown)}</div>
      )}
    </div>
  );
};

export default Counter;
