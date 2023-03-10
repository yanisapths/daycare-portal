import React from "react";
import Image from "next/image";
import link from "next/link";

function FooterSocial() {
  return (
    <footer className="bg-[#FFFBF2]  bottom-0 text-[#372B20] py-2 h-auto">
      <div className="max-w-screen px-4 pb-2 mx-auto sm:px-6 lg:px-14">
        <div className="sm:items-center sm:justify-between sm:flex">
          <nav className="flex justify-between items-center text-center space-x-4 text-sm font-medium sm:justify-start">
            <div>
              <p className="text-base pt-2 text-center font-bold">269492 Project</p>
              <p className="text-base">Faculty of Engineering</p>
              <p className="text-base">Chiangmai University</p>
            </div>
            <div className="text-center">
              <Image
                src="/asset/OLlogo.png"
                width="70"
                height="90"
                layout="fixed"
              />
              <p className=" font-bold italic">Olive</p>
              <p className=" italic">Made by Happy Elders</p>
            </div>
            <div>
              <p className="font-semibold text-center text-base">Contact Us</p>
              <p className="text-base">olive.happyelders@gmail.com</p>
              
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default FooterSocial;
