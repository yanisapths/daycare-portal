import React from "react";

function BannerCard({ username }) {
  return (
    <div className="rounded-2xl shadow-lg shadow-[#A17851]/60 text-[#FFFBF2]">
      <div className="md:flex rounded-2xl bg-[#A17851] p-2 justify-between pb-4">
        <div className="px-6 py-4">
          <div className="flex text-[#FFFBF2]">
            <p className="h4 pr-2 text-[#FFFBF2]">Welcome, </p>
            <p className="h4">{username}</p>
          </div>
          <p className="h6 mt-2 ">Administrator</p>
        </div>
        <div className="caption px-6 md:h5 md:px-8 md:mt-2">
          {new Date().toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </div>
      </div>
    </div>
  );
}

export default BannerCard;
