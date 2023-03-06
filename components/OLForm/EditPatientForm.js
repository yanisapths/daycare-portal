import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton, Button } from "@mui/material";
import CircleIcon from "../../components/OLIcon/CircleIcon";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WcIcon from "@mui/icons-material/Wc";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Router from "next/router";
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

function EditPatientForm({
  patient,
  clinic,
  openEdit,
  handleOpenEdit,
  deletePatient,
  setOpenEdit,
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
      age: patient.age,
      sex: patient.sex,
      HN: patient.HN,
      phoneNumber: patient.phoneNumber,
      lineId: patient.lineId,
      address: patient.address,
      income: patient.income,
      education: patient.education,
      occupation: patient.occupation,
      position: patient.position,
      precaution: patient.precaution,
      chiefComplaint: patient.chiefComplaint,
      diagnosis: patient.diagnosis,
    },
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
      .put(
        `${process.env.dev}/patient/update/${patient._id}`,
        json,
        axiosConfig
      )
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
        <motion.div
          animate={{ y: -8 }}
          transition={{
            duration: "0.3",
          }}
        >
          <p className="text-xs pb-2">
            <span className="text-black/40">HN: </span>
            <input
              placeholder={patient.HN ? patient.HN : ""}
              {...register("HN", { required: false })}
              className="border-gray-400 placeholder-gray-800 w-32 outline-none border-[1px] rounded-full px-2"
            />
          </p>
          <div className="flex items-center align-middle gap-2 pb-4">
            <p className="h4">
              คุณ ( {patient.nickName} ) {patient.firstName} {patient.lastName}
            </p>
            <Tooltip title="แก้ไข" placement="top">
              <IconButton
                aria-label="edit"
                size="small"
                className="text-[#AD8259]"
                onClick={() => handleOpenEdit()}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="ลบ" placement="top">
              <IconButton
                aria-label="delete"
                size="small"
                className="text-[#FF2F3B]"
                onClick={() =>
                  Swal.fire({
                    title: "ลบรายการนี้?",
                    text: "หากลบแล้วจะไม่สามารถย้อนกลับได้",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "ใช่ ลบเลย!",
                    cancelButtonText: "ยกเลิก",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deletePatient(patient._id).then(() =>
                        Swal.fire({
                          title: "ลบแล้ว",
                          showConfirmButton: false,
                          icon: "success",
                          timer: 1000,
                        })
                      );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire({
                        title: "ยกเลิก :)",
                        showConfirmButton: false,
                        icon: "error",
                        timer: 1000,
                      });
                    }
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </motion.div>
        <motion.div
          animate={{ y: -8 }}
          transition={{
            duration: "0.3",
          }}
        >
          <motion.div className="flex space-x-10 pb-2">
            <div className="flex items-center align-middle gap-2">
              {" "}
              <CircleIcon icon={<PersonIcon className="text-sm" />} />
              <span className="caption text-[#A17851] font-bold">อายุ </span>
              <input
                placeholder={patient.age ? patient.age : ""}
                {...register("age", { required: false })}
                className="border-gray-400 placeholder-gray-800 w-20 outline-none border-[1px] rounded-full px-2"
              />
            </div>
            <div className="flex items-center align-middle gap-2">
              {" "}
              <CircleIcon icon={<WcIcon className="text-sm" />} />
              <span className="caption text-[#A17851] font-bold">เพศ </span>
              <Controller
                render={({ field: { field, onChange, value } }) => (
                  <>
                    <Select
                      sx={{
                        borderRadius: "40px",
                        height: "26px",
                        "@media (min-width: 780px)": {
                          width: "128px",
                        },
                        width: "120px",
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
          </motion.div>
          <motion.div className="md:flex md:space-x-12 md:pb-2 xl:flex xl:space-x-10 xl:pb-2">
            <div className="flex items-center align-middle gap-2">
              {" "}
              <CircleIcon icon={<PhoneIcon className="text-sm" />} />
              <span className="caption text-[#A17851] font-bold">ติดต่อ </span>
              <input
                placeholder={patient.phoneNumber ? patient.phoneNumber : ""}
                {...register("phoneNumber", { required: false })}
                className="border-gray-400 placeholder-gray-800 w-32 outline-none border-[1px] rounded-full px-2"
              />
            </div>
            <div className="flex items-center align-middle gap-2 py-2">
              {" "}
              <CircleIcon icon={<ChatBubbleIcon className="text-sm" />} />
              <span className="caption text-[#A17851] font-bold">LINE ID </span>
              <input
                placeholder={patient.lineId ? patient.lineId : ""}
                {...register("lineId", { required: false })}
                className="border-gray-400 placeholder-gray-800 w-32 outline-none border-[1px] rounded-full px-2"
              />
            </div>
          </motion.div>
          <motion.div>
            <div className="flex items-start align-start gap-2">
              {" "}
              <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
              <span className="caption text-[#A17851] font-bold w-20">
                ที่อยู่ปัจุบัน{" "}
              </span>
              <input
                placeholder={patient.address ? patient.address : ""}
                {...register("address", { required: false })}
                className="border-gray-400 placeholder-gray-800 w-60 outline-none border-[1px] rounded-full px-2"
              />
            </div>
          </motion.div>
          <div className="px-8 pt-4 ">
            <motion.div className="grid grid-cols-2 gap-20 pb-2">
              <div className="flex items-center align-middle gap-2 ">
                {" "}
                <span className=" caption text-[#A17851]">อาชีพ</span>
                <input
                  {...register("occupation", { required: false })}
                  placeholder={patient.occupation ? patient.occupation : ""}
                  className="border-gray-400 placeholder-gray-800 w-32 outline-none border-[1px] rounded-full px-2"
                />
              </div>
              <div className="flex items-center align-middle gap-2">
                {" "}
                <span className="caption text-[#A17851]">ตำแหน่ง</span>
                <input
                  placeholder={patient.position ? patient.position : ""}
                  {...register("position", { required: false })}
                  className="border-gray-400 placeholder-gray-800 w-32 outline-none border-[1px] rounded-full px-2"
                />
              </div>
            </motion.div>
            <motion.div className="grid grid-cols-2 gap-2 pb-2">
              <div className="flex items-center align-middle col-span-2 gap-2">
                <span className="caption text-[#A17851]">ระดับการศึกษา </span>
                <Controller
                  render={({ field: { field, onChange, value } }) => (
                    <>
                      <Select
                        sx={{
                          borderRadius: "40px",
                          height: "26px",
                          "@media (min-width: 780px)": {
                            width: "165px",
                          },
                          width: "160px",
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
              <div className="flex items-center align-middle gap-2 col-start-1 col-span-2">
                <span className="caption text-[#A17851]">รายได้ </span>
                <Controller
                  render={({ field: { field, onChange, value } }) => (
                    <>
                      <Select
                        sx={{
                          borderRadius: "40px",
                          height: "26px",
                          "@media (min-width: 780px)": {
                            width: "200px",
                          },
                          width: "200px",
                          px: 2,
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
            </motion.div>
          </div>
        </motion.div>
        <div className="px-2 pt-2">
          <p className="text-black/40">ข้อมูลด้านสุขภาพ</p>
          <motion.div
            animate={{ y: -8 }}
            transition={{
              duration: "0.3",
            }}
            className="pt-4 space-y-4"
          >
            <div className="flex items-start align-start gap-2">
              <p className="caption text-[#A17851] font-bold">ข้อควรระวัง</p>
              <span className="text-[#FF2F3B]">
                <input
                  placeholder={patient.precaution ? patient.precaution : ""}
                  {...register("precaution", { required: false })}
                  className="border-gray-400 placeholder-gray-800 w-72 outline-none border-[1px] rounded-full px-2"
                />
              </span>
            </div>
            <div className="flex items-start align-start gap-2">
              <p className="caption text-[#A17851] font-bold">
                Chief Complaint
              </p>

              <input
                placeholder={
                  patient.chiefComplaint ? patient.chiefComplaint : ""
                }
                {...register("chiefComplaint", { required: false })}
                className="border-gray-400 placeholder-gray-800 w-72 outline-none border-[1px] rounded-full px-2"
              />
            </div>
            <div className="flex items-start align-start gap-2">
              <p className="caption text-[#A17851] font-bold">PT diagnosis</p>
              <input
                placeholder={patient.diagnosis ? patient.diagnosis : ""}
                {...register("diagnosis", { required: false })}
                className="border-gray-400 placeholder-gray-800 w-72 outline-none border-[1px] rounded-full px-2"
              />
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center">
          <div className="relative h-10 w-32">
            <div className="absolute bottom-5 inset-x-0 h-2">
              <button
                type="submit"
                className="bg-[#AD8259] border-[#AD8259] text-white cursor-ponter border-2 w-fit h-fit rounded-full px-8 p-2 py-1 hover:shadow-xl hover:shadow-[#AD8259]/60 hover:bg-[#E0B186] hover:border-[#E0B186]/5"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPatientForm;
