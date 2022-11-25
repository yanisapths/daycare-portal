import React from "react";
import Image from "next/image";
import Link from "next/link";

function MediumCard({ img, title, link }) {
  return (
    <div className="cursor-pointer m-auto xl:space-x-16  hover:scale-105 transition transform duration-500 ease-out">
      <div className="relative h-60 w-80  text-5xl text-teal-800 hover:rounded-2xl rounded-2xl   hover:shadow-3xl hover:shadow-teal-100 border-4  hover:border-teal-400">
        <Link href={link} className="cursor-pointer ">
          <Image src={img} layout="fill" className="rounded-xl opacity-40" />
        </Link>
        <h3 className="relative text-center font-noto font-extrabold m-auto pt-20">
          {title}
        </h3>
        <span className="border-b  block relative inset-x-0 w-5/6 h-px -bottom-px "></span>
      </div>
    </div>
  );
}

export default MediumCard;
