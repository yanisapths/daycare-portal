import React from "react";
import Image from "next/image";

function FooterSocial() {
  return (
    <footer className="bg-[#FFEAB2] mt-0 bottom-0 text-[#A17851]">
      <div className="max-w-screenl px-4 pb-2 mx-auto sm:px-6 lg:px-14">
        <div className="pt-2 sm:items-center sm:justify-between sm:flex">
          <nav className="flex justify-between items-center text-center space-x-4 text-sm font-medium sm:justify-start">
            <div>
              <p className="body2 pt-2">269492 Project</p>
              <p className="body2">Faculty of Engineering</p>
              <p className="body2">Chiangmai University</p>
            </div>
            <div>
              <Image
                src="/asset/logo-nobg.png"
                width="70px"
                height="70px"
                layout="fixed"
              />
              <p className="h6 font-bold italic">Olive</p>
              <p className="caption italic">by Happy Elders</p>
            </div>
            <div>
              <p>Contact Us</p>
              <p>Yanisa Poongthaisong</p>
              <p>Pavinee Suthamjaem</p>
            </div>
            
          </nav>

          {/* <div className="flex text-center justify-between mt-2 sm:justify-end sm:mt-0">
            <div>
              <p className="h6 font-bold italic">Olive</p>
              <p className="caption italic">by Happy Elders</p>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default FooterSocial;
