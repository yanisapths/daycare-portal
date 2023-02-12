import React from "react";
import Tooltip from "@mui/material/Tooltip";

function IconButton({ id, icon, title, setSelected, active }) {
  return (
    <Tooltip title={title} placement="top">
      <div
        onClick={() => setSelected(id)}
        className={
          active
            ? "cursor-pointer rounded-full  bg-[#FFE898]/10 shadow-xl w-12 h-12 pt-2 text-center"
            : "cursor-pointer rounded-full hover:bg-[#FFE898]/10 hover:shadow-xl w-12 h-12 pt-2 text-center"
        }
      >
        {icon}
      </div>
    </Tooltip>
  );
}

export default IconButton;
