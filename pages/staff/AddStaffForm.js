import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";
import Image from "next/image";

const sex = [
  { id: 1, label: "ชาย" },
  { id: 2, label: "หญิง" },
  { id: 3, label: "อื่นๆ" },
];

function AddStaffForm({ id, clinicData, open, handleClose, setOpen }) {
  const { data: session, status } = useSession();
  const theme = useTheme();

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    data.owner_id = session.user.id;
    data.clinic_id = id;
    let axiosConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(
        `${process.env.url}/staff/create/${session.user.id}`,
        data,
        axiosConfig
      )
      .then(async (res) => {
        console.log("RESPONSE RECEIVED: ", res.data);
        toast.success("เพิ่มพนักงาน");
        setOpen(false);
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        toast.error("ไม่สำเร็จ");
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
            fontWeight: "bold",
          }}
        >
          เพิ่มพนักงาน
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <section className="flex justify-center lg:px-8 py-8 px-12 lg:col-span-7 xl:col-span-6">
                  <div className="max-w-xl lg:max-w-3xl">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-3">
                        <label
                          htmlFor="firstName"
                          className="inputLabel pb-0 text-sm"
                        >
                          ชื่อ
                        </label>

                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="inputOutline"
                          {...register("firstName", { required: false })}
                        />
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor="lastName"
                          className="inputLabel pb-0 text-sm"
                        >
                          นามสกุล
                        </label>

                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="inputOutline"
                          {...register("lastName", { required: false })}
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="nickName"
                          className="inputLabel pb-0 text-sm"
                        >
                          ชื่อเล่น
                        </label>

                        <input
                          type="text"
                          id="nickName"
                          name="nickName"
                          className="inputOutline"
                          {...register("nickName", { required: false })}
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="age"
                          className="inputLabel pb-0 text-sm"
                        >
                          อายุ
                        </label>

                        <input
                          type="text"
                          id="age"
                          name="age"
                          className="inputOutline"
                          {...register("age", { required: false })}
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="sex"
                          className="inputLabel pb-0 text-sm"
                        >
                          เพศ
                        </label>
                        <Controller
                          render={({ field: { field, onChange, value } }) => (
                            <>
                              <Select
                                sx={{
                                  borderRadius: "40px",
                                  height: "40px",
                                  "@media (min-width: 780px)": {
                                    width: "120px",
                                  },
                                  px: 2,
                                  border: "2px solid #AD8259",
                                  mt: 0.5,
                                }}
                                {...field}
                                {...register("sex", { required: false })}
                              >
                                {sex.map((input, key) => (
                                  <MenuItem
                                    key={input.id}
                                    value={input.label}
                                    onChange={onChange}
                                  >
                                    {input.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </>
                          )}
                          name="sex"
                          control={control}
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="position"
                          className="inputLabel pb-0 text-sm"
                        >
                          ตำแหน่ง
                        </label>

                        <input
                          type="text"
                          id="position"
                          name="position"
                          className="inputOutline"
                          {...register("position", { required: false })}
                        />
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor="lineId"
                          className="inputLabel pb-0 text-sm"
                        >
                          LINE ID
                        </label>

                        <input
                          type="text"
                          id="lineId"
                          name="lineId"
                          className="inputOutline"
                          {...register("lineId", { required: false })}
                        />
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor="phoneNumber"
                          className="inputLabel pb-0 text-sm"
                        >
                          เบอร์โทร
                        </label>

                        <input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          className="inputOutline"
                          {...register("phoneNumber", {
                            required: false,
                            pattern: {
                              value: /^([0-9]\d*)(\.\d+)?$/,
                            },
                          })}
                        />
                        {errors.phoneNumber?.type === "pattern" && (
                          <p role="alert" className="text-[#FF2F3B]">
                            เบอร์โทรต้องเป็นตัวเลขเท่านั้น
                          </p>
                        )}
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor="email"
                          className="inputLabel pb-0 text-sm"
                        >
                          อีเมล์
                        </label>

                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="inputOutline"
                          {...register("email", { required: false })}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mx: 4, mb: 4, justifyContent: "center" }}>
          <button
            className="hover:shadow-lg 
            w-28 h-10 hover:bg-black/5
            rounded-full sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg"
            onClick={handleClose}
            sx={{ color: theme.palette.secondary.main, fontSize: "18px" }}
          >
            ยกเลิก
          </button>
          <button
            className="shadow-lg 
            w-28 h-10 rounded-full sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg
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

export default AddStaffForm;
