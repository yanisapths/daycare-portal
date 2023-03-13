import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import CircleIcon from "../../components/OLIcon/CircleIcon";
import SimpleChip from "../OLButton/SimpleChip";
import RoundTextIcon from "../OLIcon/RoundTextIcon";
import { Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import WcIcon from "@mui/icons-material/Wc";
import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Tooltip from "@mui/material/Tooltip";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import Router from "next/router";

function DetailHeader({ clinic, data, patient, course }) {
  const { data: session, status } = useSession();
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
    const info = {
      owner_id: session.user.id,
      clinic_id: clinic._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      precaution: data.description,
      nickName: data.nickName,
      sex: data.sex,
      lineId: data.lineId,
      address: data.location,
      age: data.age,
      customer_id: data.customer_id,
    };
    const json = JSON.stringify(info);
    console.log(info);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(
        `${process.env.url}/patient/create/clinic/${clinic._id}`,
        json,
        axiosConfig
      )
      .then(async (res) => {
        toast.success("เพิ่มแบบบันทึก");
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  };
  return (
    <div>
      <div className="pt-4 text-[#121212]">
        {data.patient_id ? (
          <div className="h6 space-y-4 font-medium">
            <motion.h6>
              <span className="h4">
                ( {patient.nickName} ) {patient.firstName} {patient.lastName}
              </span>
            </motion.h6>
            <motion.h6 className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:h6 md:h6 caption">
              <div className="flex items-center align-middle gap-2 text-base">
                {" "}
                <CircleIcon icon={<PersonIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold ">อายุ </span>
                {patient.age ? (
                  patient.age
                ) : (
                  <span className="text-sm text-black/40">-</span>
                )}
              </div>
              <div className="flex items-center align-middle gap-2 text-base">
                {" "}
                <CircleIcon icon={<WcIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold">เพศ </span>
                {patient.sex ? (
                  patient.sex
                ) : (
                  <span className="text-sm text-black/40">-</span>
                )}
              </div>
              <div className="flex items-center col-start-1 align-middle gap-2  text-base sm:pt-4">
                <CircleIcon icon={<WarningIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold sm:hidden md:visible lg:visible xl:visible">
                  ข้อควรระวัง{" "}
                </span>
                {patient.precaution ? (
                  <span className="text-[#FF2F3B]"> {patient.precaution}</span>
                ) : (
                  "-"
                )}
              </div>
            </motion.h6>
            <motion.h6 className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-2 xl:h6 md:h6 caption text-base">
              <div className="flex items-center align-middle gap-2">
                {" "}
                <CircleIcon icon={<PhoneIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold">ติดต่อ </span>
                {patient.phoneNumber ? (
                  patient.phoneNumber
                ) : (
                  <span className="text-sm text-black/40"> -</span>
                )}
              </div>
              <div className="flex items-center  align-middle gap-2 text-base">
                {" "}
                <CircleIcon icon={<ChatBubbleIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold sm:hidden md:visible lg:visible xl:visible">
                  LINE ID{" "}
                </span>
                {patient.lineId ? (
                  patient.lineId
                ) : (
                  <span className="text-sm text-black/40">-</span>
                )}
              </div>
            </motion.h6>
            <motion.h6>
              <div className="flex items-start align-start gap-2 xl:h6 md:h6 caption text-base">
                {" "}
                <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold sm:w-20">
                  ที่อยู่{" "}
                </span>
                {patient.address ? (
                  patient.address
                ) : (
                  <span className="text-sm text-black/40">-</span>
                )}
              </div>
            </motion.h6>
          </div>
        ) : (
          <div className="h6 space-y-4 font-medium">
            <motion.h6 className="md:flex md:gap-3 space-y-1">
              <span className="h6 font-semibold md:h4 truncate">
                ( {data.nickName} ) {data.firstName} {data.lastName}
              </span>
              <Tooltip placement="top" title="เพิ่มในแบบบันทึกผู้ป่วย">
                <button
                  onClick={() =>
                    Swal.fire({
                      title: "เพิ่มในแบบบันทึกผู้ป่วย?",
                      text: "เพิ่มในบันทึกเพื่อความสะดวกสำหรับนัดหมายครั้งต่อไป",
                      icon: "success",
                      showCancelButton: true,
                      confirmButtonText: "ยอบรับ",
                      cancelButtonText: "ยกเลิก",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onSubmit(data).then(() =>
                          Swal.fire({
                            title: "เพิ่มลงในแบบบันทึกผู้ป่วยแล้ว",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 1000,
                          })
                        );
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                          title: "ยกเลิก",
                          showConfirmButton: false,
                          icon: "error",
                          timer: 1000,
                        });
                      }
                    })
                  }
                >
                  <RoundTextIcon
                    icon={
                      <PersonAddIcon className="cursor-pointer text-[#F3BD33] hover:text-[#7C552F]" />
                    }
                    text="เพิ่มลงในแบบบันทึก"
                  />
                </button>
              </Tooltip>
            </motion.h6>
            <motion.h6 className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:h6 md:h6 caption">
              <div className="flex items-center align-middle gap-2 text-base">
                {" "}
                <CircleIcon icon={<PersonIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold">อายุ </span>
                {data.age ? (
                  data.age
                ) : (
                  <span className="text-sm text-black/40">-</span>
                )}
              </div>
              <div className="flex items-center align-middle gap-2 text-base">
                {" "}
                <CircleIcon icon={<WcIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold">เพศ </span>
                {data.sex ? (
                  data.sex
                ) : (
                  <span className="text-sm text-black/40">-</span>
                )}
              </div>
              <div className="flex items-center  col-start-1 gap-2 text-base sm:pt-4">
                {" "}
                <CircleIcon icon={<WarningIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold xl:w-20">
                  ข้อควรระวัง
                </span>
                {data.description ? (
                  <span className="text-[#FF2F3B]  flex items-start justify-start ">
                    {" "}
                    {data.description}
                  </span>
                ) : (
                  <span className="text-sm text-black/40">-</span>
                )}
              </div>
            </motion.h6>
            <motion.h6 className="grid grid-cols-2 sm:grid-cols-1 xl:h6 md:h6 caption  text-base">
              <div className="flex items-center align-middle gap-2 text-base">
                {" "}
                <CircleIcon icon={<PhoneIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold">ติดต่อ </span>
                {data.phoneNumber ? (
                  data.phoneNumber
                ) : (
                  <span className="text-sm text-black/40">-</span>
                )}
              </div>
              <div className="flex items-center align-middle gap-2 text-base">
                {" "}
                <CircleIcon icon={<ChatBubbleIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold">LINE ID </span>
                {data.lineId ? (
                  data.lineId
                ) : (
                  <span className="text-sm text-black/40">-</span>
                )}
              </div>
            </motion.h6>
            <motion.h6>
              <div className="flex items-start align-start gap-2 xl:h6 md:h6 caption text-base">
                {" "}
                <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold">ที่อยู่ </span>
                {data.location ? (
                  data.location
                ) : (
                  <span className="text-sm text-black/40">-</span>
                )}
              </div>
            </motion.h6>
          </div>
        )}
        <div className="pt-4 h6">
          <div className="flex items-center align-middle gap-2 text-base">
            {" "}
            <CircleIcon icon={<MeetingRoomIcon className="text-sm" />} />
            <span className="body2 text-[#A17851] font-bold">สถานที่นัด </span>
            {data.appointmentPlace}
          </div>
        </div>
      </div>
      <div className="p-2">
        <Link href="/course">
          <div className="flex justify-center gap-2 cursor-pointer">
            <Tooltip placement="top" title="ดูข้อมูล">
              <motion.h3 className="h4 text-center">
                {data.course_id == "ตรวจร่างกาย"
                  ? "ตรวจร่างกาย"
                  : course.courseName}
              </motion.h3>
            </Tooltip>

            {course.type != 'false' && (
              <div className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] text-center text-xs w-fit h-fit px-4 py-1.5">
                {course.type}
              </div>
            )}
          </div>
        </Link>
        <motion.div className=" flex justify-center pt-2 gap-2 ">
          <div className="grid grid-cols-3 w-fit sm:grid-cols-2 sm:gap-2 ">
            <div className=" flex justify-center">
              <SimpleChip
                prefix="จำนวน"
                text={course.amount}
                quantify="ครั้ง"
              />
            </div>
            <div className=" flex justify-center">
              <SimpleChip
                prefix="ราคา"
                text={course.totalPrice}
                quantify="บาท"
              />
            </div>
            <div className=" flex justify-center sm:col-span-2">
              <SimpleChip
                prefix="ครั้งละ"
                text={course.duration}
                quantify="ชั่วโมง"
              />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex justify-center text-black/60 align-middle gap-2 py-2">
        <Tooltip placement="top" title="Click To Copy">
          <Button
            sx={{ borderRadius: 16, px: 2 }}
            endIcon={<ContentCopyIcon size="small" />}
            onClick={() => {
              navigator.clipboard.writeText(data._id);
            }}
          >
            <p className="text-xs">No. {data._id}</p>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default DetailHeader;
