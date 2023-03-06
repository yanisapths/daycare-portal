import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PatientCard from "../../../components/OLCard/PatientCard";

function TableView({patientData,clinic}) {
  return (
    <div className="mt-12 shadow-xl rounded-2xl">
      <div className="overflow-x-auto rounded-2xl scrollbar-hide">
        <table className="table-auto text-center min-w-full text-sm divide-y divide-gray-200 bg-white rounded-2xl">
          <thead className="text-center">
            <tr className="bg-[#AD8259] text-white ">
              <th className="p-4 text-center whitespace-nowrap">
                <div className="flex  justify-center ">ลำดับ</div>
              </th>
              <th className="p-4 text-center whitespace-nowrap">
                <div className="flex justify-center">HN (เลขประจำตัวผู้ป่วย)</div>
              </th>
              <th className="p-4 text-center whitespace-nowrap">
                <div className="flex justify-center">ลูกค้า</div>
              </th>
              <th className="p-4 text-center whitespace-nowrap">
                <div className="flex justify-center">อายุ</div>
              </th>
              <th className="p-4 text-center marker:whitespace-nowrap">
                <div className="flex justify-center">เพศ</div>
              </th>
              <th className="p-4 text-left whitespace-nowrap">
                <div className="flex justify-center">ติดต่อ</div>
              </th>
              <th className="p-4 text-center whitespace-nowrap">
                <div className="flex justify-center">LINE ID</div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {patientData?.map((d, index) => (
              <PatientCard d={d} index={index} key={d._id} clinic={clinic} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableView;
