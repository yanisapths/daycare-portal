import React from 'react'
import HoverCard from "../../../components/common/HoverCard";

function ListView() {
  return (
    <div className="overflow-scroll overflow-y-auto space-y-10">
      <HoverCard />
      <HoverCard />
      <HoverCard />
      <HoverCard />
    </div>
  )
}

export default ListView