import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Button } from "@mui/material";
import CircleIcon from "../../components/OLIcon/CircleIcon";
import PhoneIcon from "@mui/icons-material/Phone";
import RoundTextIcon from "../../components/OLIcon/RoundTextIcon";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import WcIcon from "@mui/icons-material/Wc";
import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

function RequestModal({
  patient,
  data,
  selectedId,
  setSelectedId,
  close,
  course,
  index,
}) {
  console.log(patient);
  return (
    <AnimatePresence>
      <motion.div
        className="bg-white mx-2 xl:mx-auto p-12 relative shadow-lg shadow-black/5 rounded-3xl overflow-x-auto w-[900px]"
        layoutId={selectedId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-between items-center xl:gap-60 gap-24">
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
              <CloseIcon className="w-10 h-10" />
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
            <p className="text-xs pb-2 text-black/40">
              วันที่ขอ <span>{new Date(data.createdAt).toUTCString()}</span>
            </p>
            <p className="text-lg pb-2 text-black/70 xl:flex">
              <span>
                {new Date(data.appointmentDate).toLocaleDateString("th-Th", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
              <p className="xl:px-12">
                {new Date(data.appointmentTime).toLocaleTimeString("th-Th", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              {data.endTime ? (
                <span>
                  {" "}
                  {"-"}{" "}
                  {new Date(data.endTime).toLocaleTimeString("th-Th", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              ) : (
                ""
              )}
            </p>
            {data.patient_id ? (
              <div>
                <motion.h6>
                  <span className="h4">
                    คุณ ( {patient.nickName} ) {patient.firstName}{" "}
                    {patient.lastName}
                  </span>
                </motion.h6>
                <motion.h6 className="flex space-x-10">
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<PersonIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      อายุ{" "}
                    </span>
                    {patient.age}
                  </div>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<WcIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">เพศ </span>
                    {patient.sex}
                  </div>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<WarningIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      ข้อควรระวัง{" "}
                    </span>{" "}
                    {patient.precaution ? patient.precaution : "-"}
                  </div>
                </motion.h6>
                <motion.h6 className="flex space-x-24">
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<PhoneIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                     ติดต่อ{" "}
                    </span>
                    {patient.phoneNumber}
                  </div>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<ChatBubbleIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      LINE ID{" "}
                    </span>
                    {patient.lineId}
                  </div>
                </motion.h6>
                <motion.h6>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      ที่อยู่{" "}
                    </span>
                    {patient.address}
                  </div>
                </motion.h6>
              </div>
            ) : (
              <div className="h6 space-y-4 font-medium">
                <motion.h6>
                  <span className="h4">
                    คุณ ( {data.nickName} ) {data.firstName} {data.lastName}
                  </span>
                </motion.h6>
                <motion.h6 className="flex space-x-10">
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<PersonIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      อายุ{" "}
                    </span>
                    {data.age ? (
                      data.age
                    ) : (
                      <span className="text-sm text-black/40">ไม่ได้กรอก</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<WcIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">เพศ </span>
                    {data.sex ? (
                      data.sex
                    ) : (
                      <span className="text-sm text-black/40">ไม่ได้กรอก</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<WarningIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      ข้อควรระวัง{" "}
                    </span>{" "}
                    {data.description ? data.description : "-"}
                  </div>
                </motion.h6>
                <motion.h6 className="flex space-x-24">
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<PhoneIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      ติดต่อ{" "}
                    </span>
                    {data.phoneNumber ? (
                      data.phoneNumber
                    ) : (
                      <span className="text-sm text-black/40">ไม่ได้กรอก</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<ChatBubbleIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      LINE ID{" "}
                    </span>
                    {data.lineId ? (
                      data.lineId
                    ) : (
                      <span className="text-sm text-black/40">ไม่ได้กรอก</span>
                    )}
                  </div>
                </motion.h6>
                <motion.h6>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      ที่อยู่{" "}
                    </span>
                    {data.location ? (
                      data.location
                    ) : (
                      <span className="text-sm text-black/40">ไม่ได้กรอก</span>
                    )}
                  </div>
                </motion.h6>
              </div>
            )}
            <div className="pt-4 h6">
              <div className="flex items-center align-middle gap-2">
                {" "}
                <CircleIcon icon={<MeetingRoomIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold">
                  สถานที่นัด{" "}
                </span>
                {data.appointmentPlace}
              </div>
            </div>
          </div>
          <div className="pt-4 h6">
            <div className="flex items-center align-middle gap-2">
              {" "}
              <CircleIcon icon={<BookmarksIcon className="text-sm" />} />
              {course.courseName}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RequestModal;
