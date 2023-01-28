import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function AppointmentModal({
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
        className="bg-white mx-auto p-12 min-w-screen-xl relative shadow-lg shadow-black/5 rounded-3xl overflow-x-auto"
        layoutId={selectedId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-between items-center gap-60">
          <motion.h6
            className="h6 pt-4 text-black/50"
            animate={{ y: -8 }}
            transition={{
              duration: "0.3",
            }}
          >
            ตารางนัด
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
          <div className="pt-4">
            {course && course.courseName ? (
              <motion.h3 className="h3">{course.courseName}</motion.h3>
            ) : (
              ""
            )}
          </div>
          <div className="pt-4">
            {data.patient_id ? (
              <div className="h6">
                <motion.h6>
                  <span className="body2 text-black/50">คุณ</span> ({" "}
                  {patient.nickName} ) {patient.firstName} {patient.lastName}
                </motion.h6>
                <motion.h6>
                  <span className="body2 text-black/50">ที่อยู่</span>{" "}
                  {patient.address}
                </motion.h6>
                <motion.h6 className="space-x-6">
                  <span className="body2 text-black/50">ติดต่อ</span>{" "}
                  {patient.phoneNumber}
                  <span className="body2 text-black/50">LINE ID</span>{" "}
                  {patient.lineId}
                </motion.h6>
                <motion.h6 className="space-x-6">
                  <span className="body2 text-black/50">อายุ</span>{" "}
                  {patient.age}
                  <span className="body2 text-black/50">เพศ</span> {patient.sex}
                  <span className="body2 text-red-500">ข้อควรระวัง</span>{" "}
                  <span className="text-red-500">{patient.precaution}</span>
                </motion.h6>
                <motion.h6 className="space-x-6 text-red-500"></motion.h6>
              </div>
            ) : (
              <div className="h6">
                <motion.h6>
                  <span className="body2 text-black/50">คุณ</span> ({" "}
                  {data.nickname} ) {data.firstName} {data.lastName}
                </motion.h6>
                <motion.h6>
                  <span className="body2 text-black/50">ที่อยู่</span>{" "}
                  {data.location}
                </motion.h6>
              </div>
            )}
            <motion.h6>
              <span className="body2 text-black/50">สถานที่</span>{" "}
              <span className="h6"> {data.appointmentPlace}</span>
            </motion.h6>
          </div>
          <section className="lg:w-full mb-2 pt-12 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-2 md:ml-8 border-black/20 border-b-[1px] border-dashed">
            <div className="flex justify-between lg:body1 tracking-wide text-center">
              <div className="relative block md:w-1/6">
                <p className="">ครั้งที่</p>
              </div>
              <div className="relative block md:w-1/6">
                <p>วันนัด</p>
              </div>
              <div className="relative block md:w-1/6">
                <p>เวลานัด</p>
              </div>
              <div className="relative block md:w-1/6">
                <p>สถานะ</p>
              </div>
            </div>
          </section>

          <div className="flex py-4 text-black w-full mb-1 gap-2 xl:gap-12 xl:h5">
            <div className="relative block md:w-1/6">
              <p>1</p>
            </div>
            <div className="relative block md:w-1/6">
              <p>
                {new Date(data.appointmentDate).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "short",
                })}
              </p>
            </div>
            <div className="relative block md:w-1/6">
              {data.endTime ? (
                <strong className="mx-2 xxl:mx-4 bg-[#ffe898]/50 text-[#6C5137] p-1 xxl:px-3 xxl:py-1.5 rounded">
                  <span className="font-semibold text-[#8E6947] text-xl">
                    {new Date(data.appointmentTime).toLocaleTimeString(
                      "en-EN",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}{" "}
                    {"-"}{" "}
                    {new Date(data.endTime).toLocaleTimeString("en-EN", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </strong>
              ) : (
                <strong className="mx-2 xxl:mx-4 bg-[#ffe898]/50 text-[#6C5137] p-1 xxl:px-3 xxl:py-1.5 rounded">
                  <span className="font-semibold text-[#8E6947] xxl:text-lg xxxl:text-xl ">
                    {new Date(data.appointmentTime).toLocaleTimeString(
                      "en-EN",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </span>
                </strong>
              )}
            </div>
            <div className="relative block md:w-1/6">
              <p>{data.status}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AppointmentModal;
