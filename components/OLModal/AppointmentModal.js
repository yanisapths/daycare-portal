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
            {data.patient_id ? (
              <div className="h6">
                <motion.h6>
                  <span className="body2 text-black/50">คุณ</span> ({" "}
                 <span className="h4">{patient.nickName} ) {patient.firstName} {patient.lastName}</span> 
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
              </div>
            ) : (
              <div className="h6">
                <motion.h6>
                  <span className="body2 text-black/50">คุณ</span>{" "}
                  <span className="h4">( {data.nickName} ) {data.firstName} {data.lastName}</span>
                </motion.h6>
                <motion.h6>
                  <span className="body2 text-black/50">ที่อยู่</span>{" "}
                  {data.location}
                </motion.h6>
                <motion.h6 className="space-x-6">
                  <span className="body2 text-black/50">ติดต่อ</span>{" "}
                  {data.phoneNumber}
                  <span className="body2 text-black/50">LINE ID</span>{" "}
                  {data.lineId}
                </motion.h6>
                <motion.h6 className="space-x-6">
                  <span className="body2 text-black/50">อายุ</span> {data.age}
                  <span className="body2 text-black/50">เพศ</span> {data.sex}
                  <span className="body2 text-red-500">ข้อควรระวัง</span>{" "}
                  <span className="text-red-500">{data.precaution}</span>
                </motion.h6>
              </div>
            )}
            <motion.h6>
              <span className="body2 text-black/50">สถานที่</span>{" "}
              <span className="h6"> {data.appointmentPlace}</span>
            </motion.h6>
          </div>
          <div className="pt-4 text-center">
            <motion.h3 className="h4">{course.courseName}</motion.h3>
          </div>
          <section className="mb-2 pt-12 border-black/20 border-b-[1px] border-dashed mx-auto">
            <div className="flex lg:body1 tracking-wide xl:px-12 xl:gap-28">
              <div className="w-1/6">
                <p className="">ครั้งที่</p>
              </div>
              <div className="w-2/6">
                <p>วันนัด</p>
              </div>
              <div className="w-2/6">
                <p>เวลานัด</p>
              </div>
              <div className="w-1/6">
                <p>สถานะ</p>
              </div>
            </div>
          </section>

          <div className="flex text-center p-2 text-black mb-1  body1 md:h6 lg:h5 w-full mx-auto">
            <div className="w-1/6">
              <p>1</p>
            </div>
            <div className="w-2/6">
              <p>
                {new Date(data.appointmentDate).toLocaleDateString("en-EN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="w-2/6">
              <p>
                {new Date(data.appointmentTime).toLocaleTimeString("en-EN", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
                {data.endTime ? (
                  <>
                    {"-"}
                    {new Date(data.endTime).toLocaleTimeString("en-EN", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </>
                ) : (
                  <></>
                )}
              </p>
            </div>
            <div className="w-1/6">
              <p>{data.status}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AppointmentModal;
