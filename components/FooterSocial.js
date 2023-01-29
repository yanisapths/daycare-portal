import React from "react";
import Image from "next/image";

function FooterSocial() {
  return (
    <footer className="bg-[#FFFBF2] mt-10 bottom-0 text-[#372B20] py-8 xl:py-16">
      <div className="max-w-screenl px-4 pb-2 mx-auto sm:px-6 lg:px-14">
        <div className="pt-2 sm:items-center sm:justify-between sm:flex">
          <nav className="flex justify-between items-center text-center space-x-4 text-sm font-medium sm:justify-start">
            <div>
              <p className="xl:body1 pt-2 text-left">269492 Project</p>
              <p className="xl:body1">Faculty of Engineering</p>
              <p className="xl:body1">Chiangmai University</p>
            </div>
            <div>
              <Image
                src="/asset/OLlogo.png"
                width="70"
                height="90"
                layout="fixed"
              />
              <p className="xl:h4 font-bold italic">Olive</p>
              <p className="xl:h6 italic">Made by Happy Elders</p>
            </div>
            <div>
              <p className="font-semibold text-left xl:h4">Contact Us</p>
              <p className="xl:body1">Yanisa Poongthaisong</p>
              <p className="xl:body1">Pavinee Suthamjaem</p>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default FooterSocial;
