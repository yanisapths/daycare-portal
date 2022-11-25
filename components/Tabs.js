import React from "react";

function Tabs({ id, title, setSelected, active }) {
  return (
    <div
      className="inline-flex justify-center items-center cursor-pointer p-2 pl-0"
      onClick={() => setSelected(id)}
    >
      <span
        className={
          active
            ? "absolute inset-x-0 w-full h-px bg-teal-400 -bottom-px"
            : "absolute inset-x-0 w-full h-px bg-gray-100 -bottom-px"
        }
      ></span>
      <span className=" text-sm font-medium text-gray-600 mr-10 md:text-lg ">
        {" "}
        {title}{" "}
      </span>
    </div>
  );
}

export default Tabs;
