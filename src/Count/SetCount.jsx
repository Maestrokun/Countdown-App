import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Clock } from "iconsax-reactjs";

const SetCount = ({ onStart }) => {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("seconds");

  const startTimer = () => {
    if (!value) return;

    const seconds =
      unit === "seconds" ? parseInt(value, 10) : parseInt(value, 10) * 60;

    onStart(seconds);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Clock size="318" color="#fff" />
        <Typography sx={{ fontSize: "4vw", fontWeight: 700 }}>
          Set Timer
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={unit === "seconds" ? "Seconds" : "Minutes"}
            type="number"
            sx={{ background: "#fff", borderRadius: 2 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                startTimer();
              }
            }}
          />

          <Button
            variant="contained"
            onClick={startTimer}
            sx={{
              backgroundColor: "#003399",
              border: "1px solid #003399",
              "&:hover": { backgroundColor: "#fff", color: "#000" },
            }}
          >
            <PlayArrowIcon />
          </Button>
        </Box>

        <Button
          variant="outlined"
          sx={{
            color: "white",
            border: "1px solid white",
            textTransform: "none",
          }}
          onClick={() =>
            setUnit((prev) => (prev === "seconds" ? "minutes" : "seconds"))
          }
        >
          Switch to {unit === "seconds" ? "Minutes" : "Seconds"}
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
          Copyright © maestro 2023
        </Typography>
      </Box>
    </Box>
  );
};

export default SetCount;
