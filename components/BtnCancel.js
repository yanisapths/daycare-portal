import React from "react";

const BtnCancel = ({ text,onClick }) => {
  return (
    <>
      <button
      onClick={onClick}
        className="shadow-lg bg-[#FF2F3B] text-white 
        w-20 h-9  border-2 border-[#FF2F3B] hover:text-[#FF2F3B] hover:bg-[#FF2F3B]/20 hover:border-transparent rounded-2xl sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg"
      >
        {text}
      </button>
    </>
  );
};

export default BtnCancel;
