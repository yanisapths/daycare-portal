import React, { useState, useEffect } from "react";
import RequestListCard from "../RequestListCard"

function ListView({ data }) {
  return (
    <>
      <div className="flex flex-col gap-1 m-3 font-noto text-sm ">
        {data?.map((request) => (
          <RequestListCard request={request} key={request._id} />
        ))}
      </div>
    </>
  );
}

export default ListView;
