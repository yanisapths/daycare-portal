import React from 'react'

function RoundTextIcon({icon,text}) {
  return (
    <div className="flex rounded-full px-2 w-fit h-8 bg-[#FEF0BF]/40 text-center items-center">
      <p className="text-[#A17851] p-0.5">{icon}</p>
      <span className="text-[#A17851] p-1.5 text-sm font-bold">{text}</span>
    </div>
  )
}

export default RoundTextIcon