import React from "react";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

function HoverCard({ key,name, amount, duration, totalPrice, procedures }) {
  const theme = useTheme();
  return (
    <div className="group relative block h-[20rem] md:h-[30rem] cursor-pointer">
      <div className="relative rounded-2xl flex h-full transform items-end  transition-transform duration-1000 ease-in-out bg-[#F5F2AA] group-hover:bg-[#ECE656] shadow-xl shadow-[#ECE656]/60">
        <div className="px-8 pb-10 transition-opacity group-hover:absolute group-hover:opacity-0">
          <p className="h2 lg:h1 font-medium ">{name}</p>
          <Typography variant="h5" className="tracking-wide pt-4 text-black/75">
            จำนวน {amount} ครั้ง
          </Typography>
          <Typography variant="h5" className="tracking-wide pt-4 text-black/75">
            รวม {duration} ชั่วโมง/ครั้ง
          </Typography>
          <Typography variant="h5" className="tracking-wide pt-4 text-black/75">
            ราคา {totalPrice} บาท
          </Typography>
          <EastIcon className="w-10 h-10 mt-4 text-[#001AFF]" />
        </div>

        <div className="absolute w-full p-8 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
          <h3 className="text-md md:pb-4 md:text-3xl font-medium">หัตถการ</h3>
          {/* procedure */}
          {procedures?.map((procedure) => (
            <div className="mb-2 inline-block rounded-full border border-indigo-600 w-full px-4 md:py-2" key={procedure._id}>
              <div className="flex justify-between truncate">
                <p className="text-xs md:text-lg">{procedure.procedureName}</p>
                <p className="text-xs md:text-lg">{procedure.price} บาท</p>
              </div>
            </div>
          ))}
          <p className="relative text-sm md:text-xl  mt-8 font-bold text-[#001AFF] before:absolute before:-bottom-1 before:h-0.5 md:before:h-1 before:w-10 before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">
            แก้ไข
          </p>
        </div>
      </div>
    </div>
  );
}

export default HoverCard;
