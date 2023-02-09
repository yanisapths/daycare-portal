import React from "react";

function SimpleChip({ prefix, text, quantify }) {
  return (
    <p className="whitespace-nowrap rounded-full px-4 py-1 md:px-6 md:py-1.5 text-md md:text-lg font-light bg-[#FFECA7]/40 text-[#AD8259] w-fit text-center">
      {prefix} <span> </span> {text} <span> </span> {quantify}
    </p>
  );
}

export default SimpleChip;