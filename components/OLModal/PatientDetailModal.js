import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Button } from "@mui/material";

function PatientDetailModal({patient,selectedId,setSelectedId }) {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-white mx-2 xl:mx-auto p-12 relative shadow-lg shadow-black/5 rounded-3xl overflow-x-auto w-[900px]"
        layoutId={selectedId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
          <div className="flex justify-between items-center xl:gap-60 gap-24">
          <motion.h6
            className="h6 pt-4 text-black/50"
            animate={{ y: -8 }}
            transition={{
              duration: "0.3",
            }}
          >
            Hello, {patient.nickName}
          </motion.h6>
          <motion.div
            className=""
            onClick={() => setSelectedId(null)}
            animate={{ y: -8 }}
            transition={{
              duration: "0.3",
            }}
          >
            <IconButton>
              <CloseIcon className="w-10 h-10" />
            </IconButton>
          </motion.div>
        </div>
      </motion.div>
  </AnimatePresence>
  );
}

export default PatientDetailModal;
