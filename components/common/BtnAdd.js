import React from "react";

function BtnAdd({ onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-24 h-8 border-2 border-[#FFECA7] text-[#6C5137]/80 rounded-full sm:text-xs sm:w-20 md:text-xs md:w-20 lg:h-9  lg:text-sm xxl:h-10 xxl:w-28 xxl:text-lg
      bg-[#ffeec4] hover:bg-[#FFECA7]/70 shadow-lg font-bold"
      >
        เพิ่ม
      </button>
    </>
  );
}

export default BtnAdd;
