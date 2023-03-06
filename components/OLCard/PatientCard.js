import React, { useState } from "react";
import Overlay from "../OLLayout/Overlay";
import PatientDetailModal from "../OLModal/PatientDetailModal";
import Tooltip from "@mui/material/Tooltip";

function PatientCard({ clinic,d, index }) {
  const [selectedId, setSelectedId] = useState(null);

  const closeModal = () => {
    setSelectedId(null);
  };
 
  return (
    <>
      {selectedId && (
        <Overlay close={closeModal}>
          <PatientDetailModal
            patient={d}
            setSelectedId={setSelectedId}
            close={closeModal}
            clinic={clinic}
          ></PatientDetailModal>
        </Overlay>
      )}
       <Tooltip title="ดูรายละเอียด" placement="top">
      <tr
        key={d._id}
        layoutId={d._id}
        onClick={() => setSelectedId(d._id)}
        className="cursor-pointer hover:bg-[#AD8259]/20 text-[#6C5137]"
      >
        <td className="p-4">{index+1}</td>
        <td className="p-4 whitespace-nowrap">
          {d.HN}
        </td>
        <td className="p-4 whitespace-nowrap">
          {" "}
          <span>( {d.nickName} )</span> {d.firstName} {d.lastName}
        </td>
        <td className="p-4 whitespace-nowrap">{d.age}</td>
        <td className="p-4 whitespace-nowrap"> {d.sex}</td>
        <td className="p-4 whitespace-nowrap">
          {" "}
          {d.phoneNumber}
        </td>
        <td className="p-4 whitespace-nowrap">{d.lineId}</td>
      </tr>
       </Tooltip>
    </>
  );
}

export default PatientCard;
