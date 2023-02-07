import React from "react";

function BtnAdd({ onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-24  h-8  text-sm border-2 border-[#FFECA7] rounded-full sm:w-20  xxxl:h-11 xxxl:text-lg
      bg-[#FFECA7] hover:bg-[#FFECA7]/70 shadow-lg font-bold text-[#AD8259]"
      >
        เพิ่ม
      </button>
    </>
  );
}

export default BtnAdd;
