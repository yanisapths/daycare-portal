import React from "react";
import Image from "next/image";
import BtnDetails from "../../../components/BtnDetails";
import BtnEdit from "../../../components/BtnEdit";
import WorkIcon from "@mui/icons-material/Work";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VerifiedIcon from "@mui/icons-material/Verified";
import InfoIcon from "@mui/icons-material/Info";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function ListView({ staffData }) {
  if (staffData) {
    return (
      <>
        <article className="w-full overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl bg-white mt-4 p-4">
        <div className="flex flex-row gap-3 justify-start content-center text-sm pt-2 px-6">
              <div className="basis-12/12">
                <div className="grid grid-col-6 gap-2 mt-4">
                  <div className="col-start-1 col-end-7 lg:flex">
                    {staffData.nickName ? (
                      <p className="font-bold text-base text-[#6C5137] sm:text-lg md:text-xl lg:text-2xl">
                        {staffData.nickName}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="itemContainer">
                    <span className="font-semibold sm:hidden">
                      ชื่อ:
                    </span>
                    {staffData.firstName ? (
                      <span className="text-xl">{staffData.firstName} {staffData.lastName}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="itemContainer">
                    <span className="text-[#969696]">
                      <WorkIcon />
                    </span>
                    <span className="font-semibold sm:hidden">
                      ตำแหน่ง:
                    </span>
                    {staffData.position ? (
                      <span className="lg:text-xl"> {staffData.position}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="itemContainer">
                    <span className="text-[#969696] ">
                      <HowToRegIcon />
                    </span>
                    <span className="font-semibold sm:hidden">
                      อายุ:
                    </span>
                    <span className="lg:text-xl"> {staffData.age}</span>
                  </div>
                  <div className="itemContainer">
                    <span className="text-[#969696] ">
                      <VerifiedIcon />
                    </span>
                    <span className="font-semibold sm:hidden">
                      เพศ:
                    </span>
                    <span className="lg:text-xl"> {staffData.sex}</span>
                  </div>
                  <div className="itemContainer">
                    <span className="text-[#969696] ">
                      <InfoIcon />
                    </span>
                    <span className="font-semibold sm:hidden">
                      LINE ID:
                    </span>
                    <span className="lg:text-xl"> {staffData.lineId}</span>
                  </div>
                  <div className="itemContainer">
                    <span className="text-[#969696] ">
                      <LocalPhoneIcon />
                    </span>
                    <span className="font-semibold sm:hidden">
                      เบอร์โทรศัพท์:
                    </span>
                    <span className="lg:text-xl"> {staffData.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap basis-1/5 gap-2 justify-end content-center px-4 pb-2">
              <div>
                <BtnDetails text="ดูเพิ่มเติม" />
              </div>
            </div>
        
        </article>
      </>
    );
  } else {
    return <></>;
  }
}

export default ListView;
