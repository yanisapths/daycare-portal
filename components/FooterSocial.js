import React from "react";
import Image from "next/image";

function FooterSocial() {
  return (
    <footer className="bg-[#FFEAB2] mt-0 bottom-0 text-[#A17851]">
      <div className="max-w-screenl px-4 pb-2 mx-auto sm:px-6 lg:px-14">
        <div className="pt-2 sm:items-center sm:justify-between sm:flex">
          <nav className="flex justify-between items-center text-center space-x-4 text-sm font-medium sm:justify-start">
            <div>
              <p className=" pt-2">269492 Project</p>
              <p className="">Faculty of Engineering</p>
              <p className="">Chiangmai University</p>
            </div>
            <div>
              <Image
                src="/asset/logo-nobg.png"
                width="70"
                height="70"
              />
              <p className="h6 font-bold italic">Olive</p>
              <p className="caption italic">by Happy Elders</p>
            </div>
            <div>
              <p className="font-semibold text-left">Contact Us</p>
              <p>Yanisa Poongthaisong</p>
              <p>Pavinee Suthamjaem</p>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default FooterSocial;
