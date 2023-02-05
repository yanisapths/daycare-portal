import React, { useState, useEffect } from "react";
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

function PatientDetailModal({ patient, selectedId, setSelectedId }) {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-white mx-2 xl:mx-auto pb-6 p-10 py-6 relative shadow-lg shadow-black/5 rounded-3xl overflow-x-auto w-[550px]"
        layoutId={selectedId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-between items-center xl:gap-60 gap-24">
          <motion.h6
            className="body2 pt-4 text-black/50"
            animate={{ y: -8 }}
            transition={{
              duration: "0.3",
            }}
          >
            ข้อมูลผู้ป่วย
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
        <p className="text-xs pb-2 text-black/40">HN: {patient.HN}</p>
        <motion.h6>
          <p className="h4 pb-4">
            คุณ ( {patient.nickName} ) {patient.firstName} {patient.lastName}
          </p>
        </motion.h6>
        <motion.h6 className="flex space-x-10 pb-2">
          <div className="flex items-center align-middle gap-2">
            {" "}
            <CircleIcon icon={<PersonIcon className="text-sm" />} />
            <span className="caption text-[#A17851] font-bold">อายุ </span>
            {patient.age}
          </div>
          <div className="flex items-center align-middle gap-2">
            {" "}
            <CircleIcon icon={<WcIcon className="text-sm" />} />
            <span className="caption text-[#A17851] font-bold">เพศ </span>
            {patient.sex}
          </div>
        </motion.h6>
        <motion.h6 className="md:flex md:space-x-12 md:pb-2 xl:flex xl:space-x-12 xl:pb-2">
          <div className="flex items-center align-middle gap-2">
            {" "}
            <CircleIcon icon={<PhoneIcon className="text-sm" />} />
            <span className="caption text-[#A17851] font-bold">ติดต่อ </span>
            {patient.phoneNumber}
          </div>
          <div className="flex items-center align-middle gap-2 py-2">
            {" "}
            <CircleIcon icon={<ChatBubbleIcon className="text-sm" />} />
            <span className="caption text-[#A17851] font-bold">LINE ID </span>
            {patient.lineId}
          </div>
        </motion.h6>
        <motion.h6>
          <div className="flex items-center align-middle gap-2">
            {" "}
            <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
            <span className="caption text-[#A17851] font-bold">ที่อยู่ </span>
            {patient.address}
          </div>
        </motion.h6>
        <div className="px-8 pt-4">
          <motion.h6 className="flex space-x-12 pb-2">
            <div className="flex items-center align-middle gap-2">
              {" "}
              <span className=" caption text-[#A17851]">อาชีพ</span>
              {patient.occupation}
            </div>
            <div className="flex items-center align-middle gap-2">
              {" "}
              <span className="caption text-[#A17851]">ตำแหน่ง</span>
              {patient.position}
            </div>
          </motion.h6>
          <motion.h6 className="flex space-x-12 pb-2">
            <div className="flex items-center align-middle gap-2">
              <span className="caption text-[#A17851]">ระดับการศึกษา </span>
              {patient.education}
            </div>
            <div className="flex items-center align-middle gap-2">
              <span className="caption text-[#A17851]">รายได้ </span>
              {patient.income}
            </div>
          </motion.h6>
        </div>

        <div className="px-2 pt-4">
          <p className="text-black/40">ข้อมูลด้านสุขภาพ</p>
          <motion.h6 className="pt-2 space-y-4">
            <p className="caption text-[#A17851] font-bold">ข้อควรระวัง</p>
            <span className="text-[#FF2F3B]">
              {patient.precaution ? patient.precaution : "-"}
            </span>

            <p className="caption text-[#A17851] font-bold">Chief Complaint</p>
            {patient.chiefComplaint}
            <p className="caption text-[#A17851] font-bold">PT diagnosis</p>
            {patient.diagnosis}
          </motion.h6>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PatientDetailModal;
