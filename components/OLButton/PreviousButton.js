import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function PreviousButton({ handleClick }) {
  return (
    <div className="rounded-full md:w-fit md:px-6 md:py-2 md:h-fit hover:bg-[#ACDED5]/20 hover:underline">
      <button
        onClick={handleClick}
        className="flex align-middle items-center text-[#005844] cursor-pointer"
      >
        <ArrowBackIosIcon />
        <p className="caption lg:body1 tracking-wide font-semibold">ย้อนกลับ</p>
      </button>
    </div>
  );
}

export default PreviousButton;