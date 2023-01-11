import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AddBtn = () => {
  return (
    <>
      <button
        className="  border-2  bg-[#F3BD33]/80  hover:bg-[#6C5137]/70 text-[#6C5137]
                font-bold text-base sm:text-sm hover:text-white w-20  hove:border-transparent rounded-2xl
                sm:h-8 lg:h-10 lg:w-24"
      >
        <AddIcon />
        เพิ่ม
      </button>
    </>
  );
};

export default AddBtn;
