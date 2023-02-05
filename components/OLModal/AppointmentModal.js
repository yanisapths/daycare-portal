import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Button } from "@mui/material";
import CircleIcon from "../../components/OLIcon/CircleIcon";
import PhoneIcon from "@mui/icons-material/Phone";
import StatusCheckIcon from "../../components/OLIcon/StatusCheckIcon";
import RoundTextIcon from "../../components/OLIcon/RoundTextIcon";
import CircleIconButton from "../../components/OLButton/CircleIconButton";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import WcIcon from "@mui/icons-material/Wc";
import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
          <div className="pt-4 text-[#121212]">
            {data.patient_id ? (
              <div className="h6 space-y-4 font-medium">
                <motion.h6>
                  <span className="h4">
                    ( {patient.nickName} ) {patient.firstName}{" "}
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
                    {patient.age ? (
                      patient.age
                    ) : (
                      <span className="text-sm text-black/40">ไม่ได้กรอก</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<WcIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">เพศ </span>
                    {patient.sex ? (
                      patient.sex
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
                    {patient.phoneNumber ? (
                      patient.phoneNumber
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
                    {patient.lineId ? (
                      patient.lineId
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
                    {patient.address ? (
                      patient.address
                    ) : (
                      <span className="text-sm text-black/40">ไม่ได้กรอก</span>
                    )}
                  </div>
                </motion.h6>
              </div>
            ) : (
              <div className="h6 space-y-4 font-medium">
                <motion.h6>
                  <span className="h4">
                    ( {data.nickName} ) {data.firstName} {data.lastName}
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
          <div className="pt-8">
            <motion.h3 className="h4 text-center">
              {course.courseName}
            </motion.h3>
          </div>
          <div className="flex justify-center text-black/60 align-middle gap-2">
            <Tooltip placement="top" title="Click To Copy">
              <Button
                sx={{ borderRadius: 16, px: 2 }}
                endIcon={<ContentCopyIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(data._id);
                }}
              >
                appointment number
              </Button>
            </Tooltip>
          </div>
          <section className="mb-2 pt-4 text-black/50 border-black/20 border-b-[1px] border-dashed mx-auto">
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

          <div className="text-[#121212] flex xl:text-center p-2 mb-1  body1 md:h6 lg:h5 w-full mx-auto">
            <div className="w-1/6">
              <p>1</p>
            </div>
            <div className="w-2/6">
              <p>
                {new Date(data.appointmentDate).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="w-2/6">
              <p>
                {new Date(data.appointmentTime).toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {data.endTime ? (
                  <>
                    {" - "}
                    {new Date(data.endTime).toLocaleTimeString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </>
                ) : (
                  <></>
                )}
              </p>
            </div>
            <div className="w-1/6">
              <StatusCheckIcon
                icon={<CheckCircleIcon />}
                text={data.status}
                bgColor="#2ED477"
                textColor="#2ED477"
              />
            </div>
          </div>
        </motion.div>
        <motion.div className="flex justify-center">
          <CircleIconButton
            icon={<AddCircleOutlineIcon />}
            text="เพิ่มนัดใหม่"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AppointmentModal;
