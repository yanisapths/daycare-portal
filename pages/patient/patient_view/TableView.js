import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import IconButton from "@mui/material/IconButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Tooltip from "@mui/material/Tooltip";

function TableView() {
  const { data: session, status } = useSession();
  const [patientData, setPatientData] = useState([]);
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
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead>
            <tr className="">
              <th className="sticky left-0 p-4 text-left">
                <label className="sr-only" htmlFor="row_all">
                  Select All
                </label>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">ลำดับ</div>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">HN (เลขประจำตัวผู้ป่วย)</div>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">ลูกค้า</div>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">อายุ</div>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">เพศ</div>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">ติดต่อ</div>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">ที่อยู่</div>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">เอกสาร</div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {patientData?.map((d, index) => (
              <tr key={d._id}>
                <td className=""></td>
                <td className="p-4 body1 font-medium">{index}</td>
                <td className="p-4 body1 font-medium text-gray-900 whitespace-nowrap">
                  {d.HN}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {" "}
                  <span>( {d.nickName} )</span> {d.firstName} {d.lastName}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">{d.age}</td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {" "}
                  {d.sex}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {" "}
                  {d.phoneNumber}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {d.address}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {d.document ? (
                    <>
                      <a href={d.document}>
                        <Tooltip title="Download document" placement="top">
                          <IconButton>
                            <CloudDownloadIcon className="w-8 h-8 text-black/40" />
                          </IconButton>
                        </Tooltip>
                      </a>
                    </>
                  ) : (
                    <>-</>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableView;
