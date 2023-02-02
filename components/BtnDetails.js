import React from "react";

const BtnDetails = ({ text, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className=" w-20 h-9 rounded-full bg-[#AD8259]/20 text-[#6C5137] hover:bg-[#AD8259] hover:text-white hover:shadow-xl
        sm:text-sm lg:text-base xxxl:h-11 xxxl:text-lg"
      >
        {text}
      </button>
    </>
  );
};

export default BtnDetails;
