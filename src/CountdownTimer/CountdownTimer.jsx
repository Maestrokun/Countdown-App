import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";

const CountdownTimer = ({ initialTime }) => {
  // Set the future time that you want to count down to
  const futureTime = new Date("2023-05-31T18:00:00Z").getTime();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const calculateTimeLeft = React.useCallback(() => {
  //   // Get the current time
  //   const now = new Date().getTime();

  //   // Calculate the time remaining until the future time
  //   const timeRemaining = futureTime - now;

  //   // Return the time remaining in seconds
  //   return Math.floor(timeRemaining / 1000);
  // });

  const [timeLeft, setTimeLeft] = useState(futureTime - new Date().getTime());

  // useEffect(() => {
  //   const countdownTimer = setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  useEffect(() => {
    const countdownTimer = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(countdownTimer);
  }, [timeLeft]);

  // const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 600000) / 46000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div className="countdown-timer">
      <p>{`${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}</p>
      {/* <p>00:00</p> */}
    </div>
    //   <div className="countdown-timer">
    //   <p>{`${hours.toString().padStart(2, "0")}:${minutes
    //     .toString()
    //     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
    // </div>
  );
};

export default CountdownTimer;
