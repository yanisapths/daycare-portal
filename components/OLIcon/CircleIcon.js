import React from "react";
function CircleIcon({ icon }) {
  return (
    <div className="rounded-full w-8 h-8 bg-[#FEF0BF]/40 text-center items-center">
      <p className="text-[#A17851] p-0.5">{icon}</p>
    </div>
  );
}

export default CircleIcon;
