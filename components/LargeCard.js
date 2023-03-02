import React from "react";
import Image from "next/image";
import Link from "next/link";

function LargeCard({ img, title, description, buttonText, link }) {
  return (
    <div className="relative py-16 cursor-pointer xl:max-w-5xl">
      <div className="relative h-96 min-w-[300px]  hover:scale-105 transition transform duration-400 ease-out">
        <Image
          src={img}
          layout="fill"
          objectfit="cover"
          className="rounded-2xl opacity-85 "
        />
      </div>
      <div className="absolute md:top-32 md:left-12 xl:top-28 top-28 left-4">
        <h3 className="text-2xl md:text-4xl md:w-[60%] mb-3 w-64 text-white font-black  xl:w-100  p-2 md:p-0">
          {title}
        </h3>
        <p className="text-black font-black text-xs w-[80%] md:text-xl shadow-3xl xl:text-2xl xl:w-[70%] md:w-[50%] font-noto p-2  bg-emerald-50">
          {description}
        </p>
        <Link href={link}>
          <button className="text-xl text-teal-600  bg-white px-8 py-2 rounded-full mt-5 font-extrabold shadow-2xl font-noto ">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LargeCard;
