import React from "react";

const BtnDetails = ({ text, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="shadow-lg bg-[#6C5137] text-white 
        w-20 h-9  border-2 border-[#6C5137] hover:text-[#FFEAB2] hover:bg-[#6C5137]/90 hover:border-transparent rounded-2xl 
        sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg"
      >
        {text}
      </button>
    </>
  );
};

export default BtnDetails;
