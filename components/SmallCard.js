import React from "react";
import Image from "next/image";

function SmallCard({ img, title }) {
  return (
    <div className="rounded-xl cursor-pointer hover:bg-teal-50 hover:scale-105 transition transform duration-200 ease-out">
      <div className="relative h-32 w-32 md:h-60 md:w-60 ">
        <Image src={img} layout="fill" className="rounded-lg opacity-70" />
        <h3 className="relative text-center text-lg font-medium m-auto pt-12  md:pt-28 ">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default SmallCard;
