import React from "react";
import Image from "next/image";


function FooterSocial() {

  const Mailto = ({ email, subject = '', body = '', children }) => {
    let params = subject || body ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
  
    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };
  return (
    <footer className="bg-[#FFFBF2]  bottom-0 text-[#372B20] py-2 h-auto">
      <div className="max-w-screen px-4 pb-2 mx-auto sm:px-2 lg:px-14">
        <div className="sm:items-center sm:justify-between sm:flex ">
          <nav className="flex justify-between items-center text-center space-x-4 text-sm font-medium sm:justify-start">
            <div>
              <p className="text-base pt-2 text-center font-bold sm:text-sm">269492 Project</p>
              <p className="text-base sm:text-xs">Faculty of Engineering</p>
              <p className="text-base sm:text-xs">Chiangmai University</p>
            </div>
            <div className="text-center">
              <Image
                src="/asset/OLlogo.png"
                width="70"
                height="90"
                layout="fixed"
              />
              <p className=" font-bold italic text-xl sm:text-sm">Olive</p>
              <p className="text-lg italic sm:text-xs">Made by Happy Elders</p>
            </div>
            <div className="">
              <p className="font-semibold text-center text-base sm:text-sm">Contact Us</p>
              <Mailto email="olive.happyelders@gmail.com" subject="Hello Yanisa, Pavinee!" body="">
                   <p className="text-base sm:hidden "> olive.happyelders@gmail.com</p>
                   <p className="md:hidden lg:hidden xl:hidden xxl:hidden text-base cursor-pointer sm:text-xs sm:pt-2 text-gray-500 ">Click  to send email</p>
              </Mailto>
              
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default FooterSocial;
