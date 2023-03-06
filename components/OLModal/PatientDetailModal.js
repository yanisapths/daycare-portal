import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Button } from "@mui/material";
import CircleIcon from "../../components/OLIcon/CircleIcon";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WcIcon from "@mui/icons-material/Wc";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import EditPatientForm from "../OLForm/EditPatientForm";

function PatientDetailModal({ clinic, patient, selectedId, setSelectedId }) {
  const [openEdit, setOpenEdit] = useState(false);
  async function deletePatient(pid) {
    const res = await fetch(`${process.env.dev}/patient/delete/${pid}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        toast.success("ลบรายการแล้ว");
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ลบรายการไม่สำเร็จ");
      });
  }
  function handleOpenEdit() {
    if (openEdit == true) {
      setOpenEdit(false);
    } else if (openEdit == false) {
      setOpenEdit(true);
    }
  }
  return (
    <AnimatePresence>
      <motion.div
        className="bg-white mx-2  pb-6 p-10 py-6 relative shadow-lg shadow-black/5 rounded-3xl overflow-x-auto w-[550px] h-[500px] sm:h-[600px] overflow-scroll-hidden scrollbar-hide"
        layoutId={selectedId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-between items-center gap-24">
          <div>
            <motion.h6
              className="body2 pt-4 text-black/50"
              animate={{ y: -8 }}
              transition={{
                duration: "0.3",
              }}
            >
              ข้อมูลผู้ป่วย
            </motion.h6>
            <p className="text-start text-xs pb-2 text-black/40">
              เพิ่มวันที่:{" "}
              {new Date(patient.createdAt).toLocaleDateString("th-TH")}
            </p>
          </div>
          <motion.div
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
        {openEdit == false && (
          <div>
            <motion.div
              animate={{ y: -8 }}
              transition={{
                duration: "0.3",
              }}
            >
              <p className="text-xs pb-2 text-black/40">HN: {patient.HN}</p>
              <div className="flex items-center align-middle gap-2 pb-4">
                <p className="h4">
                  คุณ ( {patient.nickName} ) {patient.firstName}{" "}
                  {patient.lastName}
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
                        } else if (
                          result.dismiss === Swal.DismissReason.cancel
                        ) {
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
                  <span className="caption text-[#A17851] font-bold">
                    อายุ{" "}
                  </span>
                  {patient.age}
                </div>
                <div className="flex items-center align-middle gap-2">
                  {" "}
                  <CircleIcon icon={<WcIcon className="text-sm" />} />
                  <span className="caption text-[#A17851] font-bold">เพศ </span>
                  {patient.sex}
                </div>
              </motion.div>
              <motion.div className="md:flex md:space-x-12 md:pb-2 xl:flex xl:space-x-10 xl:pb-2">
                <div className="flex items-center align-middle gap-2">
                  {" "}
                  <CircleIcon icon={<PhoneIcon className="text-sm" />} />
                  <span className="caption text-[#A17851] font-bold">
                    ติดต่อ{" "}
                  </span>
                  {patient.phoneNumber}
                </div>
                <div className="flex items-center align-middle gap-2 py-2">
                  {" "}
                  <CircleIcon icon={<ChatBubbleIcon className="text-sm" />} />
                  <span className="caption text-[#A17851] font-bold">
                    LINE ID{" "}
                  </span>
                  {patient.lineId}
                </div>
              </motion.div>
              <motion.div>
                <div className="flex items-start align-start gap-2">
                  {" "}
                  <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
                  <span className="caption text-[#A17851] font-bold w-20">
                    ที่อยู่ปัจุบัน{" "}
                  </span>
                  {patient.address}
                </div>
              </motion.div>
              <div className="px-8 pt-4 ">
                <motion.div className="grid grid-cols-2 gap-20 pb-2">
                  <div className="flex items-center align-middle gap-2 ">
                    {" "}
                    <span className=" caption text-[#A17851]">อาชีพ</span>
                    {patient.occupation}
                  </div>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <span className="caption text-[#A17851]">ตำแหน่ง</span>
                    {patient.position}
                  </div>
                </motion.div>
                <motion.div className="grid grid-cols-2 gap-2 pb-2">
                  <div className="flex items-center align-middle col-span-2 gap-2">
                    <span className="caption text-[#A17851]">
                      ระดับการศึกษา{" "}
                    </span>
                    {patient.education}
                  </div>
                  <div className="flex items-center align-middle gap-2 col-start-1 col-span-2">
                    <span className="caption text-[#A17851]">รายได้ </span>
                    {patient.income}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className="px-2 pt-4">
              <p className="text-black/40">ข้อมูลด้านสุขภาพ</p>
              <motion.div
                animate={{ y: -8 }}
                transition={{
                  duration: "0.3",
                }}
                className="pt-2 space-y-4"
              >
                <p className="caption text-[#A17851] font-bold">ข้อควรระวัง</p>
                <span className="text-[#FF2F3B]">
                  {patient.precaution ? patient.precaution : "-"}
                </span>

                <p className="caption text-[#A17851] font-bold">
                  Chief Complaint
                </p>
                {patient.chiefComplaint}
                <p className="caption text-[#A17851] font-bold">PT diagnosis</p>
                {patient.diagnosis}
              </motion.div>
            </div>
          </div>
        )}
        {openEdit == true && (
          <EditPatientForm
            patient={patient}
            clinic={clinic}
            openEdit={openEdit}
            handleOpenEdit={handleOpenEdit}
            deletePatient={deletePatient}
            setOpenEdit={setOpenEdit}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default PatientDetailModal;
