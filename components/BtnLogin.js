import React from "react";
import { signIn as SignIntoProvider } from "next-auth/react";

const btnLogin = ({ provider }) => {
  return (
    <>
      <btn
        className="block xxl:text-xs pr-4 lg:h-10 rounded-full bg-transparent active:text-opacity-75 focus:outline-none focus:ring"
        onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })}
      >
        <span className="text-sm flex items-center justify-center  w-full px-3 sm:h-10 md:h-10 lg:text-base lg:h-10 py-1 xxl:py-3 xl:text-lg bg-white rounded-full hover:bg-transparent">
          ลงชื่อเข้าใช้ด้วย {provider.name}
        </span>
      </btn>
    </>
  );
};
export default btnLogin;
