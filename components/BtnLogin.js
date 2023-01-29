import React from "react";
import { signIn as SignIntoProvider } from "next-auth/react";

const btnLogin = ({ provider }) => {
  return (
    <div className="">
      <btn
        className="block p-[3px] pl-1 pr-0 mr-3 h-15 w-[180px] xl:w-[250px] rounded-full bg-transparent active:text-opacity-75 focus:outline-none focus:ring"
        onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })}
      >
        <span className="text-xs block w-full px-5 py-3 xl:text-lg bg-white rounded-full hover:bg-transparent">
          ลงชื่อเข้าใช้ด้วย {provider.name}
        </span>
      </btn>
    </div>
  );
};
export default btnLogin;
