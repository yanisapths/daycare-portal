import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import IconButton from "@mui/material/IconButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Tooltip from "@mui/material/Tooltip";
import BtnDetails from "../../../components/BtnDetails";
import Overlay from "../../../components/OLLayout/Overlay";
import PatientDetailModal from "../../../components/OLModal/PatientDetailModal";
import PatientCard from "../../../components/OLCard/PatientCard";

function TableView() {
  const { data: session, status } = useSession();
  const [patientData, setPatientData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const closeModal = () => {
    setSelectedId(null);
  };
  const fetchData = async () => {
    let isSubscribed = true;
    const res = await fetch(
      `${process.env.dev}/patient/match/${session.user.id}`
    );

    const patientData = await res.json();
    if (isSubscribed) {
      setPatientData(patientData);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  });

  return (
    <div className="mt-12 shadow-xl rounded-2xl">
      <div className="overflow-x-auto rounded-2xl">
        <table className="table-auto min-w-full text-sm divide-y divide-gray-200 bg-white rounded-2xl">
          <thead>
            <tr className="bg-[#AD8259] text-white">
              <th className="p-4 text-left whitespace-nowrap">
                <div className="flex items-center">ลำดับ</div>
              </th>
              <th className="p-4 text-left whitespace-nowrap">
                <div className="flex items-center">HN (เลขประจำตัวผู้ป่วย)</div>
              </th>
              <th className="p-4 text-left whitespace-nowrap">
                <div className="flex items-center">ลูกค้า</div>
              </th>
              <th className="p-4 text-left whitespace-nowrap">
                <div className="flex items-center">อายุ</div>
              </th>
              <th className="p-4 text-left marker:whitespace-nowrap">
                <div className="flex items-center">เพศ</div>
              </th>
              <th className="p-4 text-left whitespace-nowrap">
                <div className="flex items-center">ติดต่อ</div>
              </th>
              <th className="p-4 text-left whitespace-nowrap">
                <div className="flex items-center">LINE ID</div>
              </th>
              <th className="p-4 text-left whitespace-nowrap">
                <div className="flex items-center"></div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {patientData?.map((d, index) => (
              <PatientCard d={d} index={index} key={d._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableView;
