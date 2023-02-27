import React from "react";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ContinueButton({ handleClick }) {
  return (
    <div className="rounded-full md:w-fit md:px-6 md:py-2 md:h-fit hover:bg-[#ACDED5]/20 hover:underline">
      <button
        onClick={handleClick}
        className="flex align-middle items-center text-[#005844] cursor-pointer"
      >
        <p className="caption lg:body1 tracking-wide font-semibold">ถัดไป</p>
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
}

export default ContinueButton;