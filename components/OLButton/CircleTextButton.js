import React from 'react'

function CircleTextButton({text,handleClick}) {
  return (
    <button
    onClick={handleClick}
     className="cursor-pointer text-center rounded-full bg-[#AD8259]/20 text-[#6C5137] hover:bg-[#AD8259]/40 hover:shadow-xl
     w-20 h-9 text-sm"
  >
    {text}
  </button>
  )
}

export default CircleTextButton