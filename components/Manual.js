import React from "react";
import ManualCanvas from "./ManualCanvas";
import Dialog from "@mui/material/Dialog";

function Manual({ onClose, open, setOpen }) {
  const handleClose = () => {
    onClose(true);
    setOpen(false);
  };

  return (
    <Dialog
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      sx={{
        "& .MuiDialog-paper": {
          width: "50%",
          boxShadow: "none",
          borderRadius: "8px",
          "@media (max-width:600px)": {
            width: "80%",
          },
        },
      }}
    >
      <div className="pb-4 px-10 overflow-hidden scrollbar-hide">
        <ManualCanvas />
      </div>
    </Dialog>
  );
}

export default Manual;
