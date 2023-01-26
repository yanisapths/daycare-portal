import React, { useState, useEffect, useRef } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import Router from "next/router";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function SideView({ clinicData, open, handleClose, setOpen }) {
  const theme = useTheme();
  const { data: session, status } = useSession();
  console.log(clinicData);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { type: [''] } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "procedures",
  });

  const onSubmit = async (data) => {
    console.log(data);
    data.owner_id = session.user.id;
    const json = JSON.stringify(data);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(
        `${process.env.dev}/course/create/${clinicData._id}`,
        json,
        axiosConfig
      )
      .then(async (res) => {
        console.log("RESPONSE RECEIVED: ", res.data);

        toast.success("กำลังเพิ่มคอร์ส...🛠️🚧");
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  return (
    <div className="rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col text-center rounded-xl pt-3">
          <div>
            <input
              type="text"
              name="courseName"
              placeholder="ชื่อคอร์ส"
              className="w-2/3 bg-[#ffdf8e]/50  rounded-full h6 md:body1 sm:body1 xl:body2 px-6 py-3 
                text-center xl:py-2 xxl:py-2 md:py-2 sm:py-2
                sm:w-4/5"
              {...register("courseName", {
                required: true,
              })}
            />
            {errors.courseName && (
              <Typography sx={{ color: theme.palette.error.main }}>
                This is required.
              </Typography>
            )}
          </div>
          <div
            className="pt-8 space-y-3 sm:space-y-3 md:space-y-5 items-center 
                 px-0 sm:px-4 sm:pt-4 xl:pt-3 md:pt-6 "
          >
            <div className="grid grid-cols-3 ">
              {/* Amount */}
              <Typography
                variant="h5"
                className="pt-4 sm:text-base md:text-lg lg:text-2xl xl:text-base xxl:text-3xl"
              >
                จำนวน
              </Typography>
              <input
                type="text"
                name="amount"
                className="bg-[#ffdf8e]/50 sm:body2 rounded-full body1 px-6 text-center xl:py-0 xxl:py-4 md:py-2 "
                {...register("amount", {
                  required: true,
                })}
              />
              <Typography
                variant="h5"
                className="pt-4  sm:text-base md:text-lg xxl:text-3xl xl:text-base lg:text-2xl"
              >
                ครั้ง
              </Typography>
              {errors.amount && (
                <Typography sx={{ color: theme.palette.error.main }}>
                  This is required.
                </Typography>
              )}
            </div>

            <div className="grid grid-cols-3 ">
              {/* Duration */}
              <Typography
                variant="h5"
                className="pt-4 sm:text-base md:text-lg lg:text-2xl xl:text-base xxl:text-3xl "
              >
                เวลา
              </Typography>
              <input
                type="text"
                name="duration"
                placeholder=""
                className="bg-[#ffdf8e]/50 rounded-full body1 sm:body2 px-6 py-0 text-center xxl:py-4 md:py-2 sm:py-1 "
                {...register("duration", {
                  required: true,
                })}
              />
              <Typography
                variant="h5 "
                className="pt-4 sm:text-base md:text-lg lg:text-2xl xl:text-base xxl:text-3xl"
              >
                ชั่วโมง/ครั้ง
              </Typography>
            </div>
            {errors.duration && (
              <Typography sx={{ color: theme.palette.error.main }}>
                This is required.
              </Typography>
            )}

            <div className="grid grid-cols-3  ">
              {/* Price */}
              <Typography
                variant="h5 "
                className="pt-4 sm:text-base md:text-lg lg:text-2xl xl:text-base xxl:text-3xl"
              >
                ราคา
              </Typography>
              <input
                type="text"
                name="totalPrice"
                placeholder=""
                className="bg-[#ffdf8e]/50 rounded-full body1 sm:body2 px-6 py-0 text-center xxl:py-4 md:py-2 sm:py-2  "
                {...register("totalPrice", {
                  required: true,
                })}
              />
              <Typography
                variant="h5 "
                className="pt-4 sm:text-base  md:text-lg lg:text-2xl  xl:text-base xxl:text-3xl"
              >
                บาท
              </Typography>
            </div>
            {errors.totalPrice && (
              <Typography sx={{ color: theme.palette.error.main }}>
                This is required.
              </Typography>
            )}
          </div>

          <div className="divide-y-4 divide-[#d9d9d9] mx-5  divide-dashed">
            <div className="flex justify-between pt-5 ">
              <Typography className="font-medium sm:text-xl md:text-xl lg:text-2xl xxl:text-3xl">
                หัตถการ
              </Typography>
              <button
                type="button"
                onClick={() => append({ procedureName: "", price: "" })}
                className="items-center rounded-full hover:underline   text-[#4acf48]  
                  transition ease-out duration-150 hover:translate-x-1 hover:scale-105
                  sm:text-sm
                  md:text-sm 
                  lg:text-base
                  xl:text-sm
                  xxl:text-xl"
              >
                <AddIcon className="w-4 h-4" />
                <span>เพิ่มหัตถการ</span>
              </button>
            </div>
            <div className="pt-1">
              <ul className="space-y-2">
                {fields.map((item, index) => (
                  <li key={item.id} className=" grid grid-cols-3 gap-4 ">
                    <div>
                      <TextField
                        {...register(`procedures.${index}.procedureName`)}
                        id="standard-basic"
                        label="ชื่อหัตถการ..."
                        variant="standard"
                        className="w-full sm:body2 xxl:h4"
                      />
                    </div>

                    <div>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            label="ราคา ฿"
                            className="w-full sm:body"
                          />
                        )}
                        name={`procedures.${index}.price`}
                        control={control}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className=" text-[#FF2F3B] sm:pt-4 md:pt-3 lg:pt-3 xl:text-sm text-center sm:text-sm lg:text-lg xxl:text-2xl hover:underline"
                      >
                        ลบ
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mx-auto px-16 py-4 text-center items-center transition ease-out duration-150 
            hover:translate-y-1 hover:scale-105
            "
          >
            <button
              type="submit"
              className="font-medium text-sm bg-[#6C5137]/80 text-[#ffeec4] border-[#6C5137] 
                  px-7 py-1 rounded-full cursor-pointer shadow-lg hover:shadow-xl
                  md:text-lg lg:text-xl  lg:py-2 lg:px-9 xl:text-sm xxl:py-3 xxl:px-10 xxl:text-2xl "
            >
              เพิ่ม
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SideView;
