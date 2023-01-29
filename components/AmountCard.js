import React from "react";

function AmountCard({ requests, appointments }) {
  return (
    <div className="">
      <dl className="grid gap-4 grid-cols-2 md:grid-cols-6">
        <div className="flex flex-col rounded-3xl border border-gray-100 px-2 py-6 text-center shadow-lg shadow-[#A17851]/30">
          <dt className="order-last mt-2 tracking-wide text-gray-500 uppercase">
            นัดวันนี้
          </dt>
          <dd className="text-3xl font-extrabold text-[#A17851] md:text-5xl">
            {appointments.length > 0 ? appointments.length : "0"}
          </dd>
        </div>
        <div className="flex flex-col rounded-3xl border border-gray-100 px-2 py-6 text-center shadow-lg shadow-[#A17851]/30">
          <dt className="order-last mt-2 tracking-wide text-gray-500 uppercase">
            คำขอใหม่
          </dt>

          <dd className="text-3xl font-extrabold text-[#A17851] md:text-5xl">
            {requests.length > 0 ? requests.length : "0"}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default AmountCard;
