import React, {useState} from "react";
import Link from "next/link";


function ManualButton({handleOpen}) {
  return (
    <button onClick={handleOpen} className="cursor-pointer fixed sm:bottom-12 sm:inset-x-0 sm:mx-24 text-center bottom-5 right-5 shadow-black/10 shadow-3xl rounded-full bg-[#FDFFF5]/40 px-10 w-54 h-fit py-2  hover:bg-[#FFECA7]">
        <p className="p-1 font-bold">คุู่มือการใช้งาน</p>
    </button>
  );
}

export default ManualButton;
