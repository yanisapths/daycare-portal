import React from "react";
import Image from "next/image";

function BannerCard({ username }) {
  return (
    <div className="rounded-2xl  shadow-lg shadow-[#A17851]/60 text-[#FFFBF2] ">
      <div className="md:flex relative h-40 rounded-2xl bg-[#A17851] p-2 justify-between pb-4">
        <div className="">
          <Image
            src="/dashboardBG.jpg"
            alt="background of dashboard"
            layout="fill"
            className="rounded-2xl"
          />
        </div>
        <div className="px-6 py-4 mt-6 absolute">
          <div className="flex text-[#FFFBF2]">
            <p className="h3 pr-2 text-[#FFFBF2] ">Welcome, </p>
            <p className="h3 ">{username}</p>
          </div>
          <p className="h5 mt-6 ">Administrator</p>
        </div>
        <div className="caption px-6 md:h5 md:px-8 md:mt-2 mt-2 absolute">
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
