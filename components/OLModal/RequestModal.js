import React from "react";
import CircleIcon from "../../components/OLIcon/CircleIcon";
import RoundTextIcon from "../../components/OLIcon/RoundTextIcon";

import { IconButton, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import WcIcon from "@mui/icons-material/Wc";
import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Tooltip from "@mui/material/Tooltip";

function RequestModal({
  patient,
  data,
  selectedId,
  setSelectedId,
  close,
  course,
  index,
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-white mx-2 xl:mx-auto lg:mx-auto pb-6 p-10 py-6 relative shadow-lg shadow-black/5 rounded-3xl overflow-x-auto w-[550px] "
        layoutId={selectedId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-between items-center gap-24">
          <motion.h6
            className="h6 pt-4 text-black/50"
            animate={{ y: -8 }}
            transition={{
              duration: "0.3",
            }}
          >
            ข้อมูลคำขอ
          </motion.h6>
          <motion.div
            className=""
            onClick={() => setSelectedId(null)}
            animate={{ y: -8 }}
            transition={{
              duration: "0.3",
            }}
          >
            <IconButton>
              <CloseIcon className="w-9 h-9 " />
            </IconButton>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: -10 }}
          transition={{
            duration: "0.6",
          }}
        >
          <div className="text-[#121212]">
            <p className="text-xs pb-2 text-black/50">
              วันที่ส่งคำขอ -{" "}
              <span>
                {new Date(data.createdAt).toLocaleDateString("th-Th", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
            <p className="text-lg pb-2 text-black/70 flex sm:text-base">
              <span className="pr-4">
                {new Date(data.appointmentDate).toLocaleDateString("th-Th", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
              <p>
                {new Date(data.appointmentTime).toLocaleTimeString("th-Th", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {data.endTime ? (
                <span>
                  {"-"}
                  {new Date(data.endTime).toLocaleTimeString("th-Th", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              ) : (
                ""
              )}
            </p>
            <div className="flex pb-2 gap-4">
              <RoundTextIcon
                icon={<BookmarksIcon className="w-5 h-5" />}
                text={data.course_id=="ตรวจร่างกาย" ? "ตรวจร่างกาย":course.courseName}
              />
              <Tooltip placement="top" title="สถานที่นัด">
                <div className="cursor-pointer">
                  <RoundTextIcon
                    className="cursor-pointer"
                    icon={<MeetingRoomIcon className="w-5 h-5" />}
                    text={data.appointmentPlace}
                  />
                </div>
              </Tooltip>
            </div>
            {/* select exist patient */}
            {data.patient_id ? (
              <div className="pb-2">
                <motion.div>
                  <p className="h6 font-semibold pb-1 xl:pt-4">
                    คุณ ( {patient.nickName} ) {patient.firstName}{" "}
                    {patient.lastName}
                  </p>
                </motion.div>
                <motion.h6 className="grid grid-col-2 gap-2 text-sm pt-2 ">
                  <div className="col-start-1">
                    <div className="flex items-center align-middle gap-2">
                      {" "}
                      <CircleIcon icon={<PersonIcon className="text-sm" />} />
                      <span className="caption text-[#A17851] font-bold">
                        อายุ{" "}
                      </span>
                      {patient.age}
                    </div>
                  </div>
                  <div className="col-start-2">
                    <div className="flex items-center gap-2  ">
                      {" "}
                      <CircleIcon icon={<WcIcon className="text-sm" />} />
                      <span className="caption text-[#A17851] font-bold">
                        เพศ{" "}
                      </span>
                      {patient.sex}
                    </div>
                  </div>
                  <div className="flex items-center col-span-2 align-middle gap-2 pt-2">
                    {" "}
                    <CircleIcon icon={<WarningIcon className="text-sm" />} />
                    <span className="caption text-[#A17851] font-bold w-20 sm:w-20">
                      ข้อควรระวัง
                    </span>
                    {patient.precuation ? (
                      <span className="text-[#FF2F3B] w-32">
                        {patient.precuation}
                      </span>
                    ) : data.description ? (
                      <span className="text-[#FF2F3B] w-32">
                        {data.description}
                      </span>
                    ) : (
                      "-"
                    )}
                  </div>
                </motion.h6>
                <motion.h6 className="grid grid-cols-2 gap-2 pt-2 pb-2 sm:grid sm:grid-cols-1  sm:gap-2">
                  <div className="flex items-center align-middle gap-2 text-sm">
                    {" "}
                    <CircleIcon icon={<PhoneIcon className="text-sm" />} />
                    <span className="caption text-[#A17851] font-bold">
                      ติดต่อ{" "}
                    </span>
                    {patient.phoneNumber}
                  </div>
                  <div className="col-start-2 sm:col-start-1 sm:col-span-2">
                    <div className="flex items-center align-middle gap-2 ">
                      {" "}
                      <CircleIcon
                        icon={<ChatBubbleIcon className="text-sm " />}
                      />
                      <span className="caption text-[#A17851] font-bold">
                        LINE ID{" "}
                      </span>
                      {patient.lineId}
                    </div>
                  </div>
                </motion.h6>
                <motion.h6>
                  <div className="flex items-start align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
                    <span className="caption text-[#A17851] font-bold w-12 sm:w-16">
                      ที่อยู่
                    </span>
                    <span className=" text-sm">{patient.address}</span>
                  </div>
                </motion.h6>
              </div>
            ) : (
              // add new customer
              <div className="h6 space-y-2 font-medium">
                <motion.h6 className="pt-2">
                  <span className="h4 ">
                    คุณ ( {data.nickName} ) {data.firstName} {data.lastName}
                  </span>
                </motion.h6>
                <motion.h6 className="grid grid-col-2 text-sm pt-1 ">
                  <div className="col-start-1">
                    <div className="flex items-center align-middle gap-2">
                      {" "}
                      <CircleIcon icon={<PersonIcon className="text-sm" />} />
                      <span className="caption text-[#A17851] font-bold">
                        อายุ{" "}
                      </span>
                      {data.age ? (
                        data.age
                      ) : (
                        <span className="text-sm text-black/40">-</span>
                      )}
                    </div>
                  </div>
                  <div className="col-start-2">
                    <div className="flex items-center align-middle gap-2">
                      {" "}
                      <CircleIcon icon={<WcIcon className="text-sm" />} />
                      <span className="caption text-[#A17851] font-bold">
                        เพศ{" "}
                      </span>
                      {data.sex ? (
                        data.sex
                      ) : (
                        <span className="text-sm text-black/40">-</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center col-span-2 align-middle gap-2 pt-2">
                    {" "}
                    <CircleIcon icon={<WarningIcon className="text-sm" />} />
                    <span className="caption  text-[#A17851] font-bold">
                      ข้อควรระวัง
                    </span>
                    {data.description ? (
                      <span className="text-[#FF2F3B] ">{data.description}</span>
                    ) : (
                      " -"
                    )}
                  </div>
                </motion.h6>
                <motion.h6 className="grid grid-cols-2 gap-2 sm:grid sm:grid-cols-1  sm:gap-2 ">
                  <div className="flex items-center align-middle gap-2 text-sm">
                    {" "}
                    <CircleIcon icon={<PhoneIcon className="text-sm" />} />
                    <span className="caption text-[#A17851] font-bold">
                      ติดต่อ{" "}
                    </span>
                    {data.phoneNumber ? (
                      data.phoneNumber
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  <div className="col-start-2 sm:col-start-1 sm:col-span-2">
                  <div className="flex items-center align-middle gap-2 text-sm ">
                    {" "}
                    <CircleIcon icon={<ChatBubbleIcon className="text-sm" />} />
                    <span className="caption text-[#A17851] font-bold ">
                      LINE ID{" "}
                    </span>
                    {data.lineId ? (
                      data.lineId
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  </div>
                  
                </motion.h6>
                <motion.h6>
                  <div className="flex items-start align-middle gap-2 text-sm ">
                    {" "}
                    <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
                    <span className="caption text-[#A17851] font-bold sm:w-14">
                      ที่อยู่
                    </span>
                    {data.location ? (
                      data.location
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                </motion.h6>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RequestModal;
