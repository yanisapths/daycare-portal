import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PickCalendar from "../../components/calendar/PickCalendar";

function TimeModal({
  data,
  open,
  handleClose,
  getSelectedDate,
  handleDateSelect,
}) {
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState("");
  const theme = useTheme();

  return (
    <>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        sx={{ justifyContent: "center" }}
      >
        <DialogTitle
          sx={{
            color: theme.palette.secondary.main,
            fontSize: 20,
            fontWeight: 600,
            mx: 2,
            mt: 2,
          }}
        >
          เลือกวัน/เวลา
        </DialogTitle>
        <DialogContent>
          <Box>
            <div className="mx-auto max-w-screen-xl">
              <div>
                <PickCalendar
                  availables={data}
                  setSelected={setSelected}
                  getSelectedDate={getSelectedDate}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mx: 4, mb: 4, justifyContent: "center" }}>
          <button
            className="w-24 h-12 outline-none rounded-3xl 
            hover:bg-black/5"
            onClick={handleClose}
          >
            <p
              className="sm:text-md lg:text-xl
            xxxl:h-11 xxxl:text-xl"
            >
              ยกเลิก
            </p>
          </button>
          <button
            onClick={handleDateSelect}
            className="drop-shadow-xl w-24 h-12 outline-none
            rounded-3xl bg-[#AD8259] hover:shadow-md hover:shadow-[#AD8259]/50 hover:bg-[#AD8259]/90"
          >
            <p
              className="text-white sm:text-md lg:text-xl
            xxxl:h-11 xxxl:text-xl"
            >
              ตกลง
            </p>
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TimeModal;
