import React from 'react'

const RequestList = (name,phone,type,place,startDate,endDate) => {
  return (
    <>
      <div className="grid grid-col-6  gap-2 ">
                <div className="col-start-1 col-end-7">
                  <span className="font-bold text-lg">{name}</span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">เบอร์โทรศัพท์:</span>
                  <span>{phone}</span>
                </div>
                <div className="col-start-4 col-span-4">
                  <span className="font-semibold">ประเภทการดูแล:</span>
                  <span>{type}</span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">สถานที่ดูแล:</span>
                  <span>{place}</span>
                </div>

                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">เริ่ม:</span>
                  <span>{startDate}</span>
                </div>
                <div className="col-start-4 col-span-4">
                  <span className="font-semibold">สิ้นสุด:</span>
                  <span>{endDate}</span>
                </div>
              </div>
    </>
  )
}

export default RequestList
