import React from "react";

const BtnAccept = ({ text, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="w-20 h-9 rounded-full bg-[#2ED477]/20 text-[#2ED477] hover:bg-[#2ED477] hover:text-white hover:shadow-xl
        sm:text-sm lg:text-base xxxl:h-11 xxxl:text-lg"
      >
        {text}
      </button>
    </>
  );
};

export default BtnAccept;
