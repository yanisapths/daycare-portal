import React from "react";
import { signIn as SignIntoProvider } from "next-auth/react";
import Image from "next/image";

const btnLogin = ({ provider }) => {
  return (
    <div className="">
      <btn
        className="block p-[2px] md:p-[3px] md:w-80  md:pl-1 md:pr-0 mr-3 w-40 h-15  rounded-full bg-transparent  active:text-opacity-75 focus:outline-none focus:ring"
        onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })}
      >
        <span className="text-xs block px-5 py-3 md:px-8 md:py-7  md:text-lg text-center  font-extrabold bg-white rounded-full hover:bg-transparent ">
          ลงชื่อเข้าใช้ด้วย {provider.name}
        </span>
      </btn>
    </div>
  );
};
export default btnLogin;
