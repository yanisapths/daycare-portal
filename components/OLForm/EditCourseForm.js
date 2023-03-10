import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DialogActions, Hidden, Typography, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import Router from "next/router";
import axios from "axios";

import toast from "react-hot-toast";

function EditCourseForm({
  id,
  name,
  amount,
  duration,
  totalPrice,
  procedures,
  type,
  setOpenEdit,
  openEdit,
  handleClose,
  handleOpenEdit,
}) {
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
      name: name,
      amount: amount,
      procedures: procedures,
      type: type,
      totalPrice: totalPrice,
      duration: duration,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "procedures",
  });

  const onSubmit = async (data) => {
    const json = JSON.stringify(data);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const response = await axios
      .put(`${process.env.dev}/course/update/${id}`, json, axiosConfig)
      .then(async (res) => {
        console.log("RESPONSE RECEIVED: ", res.data);
        toast.success("บันทึกเรียบร้อย");
        Router.reload();
        setOpenEdit(false);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            fontSize: { sm: 24, md: 26, lg: 28, xl: 28 },
            mx: 1,
            mt: 2,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <div className="flex flex-row  justify-between sm:grid sm:grid-col-2">
            <div className="gap-2 w-fit flex md:text-xl sm:text-lg  items-center">
              <input
                placeholder={name ? name : ""}
                {...register("name", { required: false })}
                className="border-gray-400 placeholder-gray-800 w-fit outline-none border-[1px] rounded-full px-2"
              />
              {type != "false" ? (
                <span className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] text-xs px-2 py-1 w-fit h-fit">
                  <input
                    placeholder={type ? type : ""}
                    {...register("type", {
                      required: false,
                    })}
                    className="border-gray-400 placeholder-violet-800 w-20 outline-none border-[1px] rounded-full py-1 px-4"
                  />
                </span>
              ) : (
                ""
              )}
            </div>
           

            <div className="flex  gap-2 justify-end  text-gray-400 cursor-pointer sm:col-start-2 sm:pt-2">
              <Tooltip title="แก้ไข" placement="top">
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => handleOpenEdit()}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="ลบ" placement="top">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleOpenEdit()}
                >
                  <DeleteIcon
                    onClick={() => {
                      handleClose();
                      Swal.fire({
                        title: `ลบ ${name} นี้?`,
                        text: "หากลบแล้วจะไม่สามารถย้อนกลับได้",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "ใช่ ลบเลย!",
                        cancelButtonText: "ยกเลิก",
                        reverseButtons: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteCourse(id).then(() =>
                            Swal.fire({
                              title: "ลบคอร์สแล้ว",
                              showConfirmButton: false,
                              icon: "success",
                              timer: 1000,
                            })
                          );
                        } else if (
                          result.dismiss === Swal.DismissReason.cancel
                        ) {
                          Swal.fire({
                            title: "ลบคอร์สไม่สำเร็จ: )",
                            showConfirmButton: false,
                            icon: "error",
                            timer: 1000,
                          });
                        }
                      });
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Box>
            {/* type and price */}
            <div className="flex flex-col text-center rounded-xl mx-5 ">
              <div className="divide-y-2 divide-dashed">
                <div className="justify-between flex flex-row text-black/70 sm:text-xs">
                  <p>การรักษา</p>
                  <button
                    type="button"
                    onClick={() => append({ procedureName: "", price: "" })}
                    className="items-center rounded-full hover:underline   text-[#4acf48]  
                      transition ease-out duration-150 hover:translate-x-1 hover:scale-105
                      sm:text-xs
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
                            sx={{
                              "& label": {
                                fontSize: {
                                  sm: "14px",
                                  md: "18px",
                                  lg: "20px",
                                  xl: "20px",
                                  xxl: "20px",
                                },
                              },
                            }}
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
                                sx={{
                                  "& label": {
                                    fontSize: {
                                      sm: "14px",
                                      md: "18px",
                                      lg: "20px",
                                      xl: "20px",
                                      xxl: "20px",
                                    },
                                  },
                                }}
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
                            className=" text-[#FF2F3B] sm:pt-5 md:pt-4 lg:pt-3 text-base text-center sm:text-xs md:text-sm lg:text-base xl:text-base xxl:text-xl hover:underline"
                          >
                            ลบ
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/*total time and total price */}
              <div className="flex flex-col divide-y-2 divide-dashed mt-8 sm:mt-6 text-black/70 sm:text-xs">
                <div className="flex justify-start sm:justify-center ">
                  <p className="sm:hidden">ค่าใช้จ่ายและระยะเวลาการรักษา</p>
                  <p className="text-[15px] md:hidden lg:hidden xl:hidden xxl:hidden xxxl:hidden ">
                    ค่าใช้จ่ายและระยะเวลา
                  </p>
                </div>

                <div className="flex flex-col justify-start items-start pt-3 text-lg sm:text-sm sm:items-center">
                  <div>
                    คอร์ส{" "}
                    <input
                      placeholder={amount ? amount : ""}
                      {...register("amount", {
                        required: false,
                      })}
                      className="border-gray-400 placeholder-gray-800 w-16 outline-none border-[1px] rounded-full px-2"
                    />{" "}
                    ครั้ง
                  </div>
                  <div>
                    {" "}
                    <input
                      placeholder={duration ? duration : ""}
                      {...register("duration", {
                        required: false,
                      })}
                      className="border-gray-400 placeholder-gray-800 w-16 outline-none border-[1px] rounded-full px-2"
                    />{" "}
                    ชั่วโมง / ครั้ง
                  </div>
                  <div className="flex self-end text-xl font-semibold sm:text-lg sm:self-center sm:pt-5 gap-2">
                    รวม{" "}
                    <input
                      placeholder={totalPrice ? totalPrice : ""}
                      {...register("totalPrice", {
                        required: false,
                      })}
                      className="border-gray-400 placeholder-gray-800 w-24 outline-none border-[1px] rounded-full px-2"
                    />{" "}
                    บาท
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mx: 4, justifyContent: "center", px: 4 }}>
          <div className="mx-auto text-center flex flex-row justify-center">
            <button
              type="submit"
              className="bg-[#AD8259] border-[#AD8259] text-white cursor-ponter border-2 w-fit h-fit rounded-full px-8 p-2 py-1 hover:shadow-xl hover:shadow-[#AD8259]/60 hover:bg-[#E0B186] hover:border-[#E0B186]/5"
            >
              บันทึก
            </button>
          </div>
        </DialogActions>
      </form>
    </div>
  );
}

export default EditCourseForm;
