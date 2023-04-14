import React from "react";
import Image from "next/image";

function BannerCard({ username }) {
  return (
    <div className="w-full pt-2 pb-4 xl:pb-8">
      <img
        src="/dashboardBG.jpg"
        className="rounded-2xl object-cover md:flex w-full h-[180px] xl:h-[220px] justify-between shadow-lg shadow-[#A17851]/60 text-[#FFFBF2]"
        alt="Dashbaord bg"
      />
      <div className="static">
        <div className=" text-[#FFFBF2] -mt-40 px-8 sm:-mt-[165px]">
          <div className="text-[#FFFBF2] caption">
            {new Date().toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </div>
          <div className="flex text-[#FFFBF2] pb-4 pt-2">
            <p className="h3 pr-2 text-[#FFFBF2] sm:text-xl">Welcome, </p>
            <p className="h3 sm:text-xl sm:flex sm:flex-wrap ">{username}</p>
          </div>
          <p className="h5 mt-6 sm:text-lg sm:mt-6">Administrator</p>
        </div>
      </div>
    </div>
  );
}

export default BannerCard;
