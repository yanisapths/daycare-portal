import React from "react";

const BtnCancel = ({ text, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="text-[#FF2F3B] hover:bg-[#FF2F3B]/10 hover:rounded-2xl w-20 h-9 
        text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg"
      >
        {text}
      </button>
    </>
  );
};

export default BtnCancel;
