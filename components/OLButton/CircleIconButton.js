import React from 'react'

function CircleIconButton({icon,text,handleClick}) {
  return (
    <div
      onClick={handleClick}
       className="cursor-pointer flex items-center justify-center text-center p-2 px-3 w-fit h-fit rounded-full bg-[#AD8259]/20 text-[#6C5137] hover:bg-[#AD8259]/40 hover:shadow-xl"
    >
      <p className="">{icon}</p>
      <span className="p-1 font-bold">{text}</span>
    </div>
  )
}

export default CircleIconButton