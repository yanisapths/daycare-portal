import React from "react";

function BtnAdd({ onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-24 lg:w-36 h-10 border-2 border-[#FFECA7] rounded-full sm:text-sm lg:h-12 lg:text-base xxxl:h-11 xxxl:text-lg
      bg-[#FFECA7] hover:bg-[#FFECA7]/70 shadow-lg font-bold"
      >
        เพิ่ม
      </button>
    </>
  );
}

export default BtnAdd;
