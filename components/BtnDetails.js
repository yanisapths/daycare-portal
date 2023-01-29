import React from "react";

const BtnDetails = ({ text, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="shadow-lg bg-[#6C5137] text-white 
        lg:w-24 lg:h-10 border-2 border-[#6C5137] hover:text-[#FFEAB2] hover:bg-[#6C5137]/90 hover:border-transparent rounded-2xl 
        sm:text-sm w-20 h-8 lg:text-base xxxl:h-11 xxxl:text-lg"
      >
        {text}
      </button>
    </>
  );
};

export default BtnDetails;
