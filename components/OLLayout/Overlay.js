import React, { useState, useEffect } from "react";

export default function Overlay({ children, close }) {
  return (
    <div className="left-0 top-0 items-center justify-center bg-black/40 w-full h-full fixed flex">
      {children}
    </div>
  );
}
