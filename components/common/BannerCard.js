import React from "react";

function BannerCard({ username }) {
  return (
    <div className="rounded-2xl shadow-lg shadow-[#ECE656]/60">
      <div className="md:flex rounded-2xl bg-[#F5F2AA] p-2 justify-between">
        <div className="px-6 py-4">
          <div className="flex">
            <p className="h4 pr-2 text-black/80">Welcome, </p>
            <p className="h4">{username}</p>
          </div>
          <p className="h6 text-black/ mt-2 ">Administrator</p>
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
