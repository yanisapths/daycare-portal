import React, { useState, useEffect } from "react";
import RequestListCard from "../../../components/common/RequestListCard"

function ListView({ data }) {
  return (
    <>
      <div className="flex flex-col gap-1 m-3 font-noto text-sm ">
        {data?.map((request) => (
          <RequestListCard request={request} />
        ))}
      </div>
    </>
  );
}

export default ListView;
