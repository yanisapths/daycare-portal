import React from "react";
import Button from "@mui/material/Button";

function StatusCheckIcon({ icon, text, bgColor, textColor }) {
  return (
    <Button
      variant="outlined"
      sx={{
        p: 0.5,
        borderRadius: 35,
        color: textColor,
        borderColor: bgColor,
        "&:hover": {
          borderColor: bgColor,
        },
      }}
    >
      <p className="">{icon}</p>
      <span className="px-1 text-sm font-bold">{text}</span>
    </Button>
  );
}

export default StatusCheckIcon;
