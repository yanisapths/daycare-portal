import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import AppointmentListCard from "../../../components/OLCard/AppointmentListCard";

function ListView({ data,user }) {
  return (
    <div className="pt-12 space-y-12 md:space-y-0 xl:space-y-0 md:pt-10 xl:pt-10 md:flex xl:flex md:gap-10 xl:gap-32 xl:pl-24">
      <div className="min-w-full xl:min-w-[750px] md:min-w-[550px]">
        {/*appointment list */}
        {data &&
          data?.map((d, index) => (
            <div key={index} className="mb-6">
              <AppointmentListCard d={d} index={index} data={data} user={user} />
            </div>
          ))}
        {!data ||
          (data.length < 1 && (
            <div className="text-center px-10 pt-40">
              <p className="h4 lg:h2 text-black/30">ไม่มีนัดหมาย</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListView;
