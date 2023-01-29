import React from "react";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

function HoverCard({
  key,
  name,
  amount,
  duration,
  totalPrice,
  procedures,
  type,
}) {
  const theme = useTheme();
  return (
    <div className="group block cursor-pointer scroll-smooth">
      <div
        className=" rounded-2xl flex transform items-start bg-white h-auto shadow-xl hover:shadow-2xl
        transition ease-out delay-100 hover:scale-105"
      >
        <div className="px-5 pb-3 pt-3">
          <div className=" flex py-2 gap-6">
            <p className=" h2 lg:h3 md:h4 sm:h5 font-medium  ">{name}</p>
            {type ? (
              <strong className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] px-2 py-1 text-xs font-medium self-center">
                {type}
              </strong>
            ) : (
              <></>
            )}
          </div>

          <div className="flex w-full gap-1">
            {procedures?.map((procedure) => (
              <div
                className="mb-2 inline-block rounded-full  w-fit "
                key={procedure._id}
              >
                <div className="flex flex-row flex-wrap ">
                  <p className="text-xs ">{procedure.procedureName} </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Typography className="text-xs tracking-wide md:text-sm sm:text-sm text-center text-black/70 bg-[#ffefb7] rounded-full px-2 py-1">
              {amount} ครั้ง
            </Typography>
            <Typography className="text-xs tracking-wide  md:text-sm sm:text-sm text-center text-black/70 bg-[#ffefb7] rounded-full px-2 py-1">
              {duration} ชั่วโมง/ครั้ง
            </Typography>
            <Typography className="text-xs tracking-wide  md:text-sm sm:text-sm   text-center text-black/70 bg-[#ffefb7] rounded-full px-2 py-1">
              ราคา {totalPrice} บาท
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoverCard;
