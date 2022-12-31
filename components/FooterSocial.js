import React from "react";
import Image from "next/image";

function FooterSocial() {
  return (
    <footer className="bg-[#FFEAB2] text-[#A17851]">
      <div className="max-w-screenl px-4 pb-2 mx-auto sm:px-6 lg:px-14">
        <div className="pt-6 mt-12 sm:items-center sm:justify-between sm:flex">
         
          <nav className="flex justify-center space-x-4 text-sm font-medium sm:justify-start">
          <Image src="/asset/logo-nobg.png" width="70px" height="70px" layout="fixed" />
          </nav>

          <div className="text-center justify-center mt-2 sm:justify-end sm:mt-0">
          <p className="h6 font-bold italic">Olive</p>
          <p className="caption italic">by Happy Elders</p>
          <p className="body2 pt-2">269492 Project</p>
          <p className="body2">Faculty of Engineering</p>
          <p className="body2">Chiangmai University</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSocial;
