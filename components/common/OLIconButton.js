import React from "react";
import Tooltip from "@mui/material/Tooltip";

function IconButton({ id, icon, title, setSelected, active }) {
  return (
    <Tooltip title={title} placement="top">
      <div
        onClick={() => setSelected(id)}
        className={
          active
            ? "cursor-pointer rounded-full border-2 border-[#FFE898]/20 bg-[#FFE898]/10 shadow-xl w-16 h-16 pt-4 text-center"
            : "cursor-pointer rounded-full border-2 border-[#FFE898]/20 hover:bg-[#FFE898]/10 hover:shadow-xl w-16 h-16 pt-4 text-center"
        }
      >
        {icon}
      </div>
    </Tooltip>
  );
}

export default IconButton;
