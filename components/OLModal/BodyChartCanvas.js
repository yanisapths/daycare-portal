import React from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "../../styles/drawingpad.module.css";
import { TextField } from "@mui/material";

function BodyChartCanvas({ data, bodyChart, setOpenCanvas, saveChart,information,handleChange }) {
  return (
    <div className="absolute w-full h-[650px] top-[-80px] bottom-0 left-0 right-0 justify-center align-middle shadow-3xl shadow-black/5 bg-white rounded-xl">
      <div className="border-2 bg-white w-full h-full py-2 rounded-xl">
        <div className="w-full h-5/6">
          <div className={styles.sigPadContainer}>
            <SignatureCanvas
              backgroundColor="rgba(255, 255, 255, 0)"
              penColor="blue"
              canvasProps={{ className: "w-full h-full" }}
              ref={bodyChart}
            />
          </div>
        </div>
        <div className="px-8 -mt-16">
          <TextField
            sx={{
              background: "white",
              borderColor: "#AD8259"
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
        <div className="flex justify-center gap-2 pt-6">
          <button
            className="cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-1 hover:bg-black/5"
            onClick={() => setOpenCanvas(false)}
          >
            Cancel
          </button>
          <button
            className="cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-1 hover:bg-black/5"
            onClick={() => saveChart(information,data._id)}
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
    </div>
  );
}

export default BodyChartCanvas;
