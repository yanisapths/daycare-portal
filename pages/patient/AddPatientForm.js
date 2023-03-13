import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import Router from "next/router";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import toast from "react-hot-toast";

const education = [
  { id: 1, label: "น้อยกว่าปริญญาตรี" },
  { id: 2, label: "ปริญญาตรี" },
  { id: 3, label: "ปริญญาโท" },
  { id: 4, label: "ปริญญาเอก" },
];

const income = [
  { id: 1, label: "น้อยกว่า 20000" },
  { id: 2, label: "มากกว่า 30000 - 50000" },
  { id: 3, label: "มากกว่า 50000" },
  { id: 4, label: "สูงกว่า 100000" },
];

const sex = [
  { id: 1, label: "ชาย" },
  { id: 2, label: "หญิง" },
  { id: 3, label: "อื่นๆ" },
];

function AddPatientForm({ open, handleClose, setOpen,clinic }) {
  const { data: session, status } = useSession();
  const theme = useTheme();

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      document: "",
    },
  });

  const onSubmit = async (data) => {
    data.owner_id = session.user.id;
    data.clinic_id = clinic._id;
    const json = JSON.stringify(data);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(
        `${process.env.url}/patient/create/${session.user.id}`,
        json,
        axiosConfig
      )
      .then(async (res) => {
        toast.success("เพิ่มแบบบันทึก");
        Router.reload();
        setOpen(false);
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
          เพิ่มแบบบันทึก
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="lg:grid lg:grid-cols-12">
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
                          className="inputOutline "
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
                                  height: "46px",
                                  "@media (min-width: 780px)": {
                                    width: "120px",
                                  },
                                  border: "2px solid #AD8259",
                                  px: 2,
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
                          className="border-[#AD8259]"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="address"
                          className="inputLabel pb-0 text-sm"
                        >
                          ที่อยู่
                        </label>

                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="inputOutline"
                          {...register("address", { required: false })}
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
                          error={!!errors.phoneNumber}
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
                          htmlFor="occupation"
                          className="inputLabel pb-0 text-sm"
                        >
                          อาชีพ
                        </label>

                        <input
                          type="text"
                          id="occupation"
                          name="occupation"
                          className="inputOutline"
                          {...register("occupation", { required: false })}
                        />
                      </div>
                      <div className="col-span-3">
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
                          htmlFor="education"
                          className="inputLabel pb-0 text-sm"
                        >
                          ระดับการศึกษา
                        </label>
                        <Controller
                          render={({ field: { field, onChange, value } }) => (
                            <>
                              <Select
                                sx={{
                                  borderRadius: "40px",
                                  height: "46px",
                                  "@media (min-width: 780px)": {
                                    width: "255px",
                                  },
                                  border: "2px solid #AD8259",
                                  px: 2,
                                }}
                                {...field}
                                {...register("education", { required: false })}
                              >
                                {education.map((input, key) => (
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
                          name="education"
                          control={control}
                        />
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor="income"
                          className="inputLabel pb-0 text-sm"
                        >
                          รายได้
                        </label>
                        <Controller
                          render={({ field: { field, onChange, value } }) => (
                            <>
                              <Select
                                sx={{
                                  borderRadius: "40px",
                                  height: "46px",
                                  "@media (min-width: 780px)": {
                                    width: "255px",
                                  },
                                  px: 2,
                                  border: "2px solid #AD8259",
                                }}
                                {...field}
                                {...register("income", { required: false })}
                              >
                                {income.map((input, key) => (
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
                          name="income"
                          control={control}
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="flex items-center justify-center lg:px-8 py-8 px-12 lg:col-span-7 xl:col-span-6">
                  <div className="max-w-xl lg:max-w-3xl">
                    <div className="mt-8 grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label htmlFor="HN" className="inputLabel pb-0 text-sm">
                          HN (เลขประจำตัวผู้ป่วย)
                        </label>

                        <input
                          type="text"
                          id="HN"
                          name="HN"
                          className="inputOutline"
                          {...register("HN", { required: false })}
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="chiefComplaint"
                          className="inputLabel pb-0 text-sm"
                        >
                          Chief Complaint
                        </label>

                        <input
                          type="text"
                          id="chiefComplaint"
                          name="chiefComplaint"
                          className="inputOutline"
                          {...register("chiefComplaint", { required: false })}
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="diagnosis"
                          className="inputLabel pb-0 text-sm"
                        >
                          PT Diagnosis
                        </label>

                        <input
                          type="text"
                          id="diagnosis"
                          name="diagnosis"
                          className="inputOutline"
                          {...register("diagnosis", { required: false })}
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="precaution"
                          className="inputLabel pb-0 text-sm"
                        >
                          Precaution
                        </label>

                        <input
                          type="text"
                          id="precaution"
                          name="precaution"
                          className="inputOutline"
                          {...register("precaution", { required: false })}
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

export default AddPatientForm;
