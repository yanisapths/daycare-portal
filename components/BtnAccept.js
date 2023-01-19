import React from "react";

const BtnAccept = ({text,onClick}) => {
  return (
    <>
      <button
      onClick={onClick}
        className="shadow-lg bg-[#2ED477] text-white 
        w-20 h-9  border-2 border-[#2ED477] hover:text-[#2ED477] hover:bg-[#2ED477]/20 hover:border-transparent rounded-2xl sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg"
      >
        {text}
      </button>
    </>
  );
};

export default BtnAccept;
