import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import SmallInput from "../../../components/common/SmallInput";

function SideView() {
  const theme = useTheme();
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  return (
    <Box
      className="h-fit w-full overflow-y-auto shadow-2xl rounded-xl xl:pb-4"
      sx={{ bgcolor: theme.palette.background.main }}
    >
      <form>
        <div className="pt-16 text-center">
          <Typography variant="h3">เพิ่มคอร์ส</Typography>
          <div className="pb-10" />
          <input
            type="text"
            name="courseName"
            placeholder="ชื่อคอร์ส"
            className="w-2/3 bg-[#ECE656]/30 rounded-full body1 px-6 py-2 text-center"
          />
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
                />
                <Typography variant="h5" className="pt-4">
                  ครั้ง
                </Typography>
              </div>
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
                />
                <Typography variant="h5" className="pt-4">
                  ชั่วโมง
                </Typography>
              </div>

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
                />
                <Typography variant="h5" className="pt-4">
                  บาท
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-16 px-24 md:px-24">
          <Typography variant="h5">หัตถการ</Typography>
          <button
            type="button"
            onClick={() => append({ firstName: "", lastName: "" })}
            className="rounded-full bg-[#6C5137] text-[#FFECA7] px-6 pt-1"
          >
            <p>เพิ่ม</p>
          </button>
        </div>
        <div className="pt-4">
          <ul className="space-y-2">
            {fields.map((item, index) => (
              <li key={item.id} className="space-y-4 xl:space-y-0 xl:flex xl:justify-between xl:space-x-4 grid grid-cols-1 px-12 md:px-24 xl:px-6">
                <input {...register(`test.${index}.firstName`)} placeholder="ชื่อหัตถการ..." className="bg-[#ECE656]/30 rounded-full body1 px-6 py-2" />
                <Controller
                  render={({ field }) => <input {...field} placeholder="ราคา ฿" className="bg-[#ECE656]/30 rounded-full body1 px-6 py-2" />}
                  name={`test.${index}.lastName`}
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

        <div className="mx-auto px-16 py-2 md:py-4 text-center items-center">
          <div className=" font-bold bg-[#6C5137] border-[#6C5137] text-[#FFECA7] buttonPrimary">
            <p>เพิ่ม</p> 
          </div>
        </div>
      </form>
    </Box>
  );
}

export default SideView;
