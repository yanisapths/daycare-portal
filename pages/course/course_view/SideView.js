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
    <>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        maxWidth="xl"
      >
        <DialogTitle
          sx={{
            color: theme.palette.primary.main,
            fontSize: 24,
            mx: 2,
            mt: 2,
            textAlign: "center",
          }}
        >
          เพิ่มคอร์ส
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col text-center rounded-xl pt-3">
                <div className="px-24">
                  <input
                    type="text"
                    name="courseName"
                    placeholder="ชื่อคอร์ส"
                    className="w-2/3 inputOutline text-center"
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
                <div className="px-12 py-4">
                  <Stack direction="row" spacing={2}>
                    <FormControlLabel
                      control={<Checkbox value="Basic" {...register("type")} />}
                      label="Basic"
                    />
                    <FormControlLabel
                      control={<Checkbox value="Rehab" {...register("type")} />}
                      label="Rehab"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox value="Advance" {...register("type")} />
                      }
                      label="Advance"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox value="Premium" {...register("type")} />
                      }
                      label="Premium"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox value="Luxury" {...register("type")} />
                      }
                      label="Luxury"
                    />
                  </Stack>
                </div>
                <div
                  className="pt-4 space-y-10 sm:space-y-3 md:space-y-5 items-center 
                     px-0 sm:px-4 sm:pt-4 md:pt-2"
                >
                  <div className="grid grid-cols-3">
                    {/* Amount */}
                    <Typography
                      variant="h5"
                      className="pt-4 sm:text-base md:text-lg lg:text-xl text-black/50"
                    >
                      จำนวน
                    </Typography>
                    <input
                      type="text"
                      name="amount"
                      className="inputOutline text-center"
                      {...register("amount", {
                        required: true,
                      })}
                    />
                    <Typography
                      variant="h5"
                      className="pt-4 sm:text-base md:text-lg lg:text-xl text-black/50"
                    >
                      ครั้ง
                    </Typography>
                  </div>
                  {errors.amount && (
                    <Typography sx={{ color: theme.palette.error.main }}>
                      This is required.
                    </Typography>
                  )}

                  <div className="grid grid-cols-3">
                    {/* Duration */}
                    <Typography
                      variant="h5"
                      className="pt-4 sm:text-base md:text-lg lg:text-xl text-black/50"
                    >
                      เวลา
                    </Typography>
                    <input
                      type="text"
                      name="duration"
                      placeholder=""
                      className="inputOutline text-center"
                      {...register("duration", {
                        required: true,
                      })}
                    />
                    <Typography
                      variant="h5"
                      className="pt-4 sm:text-base md:text-lg lg:text-xl text-black/50"
                    >
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
                    <Typography
                      variant="h5 "
                      className="pt-4 sm:text-base md:text-lg lg:text-xl text-black/50"
                    >
                      ราคา
                    </Typography>
                    <input
                      type="text"
                      name="totalPrice"
                      placeholder=""
                      className="inputOutline text-center"
                      {...register("totalPrice", {
                        required: true,
                      })}
                    />
                    <Typography
                      variant="h5"
                      className="pt-4 sm:text-base md:text-lg lg:text-xl text-black/50"
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

                <div className="divide-y-2 divide-[#d9d9d9] mx-5 divide-dashed py-6">
                  <div className="flex justify-between pt-5">
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
                      xxl:text-xl"
                    >
                      <AddIcon className="sm:w-4 sm:h-4 md:w-4 md:h-4" />
                      <span>เพิ่มหัตถการ</span>
                    </button>
                  </div>
                  <div className="pt-1">
                    <ul className="space-y-2">
                      {fields.map((item, index) => (
                        <li key={item.id} className="flex gap-4 justify-center">
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
                              className=" text-[#FF2F3B] sm:pt-4 md:pt-3 lg:pt-3 text-base text-center sm:text-sm lg:text-lg xxl:text-2xl hover:underline"
                            >
                              ลบ
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mx: 4, mb: 4, justifyContent: "center" }}>
          <button
            className="hover:shadow-lg 
                  w-20 h-9 hover:bg-black/5
                  rounded-full sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg"
            onClick={handleClose}
            sx={{ color: theme.palette.secondary.main, fontSize: "18px" }}
          >
            ยกเลิก
          </button>
          <button
            className="shadow-lg 
                  w-20 h-9 rounded-full sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg
                  bg-[#FFECA7] hover:bg-[#FFECA7]/70"
            onClick={handleSubmit(onSubmit)}
            sx={{ color: theme.palette.secondary.main, fontSize: "18px" }}
          >
            เพิ่ม
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SideView;
