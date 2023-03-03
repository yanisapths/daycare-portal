import React from 'react'
import SignatureCanvas from "react-signature-canvas";
import styles from "../../styles/drawingpad.module.css";

function BodyChartCanvas({data, bodyChart,setOpenCanvas,saveChart  }) {
  return (
    <div className="fixed w-full h-[550px] top-[-50px] bottom-0 left-0 right-0 justify-center align-middle shadow-3xl shadow-black/5 bg-white rounded-xl">
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
      <div className="flex justify-center gap-2 pt-6">
        <button
          className="cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-1 hover:bg-black/5"
          onClick={() => setOpenCanvas(false)}
        >
          Cancel
        </button>
        <button
          className="cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-1 hover:bg-black/5"
          onClick={() => saveChart(data._id)}
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
  )
}

export default BodyChartCanvas