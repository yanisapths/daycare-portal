import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import Router from "next/router";

function SideView({ clinicData }) {

  const theme = useTheme();
  const { data: session, status } = useSession();
  console.log(clinicData);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "procedures",
  });

  const onSubmit = async (data) => {
    console.log(data);
    data.owner_id = session.user.id;
    const json = JSON.stringify(data);
    console.log(data.owner_id);

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(
        `https://olive-service-api.vercel.app/course/create/${clinicData._id}`,
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
    <div className="h-screen w-full md:px-24 shadow-2xl rounded-xl xl:pb-4 
    ">
      <Box sx={{ bgcolor: theme.palette.background.main }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-6 text-center">
          <Typography variant="h3 text-2xl font-bold ">เพิ่มคอร์ส</Typography>
          <div className="pb-10" />
          <input
            type="text"
            name="courseName"
            placeholder="ชื่อคอร์ส"
            className="w-2/3 bg-[#ECE656]/30 rounded-full body1 px-6 py-2 text-center"
            {...register("courseName", {
              required: true,
            })}
          />
          {errors.courseName && (
            <Typography sx={{ color: theme.palette.error.main }}>
              This is required.
            </Typography>
          )}
          <div className="flex pt-16 items-center px-16">
            <div className="space-y-10">
              <div className="grid grid-cols-3 ">
                {/* Amount */}
                <Typography variant="h5" className="pt-4">
                  จำนวน
                </Typography>
                <input
                  type="text"
                  name="amount"
                  placeholder=""
                  className="bg-[#ECE656]/30 rounded-full body1 px-6 py-2 text-center"
                  {...register("amount", {
                    required: true,
                  })}
                />
                <Typography variant="h5" className="pt-4">
                  ครั้ง
                </Typography>
              </div>
              {errors.amount && (
                <Typography sx={{ color: theme.palette.error.main }}>
                  This is required.
                </Typography>
              )}
              <div className="grid grid-cols-3 ">
                {/* Duration */}
                <Typography variant="h5" className="pt-4">
                  เวลา
                </Typography>
                <input
                  type="text"
                  name="duration"
                  placeholder=""
                  className="bg-[#ECE656]/30 rounded-full body1 px-6 py-2 text-center"
                  {...register("duration", {
                    required: true,
                  })}
                />
                <Typography variant="h5" className="pt-4">
                  ชั่วโมง/ครั้ง
                </Typography>
              </div>
              {errors.duration && (
                <Typography sx={{ color: theme.palette.error.main }}>
                  This is required.
                </Typography>
              )}

              <div className="grid grid-cols-3">
                {/* Price */}
                <Typography variant="h5" className="pt-4">
                  ราคา
                </Typography>
                <input
                  type="text"
                  name="totalPrice"
                  placeholder=""
                  className="bg-[#ECE656]/30 rounded-full body1 px-6 py-2 text-center"
                  {...register("totalPrice", {
                    required: true,
                  })}
                />
                <Typography variant="h5" className="pt-4">
                  บาท
                </Typography>
              </div>
              {errors.totalPrice && (
                <Typography sx={{ color: theme.palette.error.main }}>
                  This is required.
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-16 px-24 md:px-24">
          <Typography variant="h5">หัตถการ</Typography>
          <button
            type="button"
            onClick={() => append({ procedureName: "", price: "" })}
            className="rounded-full bg-[#6C5137] text-[#FFECA7] px-6 pt-1"
          >
            <p>เพิ่มหัตถการ</p>
          </button>
        </div>
        <div className="pt-4">
          <ul className="space-y-2">
            {fields.map((item, index) => (
              <li
                key={item.id}
                className="space-y-4 xl:space-y-0 xl:flex xl:justify-between xl:space-x-4 grid grid-cols-1 px-12 md:px-24 xl:px-4"
              >
                <input
                  {...register(`procedures.${index}.procedureName`)}
                  placeholder="ชื่อหัตถการ..."
                  className="bg-[#ECE656]/30 rounded-full body1 px-6 py-2"
                />
                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="ราคา ฿"
                      className="bg-[#ECE656]/30 rounded-full body1 px-6 py-2"
                    />
                  )}
                  name={`procedures.${index}.price`}
                  control={control}
                />
                <div className="">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="rounded-full bg-[#6C5137] text-[#FFECA7] px-6 py-2 text-center"
                  >
                    ลบ
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto px-16 py-3 text-center items-center">
          <input
            type="submit"
            className="font-bold bg-[#6C5137] border-[#6C5137] text-[#FFECA7] px-12 py-3 rounded-full cursor-pointer"
          />
        </div>
      </form>
    </Box>
    </div>
    
  );
}

export default SideView;
