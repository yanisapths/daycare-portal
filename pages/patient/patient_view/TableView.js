import React from "react";
const data = [
  {
    _id: "1231231",
    HN: "122334",
    firstName: "Johnathan",
    lastName: "Doe",
    nickName: "John",
    phoneNumber: "123",
    address: "123",
    sex: "M",
    age: "26",
    occupation: "Mobile Developer",
    position: "Freelance",
    income: "50,000",
    education: "Bachelor",
    chiefComplaint: "Office Syndrome",
    diagnosis: "Chronic Office Syndrome",
    precaution: "none",
    document: "",
    createdAt: "",
    updatedAt: "",
  },
];
function TableView() {
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
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data?.map((d, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableView;
