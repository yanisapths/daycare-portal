import React, { useState, useEffect } from "react";
import RequestListCard from "../../../components/common/RequestListCard"

function ListView({ data }) {
  return (
    <>
      <div className="flex flex-col gap-1 m-3 font-noto text-sm xl:px-24">
        {data?.map((request) => (
          <RequestListCard request={request} key={request._id} data={data} />
        ))}
      </div>
    </>
  );
}

export default ListView;
