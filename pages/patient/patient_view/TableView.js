import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PatientCard from "../../../components/OLCard/PatientCard";

function TableView({patientData}) {
  return (
    <div className="mt-12 shadow-xl rounded-2xl">
      <div className="overflow-x-auto rounded-2xl scrollbar-hide">
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
