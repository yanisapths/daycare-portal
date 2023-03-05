import React, { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styles from "../../styles/drawingpad.module.css";

function EventBodyChart({ openDialog, handleDialogClose, data }) {
  return (
    <Dialog onClose={handleDialogClose} open={openDialog} maxWidth="md">
      <DialogContent>
        <div className="justify-center align-middle scrollbar-hide overflow-hidden">
          <div className="border-2 bg-white w-full h-full rounded-xl">
            <div className="w-full h-full">
              <div className={styles.sigPadContainer}>
                <img
                  src={data.bodyChart}
                  alt="bodyChart"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <p className="text-sm py-6 px-2">
            🔖<span className="text-[#FF2F3B]">บันทึก: </span>
            {data.note}
          </p>
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", p: 1, pb: 4 }}>
        <button
          className="cursor-ponter border-2 w-fit h-fit rounded-full p-8 py-2 hover:bg-black/5"
          onClick={handleDialogClose}
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default EventBodyChart;
