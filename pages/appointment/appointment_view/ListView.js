import React, { useState, useEffect } from "react";
import AppointmentListCard from "../../../components/OLCard/AppointmentListCard";

function ListView({ data }) {
  return (
    <div>
      {/*request list */}
      {data &&
        data?.map((d, index) => (
          <div key={index}>
              <AppointmentListCard d={d} index={index} data={data} />
          </div>
        ))}
      {!data ||
        (data.length < 1 && (
          <div className="text-center px-10 pt-40">
            <p className="h4 lg:h2 text-black/30">คุณไม่มีนัดหมายเร็วๆนี้</p>
          </div>
        ))}
    </div>
  );
}

export default ListView;
