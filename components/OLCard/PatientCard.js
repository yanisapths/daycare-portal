import React, { useState } from "react";
import Overlay from "../OLLayout/Overlay";
import PatientDetailModal from "../OLModal/PatientDetailModal";
import { IconButton, Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function PatientCard({ d, index }) {
  const [selectedId, setSelectedId] = useState(null);

  const closeModal = () => {
    setSelectedId(null);
  };

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

  return (
    <>
      {selectedId && (
        <Overlay close={closeModal}>
          <PatientDetailModal
            patient={d}
            setSelectedId={setSelectedId}
            close={closeModal}
          ></PatientDetailModal>
        </Overlay>
      )}
      <tr
        key={d._id}
        layoutId={d._id}
        onClick={() => setSelectedId(d._id)}
        className="cursor-pointer"
      >
        <td className="p-4 body1 font-medium">{index}</td>
        <td className="p-4 body1 font-medium text-gray-900 whitespace-nowrap">
          {d.HN}
        </td>
        <td className="p-4 text-gray-700 whitespace-nowrap">
          {" "}
          <span>( {d.nickName} )</span> {d.firstName} {d.lastName}
        </td>
        <td className="p-4 text-gray-700 whitespace-nowrap">{d.age}</td>
        <td className="p-4 text-gray-700 whitespace-nowrap"> {d.sex}</td>
        <td className="p-4 text-gray-700 whitespace-nowrap">
          {" "}
          {d.phoneNumber}
        </td>
        <td className="p-4 text-gray-700 whitespace-nowrap">{d.lineId}</td>
        <td className="p-4 text-gray-700 whitespace-nowrap">
          <Tooltip title="ลบ" placement="top">
            <IconButton
              aria-label="delete"
              size="medium"
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
                    deletePatient(d._id).then(() =>
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
              <DoDisturbIcon />
            </IconButton>
          </Tooltip>
        </td>
      </tr>
    </>
  );
}

export default PatientCard;
