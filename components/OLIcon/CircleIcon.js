import React from "react";
function CircleIcon({ icon }) {
  return (
    <div className="rounded-full w-6 h-6 bg-[#FEF0BF]/40 flex text-center items-center justify-center ">
      <p className="text-[#A17851] p-0.5">{icon}</p>
    </div>
  );
}

export default CircleIcon;
