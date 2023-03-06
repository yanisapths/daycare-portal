import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "../../styles/drawingpad.module.css";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

function BodyChartCanvas({
  data,
  bodyChart,
  setOpenCanvas,
  saveChart,
  information,
  handleChange,
  openDialog
}) {
  const [penColor, setPenColor] = useState("#94CDDA");
  const colors = ["#94CDDA","#0500FF","#2ED477", "#FF2F3B", "#F3BD33"];
  return (
    <Dialog
    open={openDialog}
    maxWidth="md"
  >
    <DialogContent className="w-full h-[680px] top-[-80px] bottom-0 left-0 right-0 justify-center align-middle shadow-3xl shadow-black/5 bg-white rounded-xl scrollbar-hide">
      <div className="bg-white w-full h-full rounded-xl">
        <div className="px-2 pt-4 space-x-3">
          <span className="">สีปากกา:</span>
          {colors.map((color) => (
            <span
              key={color}
              style={{
                backgroundColor: color,
                border: `${color === penColor ? `2px solid ${color}` : ""}`,
                boxShadow:`${color === penColor ? `1px 2px 12px 1px ${color}` : ""}`,
              }}
              className="px-4 py-[2px] rounded-full"
              onClick={() => setPenColor(color)}
            ></span>
          ))}
        </div>
        <div className="w-full h-5/6">
          <div className={styles.sigPadContainer}>
            <SignatureCanvas
              backgroundColor="rgba(255, 255, 255, 0)"
              penColor={penColor}
              canvasProps={{ className: "w-full h-full" }}
              ref={bodyChart}
            />
          </div>
        </div>
        <div className="px-8 -mt-12">
          <TextField
            sx={{
              background: "white",
              borderColor: "#AD8259",
            }}
            fullWidth
            placeholder="ใส่รายละเอียดเพิ่มเติม หรือโน้ตข้อมูลต่างๆเกี่ยวกับลูกค้า 😊"
            multiline
            rows={2}
            value={information}
            onChange={handleChange}
            name="information"
          />
        </div>
        <div className="flex justify-center gap-2 pt-6 pb-4">
          <button
            className="cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-1 hover:bg-black/5"
            onClick={() => setOpenCanvas(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[#ffe898] cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-1 hover:bg-black/5"
            onClick={() => saveChart(information, data._id)}
          >
            Save
          </button>
          <button
            className="cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-1 hover:bg-black/5"
            onClick={() => bodyChart.current.clear()}
          >
            Clear
          </button>
        </div>
      </div>
    </DialogContent>
    </Dialog>
  );
}

export default BodyChartCanvas;
