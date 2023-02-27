import React from "react";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import DetailView from "../OLModal/DetailView";
import { useState } from "react";
import Overlay from "../OLLayout/Overlay";

function HoverCard({
  id,
  name,
  amount,
  duration,
  totalPrice,
  procedures,
  type,
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    
  };
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <>
        <DetailView
          open={open}
          handleClose={handleClose}
          setOpen={setOpen}
          id={id}
          name={name}
          amount={amount}
          duration={duration}
          totalPrice={totalPrice}
          procedures={procedures}
          type={type}
         
        />

      <div
        className="group block cursor-pointer scroll-smooth"
        onClick={handleClickOpen}
      >
        <div
          className="h-40 rounded-2xl flex transform items-start bg-white xl:h-32 xxl:h-40 sm:h-40 md:h-40 shadow-xl hover:shadow-2xl
        transition ease-out delay-100 hover:scale-105"
        >
          <div className="px-5 pb-3 pt-3">
            <div className=" flex py-2 gap-6">
              <p className=" h2 lg:h3 md:h4 sm:h5 font-medium ">{name}</p>
              {type!="false" ? (
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
    </>
  );
}

export default HoverCard;
