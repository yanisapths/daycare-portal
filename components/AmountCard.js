import React from 'react'

function AmountCard({amount}) {
  return (
    <div className="mt-4">
    <dl className="grid gap-4 grid-cols-2 md:grid-cols-6">
    <div
        className="flex flex-col rounded-3xl border border-gray-100 px-2 py-6 text-center shadow-lg shadow-[#ECE656]/30"
      >
        <dt className="order-last mt-2 tracking-wide text-gray-500 uppercase">
          นัดวันนี้
        </dt>

        <dd className="text-3xl font-extrabold md:text-5xl">
          3
        </dd>
      </div>
      <div
        className="flex flex-col rounded-3xl border border-gray-100 px-2 py-6 text-center shadow-lg shadow-[#ECE656]/30"
      >
        <dt className="order-last mt-2 tracking-wide text-gray-500 uppercase">
          คำขอใหม่
        </dt>

        <dd className="text-3xl font-extrabold text-[#A17851] md:text-5xl">
        {amount.length > 0 ? amount.length : '0' } 
        </dd>
      </div>
    </dl>
  </div>
  )
}

export default AmountCard